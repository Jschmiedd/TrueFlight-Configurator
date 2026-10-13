<!--
    TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
    Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
-->
<template>
    <div v-if="visible" class="tf-guide" role="region" :aria-label="$t('tfGuideTitle')">
        <div class="tf-guide__head">
            <span class="tf-guide__step">
                {{ $t("tfGuideStep", { n: index + 1, total: SETUP_STEPS.length }) }}
                <UIcon v-if="done" name="i-lucide-circle-check" class="text-(--ui-primary) align-middle" />
            </span>
            <div class="tf-guide__bar">
                <div :style="{ width: `${pct}%` }"></div>
            </div>
            <span class="text-sm">{{ progress.count }} / {{ progress.total }}</span>
        </div>
        <p class="tf-guide__help">{{ $t(step.help) }}</p>
        <div class="tf-guide__actions">
            <UButton
                size="sm"
                color="neutral"
                variant="subtle"
                icon="i-lucide-arrow-left"
                :label="$t('tfGuidePrevious')"
                :disabled="index === 0"
                @click="goTo(index - 1)"
            />
            <UButton
                size="sm"
                variant="link"
                color="neutral"
                :label="$t('tfGuideHide')"
                @click="setGuideHidden(true)"
            />
            <span class="flex-1"></span>
            <UButton
                v-if="done"
                size="sm"
                variant="link"
                color="neutral"
                :label="$t('tfGuideUndo')"
                @click="setStepDone(step.tab, false)"
            />
            <UButton
                size="sm"
                trailing-icon="i-lucide-arrow-right"
                :label="index === SETUP_STEPS.length - 1 ? $t('tfGuideFinish') : $t('tfGuideValidate')"
                @click="validate"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { vueTabState } from "@/js/vue_tab_mounter.js";
import { useConnectionStore } from "@/stores/connection";
import { SETUP_STEPS, stepIndex } from "@/js/trueglide/dashboard.js";
import { setupProgress, setStepDone, setGuideHidden, currentProgress } from "@/js/trueglide/setup_progress.js";

// TrueGlide guided setup: shown above the tabs of the setup steps. "Validate" only records that the pilot has
// set this step (kept in the browser); the tab's own Save button still writes the settings to the board.
const connectionStore = useConnectionStore();

const index = computed(() => stepIndex(vueTabState.activeTabName));
const visible = computed(() => connectionStore.connectionValid && !setupProgress.hidden && index.value >= 0);
const step = computed(() => SETUP_STEPS[Math.max(index.value, 0)]);
const done = computed(() => Boolean(setupProgress.done[step.value.tab]));
const progress = computed(() => {
    void setupProgress.done;
    return currentProgress();
});
const pct = computed(() => Math.round((progress.value.count / progress.value.total) * 100));

function goTo(i) {
    const target = i >= 0 && i < SETUP_STEPS.length ? SETUP_STEPS[i].tab : "dashboard";
    import("@/js/tab_switch.js").then(({ switchTab }) => {
        switchTab(target, { mode: "connected" });
        // each step starts at the top of its tab
        document.getElementById("content")?.scrollTo(0, 0);
    });
}

function validate() {
    setStepDone(step.value.tab, true);
    goTo(index.value + 1);
}
</script>

<style scoped>
.tf-guide {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    background-color: var(--surface-50);
    border-bottom: 1px solid var(--surface-200);
}
.tf-guide__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.tf-guide__step {
    font-weight: 600;
    font-size: 0.875rem;
    white-space: nowrap;
}
.tf-guide__bar {
    flex: 1;
    height: 6px;
    border-radius: 6px;
    background-color: var(--surface-300);
}
.tf-guide__bar > div {
    height: 6px;
    border-radius: 6px;
    background-color: var(--ui-primary);
}
.tf-guide__help {
    margin: 0;
    font-size: 0.875rem;
}
.tf-guide__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}
</style>
