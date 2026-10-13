// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
    docsLanguage,
    getPage,
    listPages,
    markdownLinks,
    renderPage,
    resolveLink,
    wikiPages,
    isExternalLink,
} from "../../src/js/trueglide/docs.js";

const DOCS = path.resolve(__dirname, "../../docs/trueglide");

function mdFiles(dir, prefix = "") {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            out.push(...mdFiles(path.join(dir, entry.name), rel));
        } else if (entry.name.endsWith(".md")) {
            out.push(rel);
        }
    }
    return out.sort();
}

const FR = mdFiles(path.join(DOCS, "fr"));
const EN = mdFiles(path.join(DOCS, "en"));

describe("TrueGlide docs: files", () => {
    it("has a memo and a wiki index in both languages", () => {
        for (const files of [FR, EN]) {
            expect(files).toContain("memo.md");
            expect(files).toContain("wiki/index.md");
        }
    });

    it("every French page has its English counterpart (same file names)", () => {
        expect(EN).toEqual(FR);
    });

    it("file names are lower case, without accents or spaces", () => {
        for (const f of [...FR, ...EN]) {
            expect(f).toMatch(/^[a-z0-9/-]+\.md$/);
        }
    });

    it("every internal .md link points to an existing file", () => {
        for (const lang of ["fr", "en"]) {
            const files = lang === "fr" ? FR : EN;
            for (const file of files) {
                const text = readFileSync(path.join(DOCS, lang, file), "utf8");
                for (const { href } of markdownLinks(text)) {
                    if (isExternalLink(href) || href.startsWith("#")) {
                        continue;
                    }
                    const target = resolveLink(file, href);
                    expect(target, `${lang}/${file}: ${href}`).not.toBeNull();
                    expect(files, `${lang}/${file}: ${href}`).toContain(target.path);
                }
            }
        }
    });

    it("the wiki index links to every wiki page", () => {
        for (const lang of ["fr", "en"]) {
            const files = (lang === "fr" ? FR : EN).filter((f) => f.startsWith("wiki/"));
            const listed = wikiPages(lang).map((p) => p.path);
            expect([...listed].sort()).toEqual(files);
        }
    });

    it("the memo lists the key TrueGlide settings, warnings and debug modes", () => {
        const keys = [
            "power_guard_esc_temp",
            "power_guard_current",
            "power_guard_min_throttle",
            "motor_desync_recovery",
            "motor_desync_threshold",
            "dshot_telemetry_fallback",
            "speeder_cruise_angle",
            "speeder_transition_rate",
            "speeder_fpv_mix",
            "ESC HOT",
            "AMP LIM",
            "RESTART",
            "POWER_GUARD",
            "MOTOR_HEALTH",
        ];
        for (const lang of ["fr", "en"]) {
            const memo = readFileSync(path.join(DOCS, lang, "memo.md"), "utf8");
            for (const key of keys) {
                expect(memo, `${lang}/memo.md: ${key}`).toContain(key);
            }
        }
    });

    it("the memo gives the firmware defaults and ranges", () => {
        // Values read in src/main/cli/settings.c and src/main/pg/*.c of the firmware
        const rows = {
            power_guard_esc_temp: "| 0 | 0 ",
            power_guard_current: "| 0 | 0 ",
            power_guard_min_throttle: "| 50 | 20 ",
            motor_desync_threshold: "| 40 | 10 ",
            speeder_cruise_angle: "| 60 | 10 ",
            speeder_transition_rate: "| 30 | 5 ",
        };
        for (const lang of ["fr", "en"]) {
            const memo = readFileSync(path.join(DOCS, lang, "memo.md"), "utf8");
            for (const [name, cells] of Object.entries(rows)) {
                const line = memo.split("\n").find((l) => l.startsWith(`| \`${name}\``));
                expect(line, `${lang}: ${name}`).toBeDefined();
                expect(line, `${lang}: ${name}`).toContain(cells);
            }
        }
    });
});

describe("TrueGlide docs: helpers", () => {
    it("picks French for a French locale, English otherwise", () => {
        expect(docsLanguage("fr")).toBe("fr");
        expect(docsLanguage("fr_FR")).toBe("fr");
        expect(docsLanguage("en")).toBe("en");
        expect(docsLanguage("de")).toBe("en");
        expect(docsLanguage(undefined)).toBe("en");
    });

    it("resolves relative links", () => {
        expect(resolveLink("wiki/index.md", "../memo.md")).toEqual({ path: "memo.md", hash: "" });
        expect(resolveLink("memo.md", "wiki/faq.md#top")).toEqual({ path: "wiki/faq.md", hash: "top" });
        expect(resolveLink("wiki/index.md", "speeder.md")).toEqual({ path: "wiki/speeder.md", hash: "" });
        expect(resolveLink("memo.md", "../../etc/passwd")).toBeNull();
    });

    it("bundles the pages through Vite", () => {
        expect(listPages("fr")).toEqual(FR);
        expect(listPages("en")).toEqual(EN);
        expect(getPage("fr", "memo.md")).toContain("# Mémo TrueGlide");
    });

    it("renders internal links for in-tab navigation and external links in a new tab", () => {
        const html = renderPage(
            "# T\n\n[Wiki](wiki/index.md) [Site](https://example.com) [x](nope.md)\n\n<script>alert(1)</script>",
            "fr",
            "memo.md",
        );
        const div = document.createElement("div");
        div.innerHTML = html;
        const [wiki, site, broken] = div.querySelectorAll("a");
        expect(wiki.dataset.docPath).toBe("wiki/index.md");
        expect(site.getAttribute("target")).toBe("_blank");
        expect(site.getAttribute("rel")).toContain("noopener");
        expect(broken.classList.contains("tf-docs-broken")).toBe(true);
        expect(div.querySelector("script")).toBeNull();
        expect(div.querySelector("h1").id).toBe("t");
    });
});

describe("TrueGlide Wiki button", () => {
    it("opens an existing built-in wiki page for every tab", async () => {
        const { wikiPageForTab } = await import("../../src/components/elements/WikiButton.vue");
        const fs = await import("node:fs");
        for (const tab of ["OSD", "flight-plan", "gps", "logging", "setup", "PID-Tuning", "trueglide_tune", ""]) {
            const page = wikiPageForTab(tab);
            for (const lang of ["fr", "en"]) {
                expect(fs.existsSync(`docs/trueglide/${lang}/${page}`), `${tab} -> ${page}`).toBe(true);
            }
        }
        expect(wikiPageForTab("OSD")).toBe("wiki/osd-debug.md");
        expect(wikiPageForTab("flight-plan")).toBe("wiki/navigation-gps.md");
    });
});
