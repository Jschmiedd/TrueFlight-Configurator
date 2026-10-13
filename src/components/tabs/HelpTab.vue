<template>
    <BaseTab tab-name="help">
        <div class="content_wrapper tf-docs">
            <div class="tab_title">{{ $t("tabHelp") }}</div>
            <div class="flex flex-wrap items-center gap-2 mb-4">
                <UButton
                    :label="label('tfDocsMemo')"
                    :variant="view === 'memo' ? 'solid' : 'subtle'"
                    :color="view === 'memo' ? 'primary' : 'neutral'"
                    @click="open(MEMO_PAGE)"
                />
                <UButton
                    :label="label('tfDocsWiki')"
                    :variant="view === 'wiki' ? 'solid' : 'subtle'"
                    :color="view === 'wiki' ? 'primary' : 'neutral'"
                    @click="open(WIKI_INDEX)"
                />
                <UButton
                    :label="label('tfDocsBack')"
                    icon="i-lucide-arrow-left"
                    color="neutral"
                    variant="ghost"
                    :disabled="history.length === 0"
                    @click="back"
                />
                <span class="text-xs opacity-70 ml-auto">{{ label("tfDocsOffline") }}</span>
            </div>

            <div class="tf-docs-layout" :class="{ 'tf-docs-with-nav': view === 'wiki' }">
                <nav v-if="view === 'wiki'" class="tf-docs-nav" :aria-label="label('tfDocsPages')">
                    <div class="tf-docs-nav-title">{{ label("tfDocsPages") }}</div>
                    <button
                        v-for="p in pages"
                        :key="p.path"
                        type="button"
                        class="tf-docs-nav-item"
                        :class="{ active: p.path === path }"
                        @click="open(p.path)"
                    >
                        {{ p.title }}
                    </button>
                </nav>
                <!-- eslint-disable-next-line vue/no-v-html -- Markdown rendered by marked, sanitised by DOMPurify -->
                <article ref="contentEl" class="tf-docs-content" v-html="html" @click="onContentClick"></article>
            </div>
        </div>
    </BaseTab>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import i18next from "i18next";
import BaseTab from "./BaseTab.vue";
import GUI from "@/js/gui";
import { i18n } from "@/js/localization";
import {
    MEMO_PAGE,
    WIKI_INDEX,
    docsLanguage,
    getPage,
    renderPage,
    takeRequestedDocsPage,
    wikiPages,
} from "@/js/trueglide/docs.js";

// Textes de secours tant que les clés tfDocs… ne sont pas dans locales/*/messages.json
const FALLBACK = {
    fr: {
        tfDocsMemo: "Mémo",
        tfDocsWiki: "Wiki",
        tfDocsBack: "Retour",
        tfDocsPages: "Pages du wiki",
        tfDocsOffline: "Documentation intégrée, lisible sans Internet",
        tfDocsNotFound: "Page introuvable.",
    },
    en: {
        tfDocsMemo: "Memo",
        tfDocsWiki: "Wiki",
        tfDocsBack: "Back",
        tfDocsPages: "Wiki pages",
        tfDocsOffline: "Built-in documentation, readable offline",
        tfDocsNotFound: "Page not found.",
    },
};

const lang = ref(docsLanguage(i18n.getCurrentLocale()));
const path = ref(MEMO_PAGE);
const history = ref([]);
const contentEl = ref(null);

function label(key) {
    void lang.value; // relu quand la langue change
    return i18n.existsMessage(key) ? i18n.getMessage(key) : FALLBACK[lang.value][key];
}

const view = computed(() => (path.value === MEMO_PAGE ? "memo" : "wiki"));
const pages = computed(() => wikiPages(lang.value));
const html = computed(() => {
    const markdown = getPage(lang.value, path.value);
    if (markdown === null) {
        return `<p>${label("tfDocsNotFound")}</p>`;
    }
    return renderPage(markdown, lang.value, path.value);
});

// Ancêtre qui défile vraiment (la zone de contenu de l'application, selon la mise en page)
function scrollParent(el) {
    for (let node = el?.parentElement; node; node = node.parentElement) {
        const overflowY = getComputedStyle(node).overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
            return node;
        }
    }
    return document.scrollingElement;
}

function scrollTo(hash) {
    nextTick(() => {
        const target = hash ? contentEl.value?.querySelector(`[id="${CSS.escape(hash)}"]`) : null;
        if (target) {
            target.scrollIntoView({ block: "start" });
        } else {
            scrollParent(contentEl.value)?.scrollTo({ top: 0 });
        }
    });
}

function open(newPath, hash = "") {
    if (newPath !== path.value) {
        history.value.push(path.value);
        path.value = newPath;
    }
    scrollTo(hash);
}

function back() {
    const previous = history.value.pop();
    if (previous) {
        path.value = previous;
        scrollTo("");
    }
}

// Liens du contenu : pages internes dans l'onglet, ancres dans la page, liens externes dans un nouvel onglet
function onContentClick(event) {
    const a = event.target.closest?.("a");
    if (!a) {
        return;
    }
    if (a.dataset.docPath) {
        event.preventDefault();
        open(a.dataset.docPath, a.dataset.docHash);
    } else if (a.dataset.docAnchor !== undefined) {
        event.preventDefault();
        scrollTo(a.dataset.docAnchor);
    } else if (a.getAttribute("target") === "_blank") {
        event.preventDefault();
        window.open(a.href, "_blank", "noopener,noreferrer");
    } else {
        event.preventDefault(); // lien cassé : ne jamais quitter l'application
    }
}

function onLanguageChanged() {
    lang.value = docsLanguage(i18n.getCurrentLocale());
}

onMounted(() => {
    const requested = takeRequestedDocsPage();
    if (requested && getPage(lang.value, requested) !== null) {
        path.value = requested;
    }
    i18next.on("languageChanged", onLanguageChanged);
    GUI.content_ready();
});

onUnmounted(() => i18next.off("languageChanged", onLanguageChanged));
</script>

<style lang="less">
.tab-help {
    .tf-docs-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 1rem;
        align-items: start;

        &.tf-docs-with-nav {
            grid-template-columns: 15rem minmax(0, 1fr);
        }
    }

    .tf-docs-nav {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background: var(--surface-100);
        border: 1px solid var(--surface-300);
    }

    .tf-docs-nav-title {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        opacity: 0.7;
        padding: 0.25rem 0.5rem;
    }

    .tf-docs-nav-item {
        text-align: left;
        font-size: 0.8125rem;
        padding: 0.3rem 0.5rem;
        border-radius: 0.375rem;
        color: var(--text);
        cursor: pointer;

        &:hover {
            background: var(--surface-300);
        }

        &.active {
            background: var(--primary-500);
            color: var(--surface-50, #fff);
            font-weight: 600;
        }
    }

    .tf-docs-content {
        max-width: 60rem;
        padding: 1rem 1.25rem 2rem;
        border-radius: 0.5rem;
        background: var(--surface-100);
        border: 1px solid var(--surface-300);
        color: var(--text);
        font-size: 0.875rem;
        line-height: 1.55;

        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 0.75rem;
        }
        h2 {
            font-size: 1.15rem;
            font-weight: 700;
            margin: 1.5rem 0 0.5rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid var(--surface-300);
        }
        h3 {
            font-size: 1rem;
            font-weight: 700;
            margin: 1.25rem 0 0.4rem;
        }
        p {
            margin: 0.5rem 0;
        }
        ul,
        ol {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
        }
        ul {
            list-style: disc;
        }
        ol {
            list-style: decimal;
        }
        li {
            margin: 0.2rem 0;
        }
        a {
            color: var(--primary-500);
            text-decoration: underline;
            cursor: pointer;
        }
        a.tf-docs-external::after {
            content: " ↗";
            font-size: 0.75em;
        }
        a.tf-docs-broken {
            color: inherit;
            text-decoration: line-through;
            cursor: default;
        }
        code {
            font-family: monospace;
            font-size: 0.85em;
            padding: 0.05rem 0.3rem;
            border-radius: 0.25rem;
            background: var(--surface-300);
        }
        pre {
            margin: 0.5rem 0;
            padding: 0.6rem 0.8rem;
            border-radius: 0.375rem;
            background: var(--surface-300);
            overflow-x: auto;

            code {
                padding: 0;
                background: none;
            }
        }
        table {
            display: block;
            overflow-x: auto;
            border-collapse: collapse;
            margin: 0.75rem 0;
            font-size: 0.8125rem;
        }
        th,
        td {
            border: 1px solid var(--surface-400);
            padding: 0.3rem 0.5rem;
            text-align: left;
            vertical-align: top;
        }
        th {
            background: var(--surface-200);
            font-weight: 600;
        }
        img {
            max-width: 100%;
        }
        blockquote {
            margin: 0.5rem 0;
            padding-left: 0.75rem;
            border-left: 3px solid var(--primary-500);
        }
    }

    @media all and (max-width: 768px) {
        .tf-docs-layout.tf-docs-with-nav {
            grid-template-columns: minmax(0, 1fr);
        }
        .tf-docs-nav {
            position: static;
        }
    }
}
</style>
