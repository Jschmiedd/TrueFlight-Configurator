// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
// TrueGlide : Mémo & Wiki hors ligne. Les pages Markdown de docs/trueglide/<langue>/ sont intégrées à la construction
// (Vite, import.meta.glob) : rien n'est téléchargé, l'onglet marche sans Internet.
import { marked } from "marked";
import DOMPurify from "dompurify";

const RAW_PAGES = import.meta.glob("../../../docs/trueglide/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});
// Images éventuelles, servies en local avec le reste de l'application
const IMAGES = import.meta.glob("../../../docs/trueglide/**/*.{png,jpg,jpeg,gif,svg,webp}", {
    query: "?url",
    import: "default",
    eager: true,
});

export const DOCS_LANGUAGES = ["fr", "en"];
export const MEMO_PAGE = "memo.md";
export const WIKI_INDEX = "wiki/index.md";

// "../../../docs/trueglide/fr/wiki/index.md" -> { lang: "fr", path: "wiki/index.md" }
function splitKey(key) {
    const m = /docs\/trueglide\/([a-z]+)\/(.+)$/.exec(key);
    return m ? { lang: m[1], path: m[2] } : null;
}

function indexByLanguage(glob) {
    const out = {};
    for (const [key, value] of Object.entries(glob)) {
        const parts = splitKey(key);
        if (parts) {
            out[parts.lang] ??= {};
            out[parts.lang][parts.path] = value;
        }
    }
    return out;
}

const PAGES = indexByLanguage(RAW_PAGES);
const IMAGE_URLS = indexByLanguage(IMAGES);

// Langue des pages : celle de l'application si elle est française, sinon l'anglais.
export function docsLanguage(locale) {
    return String(locale ?? "")
        .toLowerCase()
        .startsWith("fr")
        ? "fr"
        : "en";
}

export function getPage(lang, path) {
    return PAGES[lang]?.[path] ?? null;
}

export function listPages(lang) {
    return Object.keys(PAGES[lang] ?? {}).sort();
}

// Titre d'une page : son premier titre de niveau 1
export function pageTitle(markdown, fallback = "") {
    const m = /^#\s+(.+)$/m.exec(markdown ?? "");
    return m ? m[1].trim() : fallback;
}

export function isExternalLink(href) {
    return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href ?? "");
}

// Résout un lien relatif depuis la page courante : ("wiki/index.md", "../memo.md#x") -> { path: "memo.md", hash: "x" }.
// Rend null si le lien sort du dossier de la langue.
export function resolveLink(currentPath, href) {
    const [withoutHash, hash = ""] = String(href).split("#");
    const target = withoutHash.split("?")[0];
    if (target === "") {
        return { path: currentPath, hash };
    }
    const base = target.startsWith("/") ? [] : currentPath.split("/").slice(0, -1);
    const parts = [...base];
    for (const segment of target.split("/")) {
        if (segment === "" || segment === ".") {
            continue;
        }
        if (segment === "..") {
            if (parts.length === 0) {
                return null;
            }
            parts.pop();
        } else {
            parts.push(segment);
        }
    }
    return { path: parts.join("/"), hash };
}

// Liens Markdown d'une page, dans l'ordre : [{ text, href }]
export function markdownLinks(markdown) {
    const links = [];
    const re = /(!?)\[([^\]]*)\]\(([^)\s]+)\)/g;
    let m;
    while ((m = re.exec(markdown ?? "")) !== null) {
        if (!m[1]) {
            links.push({ text: m[2], href: m[3] });
        }
    }
    return links;
}

// Pages du wiki dans l'ordre du sommaire (index.md d'abord, puis les liens du sommaire)
export function wikiPages(lang) {
    const index = getPage(lang, WIKI_INDEX);
    if (!index) {
        return [];
    }
    const order = [WIKI_INDEX];
    for (const { href } of markdownLinks(index)) {
        const target = isExternalLink(href) ? null : resolveLink(WIKI_INDEX, href);
        if (target && target.path.startsWith("wiki/") && !order.includes(target.path) && getPage(lang, target.path)) {
            order.push(target.path);
        }
    }
    return order.map((path) => ({ path, title: pageTitle(getPage(lang, path), path) }));
}

export function slugify(text) {
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Markdown -> HTML sûr. Liens internes marqués data-doc-path (navigation dans l'onglet), liens externes ouverts dans
// un nouvel onglet, images relatives remplacées par leur fichier local, titres avec un id (ancres).
export function renderPage(markdown, lang, currentPath) {
    const html = DOMPurify.sanitize(marked.parse(markdown ?? "", { gfm: true }));
    const template = document.createElement("template");
    template.innerHTML = html;
    const root = template.content;

    for (const a of root.querySelectorAll("a[href]")) {
        const href = a.getAttribute("href");
        if (isExternalLink(href)) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
            a.classList.add("tf-docs-external");
        } else if (href.startsWith("#")) {
            a.setAttribute("data-doc-anchor", href.slice(1));
        } else {
            const target = resolveLink(currentPath, href);
            if (target && getPage(lang, target.path)) {
                a.setAttribute("data-doc-path", target.path);
                a.setAttribute("data-doc-hash", target.hash);
            } else {
                a.classList.add("tf-docs-broken");
            }
        }
    }

    for (const img of root.querySelectorAll("img[src]")) {
        const src = img.getAttribute("src");
        if (!isExternalLink(src)) {
            const target = resolveLink(currentPath, src);
            const url = target ? IMAGE_URLS[lang]?.[target.path] : null;
            if (url) {
                img.setAttribute("src", url);
            } else {
                img.removeAttribute("src");
            }
        }
        img.setAttribute("loading", "lazy");
    }

    for (const h of root.querySelectorAll("h1, h2, h3, h4")) {
        h.id = slugify(h.textContent);
    }

    return template.innerHTML;
}

// Page demandée par un autre onglet (accueil : boutons Mémo / Wiki), lue une fois à l'ouverture de l'onglet.
let requestedPage = null;

export function requestDocsPage(path) {
    requestedPage = path;
}

export function takeRequestedDocsPage() {
    const path = requestedPage;
    requestedPage = null;
    return path;
}
