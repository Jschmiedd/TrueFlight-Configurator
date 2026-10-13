// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
// TrueGlide guided setup: validated steps of the connected board, kept in the browser (per board).
import { reactive } from "vue";
import FC from "../fc";
import { SETUP_STEPS, progressKey, progressSummary } from "./dashboard";

export const setupProgress = reactive({ key: "", done: {}, hidden: false });

function save() {
    try {
        localStorage.setItem(
            setupProgress.key,
            JSON.stringify({ done: setupProgress.done, hidden: setupProgress.hidden }),
        );
    } catch {
        // storage unavailable (private window): progress lasts for this session only
    }
}

// Called once the board is identified (connection done)
export function loadSetupProgress() {
    setupProgress.key = progressKey(FC.CONFIG?.boardName, FC.CONFIG?.uid);
    let stored = {};
    try {
        stored = JSON.parse(localStorage.getItem(setupProgress.key) || "{}");
    } catch {
        stored = {};
    }
    setupProgress.done = { ...stored.done };
    setupProgress.hidden = Boolean(stored.hidden);
}

export function setStepDone(tab, done) {
    if (!SETUP_STEPS.some((s) => s.tab === tab)) {
        return;
    }
    setupProgress.done = { ...setupProgress.done, [tab]: Boolean(done) };
    save();
}

export function setGuideHidden(hidden) {
    setupProgress.hidden = Boolean(hidden);
    save();
}

export function currentProgress() {
    return progressSummary(setupProgress.done);
}
