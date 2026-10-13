// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
//
// Writes resources/THIRD_PARTY_NOTICES.txt (copied into the build): licence and licence text of every production
// dependency listed in package-lock.json, plus the fonts, libraries and 3D models kept in the repository.
// Run after any change of dependencies: node scripts/third-party-notices.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const lock = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));
const LICENSE_FILE = /^(licen[cs]e|copying|notice)(\.(md|txt|markdown))?$/i;

const out = [
    "TrueGlide Configurator - third-party notices",
    "",
    "TrueGlide Configurator is free software under the GPL-3.0 license (file LICENSE), derived from Betaflight App.",
    "It includes the components below, each under its own license.",
    "",
];

const bar = "-".repeat(78);
const bundled = [
    {
        name: "Open Sans (fonts, src/css/opensans_webfontkit)",
        license: "Apache-2.0",
        text: "Copyright 2011 Google Inc. / Digitized data copyright 2010-2011, Google Corporation.\nLicensed under the Apache License, Version 2.0: https://www.apache.org/licenses/LICENSE-2.0",
    },
    {
        name: "Flight Indicators (libraries/flightIndicators.js)",
        license: "GPL-3.0",
        text: "Based on jQuery Flight Indicators by Sébastien Matton, https://github.com/sebmatton/jQuery-Flight-Indicators",
    },
];
for (const file of fs.readdirSync(path.join(root, "resources/models")).filter((f) => f.endsWith(".license.txt"))) {
    bundled.push({
        name: `3D model resources/models/${file.replace(".license.txt", ".gltf")}`,
        license: "CC-BY-4.0",
        text: fs.readFileSync(path.join(root, "resources/models", file), "utf8").trim(),
    });
}
for (const b of bundled) {
    out.push(bar, `${b.name}  [${b.license}]`, bar, b.text, "");
}

const seen = new Set();
const packages = Object.entries(lock.packages)
    .filter(([key, p]) => key.startsWith("node_modules/") && !p.dev && !p.devOptional)
    .sort(([a], [b]) => a.localeCompare(b));
for (const [key] of packages) {
    const dir = path.join(root, key);
    const pkgFile = path.join(dir, "package.json");
    if (!fs.existsSync(pkgFile)) {
        continue; // optional package for another platform, not installed and not shipped
    }
    const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
    const id = `${pkg.name}@${pkg.version}`;
    if (seen.has(id)) {
        continue;
    }
    seen.add(id);
    const license = typeof pkg.license === "string" ? pkg.license : (pkg.license?.type ?? "see package");
    const file = fs.readdirSync(dir).find((f) => LICENSE_FILE.test(f));
    const text = file ? fs.readFileSync(path.join(dir, file), "utf8").trim() : `License: ${license} (no license file in the package)`;
    out.push(bar, `${id}  [${license}]`, pkg.homepage ?? "", bar, text, "");
}

fs.writeFileSync(path.join(root, "resources/THIRD_PARTY_NOTICES.txt"), out.join("\n"));
console.log(`resources/THIRD_PARTY_NOTICES.txt: ${seen.size} packages, ${bundled.length} bundled files`);
