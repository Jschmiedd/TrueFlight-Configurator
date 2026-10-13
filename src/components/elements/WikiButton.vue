<template>
    <div class="cf_doc_version_bt">
        <a id="button-documentation" href="#" :aria-label="$t('betaflightSupportButton')" @click.prevent="openWiki">
            {{ $t("betaflightSupportButton") }}
        </a>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { WIKI_INDEX, requestDocsPage } from "@/js/trueglide/docs.js";

// TrueGlide: wiki page shown for a tab's Wiki button (built-in wiki, readable offline). Tabs without a dedicated
// page open the menu page, which describes every tab.
const WIKI_PAGE_BY_TAB = {
    firmware_flasher: "wiki/installation.md",
    trueglide: "wiki/menu.md",
    trueglide_tune: "wiki/assistant-reglage.md",
    osd: "wiki/osd-debug.md",
    onboard_logging: "wiki/journaux.md",
    logging: "wiki/journaux.md",
    blackbox: "wiki/journaux.md",
    gps: "wiki/navigation-gps.md",
    flight_plan: "wiki/navigation-gps.md",
};

export function wikiPageForTab(docUrl) {
    if (!docUrl) {
        return WIKI_INDEX;
    }
    const key = docUrl.toLowerCase().replaceAll("-", "_");
    return WIKI_PAGE_BY_TAB[key] ?? "wiki/menu.md";
}

export default defineComponent({
    name: "WikiButton",
    props: {
        // Tab key (documentationLinks key) used to pick the wiki page
        docUrl: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        function openWiki() {
            requestDocsPage(wikiPageForTab(props.docUrl));
            // imported on demand: tab_switch imports the tab registry, which imports the tabs using this button
            import("@/js/tab_switch").then(({ switchTab }) => switchTab("help", { mode: "shared" }));
        }
        return { openWiki };
    },
});
</script>
