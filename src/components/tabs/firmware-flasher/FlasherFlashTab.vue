<template>
    <UiBox :title="$t('tfFlasherFirmwareTitle')" class="release_info col-span-1 mt-4">
        <p class="tf-intro mb-3">{{ $t("tfFlasherIntro") }}</p>
        <div class="release_info_grid">
            <!-- Fichier chargé -->
            <div class="info_row">
                <strong>{{ $t("tfFlasherFileLabel") }}</strong>
                <span v-if="state.firmwareLoadedName" class="tf-filename">{{ state.firmwareLoadedName }}</span>
                <span v-else class="tf-muted">{{ $t("tfFlasherNoFileLoaded") }}</span>
                <div>
                    <UButton
                        size="xs"
                        variant="soft"
                        icon="i-lucide-hard-drive-download"
                        :disabled="state.loadFileButtonDisabled"
                        @click="onLoadFirmware"
                        >{{ $t("tfFlasherButtonLoadShort") }}</UButton
                    >
                </div>
            </div>

            <template v-if="state.firmwareLoadedName">
                <div class="info_row">
                    <strong>{{ $t("tfFlasherSizeLabel") }}</strong>
                    <span>{{ state.firmwareLoadedSize }}</span>
                    <div></div>
                </div>

                <template v-if="check && check.isTrueGlide">
                    <div class="info_row">
                        <strong>{{ $t("tfFlasherModelLabel") }}</strong>
                        <span>{{ modelLabelKey ? $t(modelLabelKey) : "" }}</span>
                        <div></div>
                    </div>
                    <div v-if="check.version" class="info_row">
                        <strong>{{ $t("firmwareFlasherReleaseVersion") }}</strong>
                        <span>{{ check.version }}</span>
                        <div></div>
                    </div>
                    <div v-if="check.mcu" class="info_row">
                        <strong>{{ $t("firmwareFlasherReleaseMCU") }}</strong>
                        <span>{{ check.mcu }}</span>
                        <div></div>
                    </div>
                    <div v-if="check.board" class="info_row">
                        <strong>{{ $t("tfFlasherBoardLabel") }}</strong>
                        <span>{{ check.board }}</span>
                        <div></div>
                    </div>
                </template>
                <div v-if="check && check.connectedBoard" class="info_row">
                    <strong>{{ $t("tfFlasherConnectedBoardLabel") }}</strong>
                    <span>{{ check.connectedBoard }}</span>
                    <div></div>
                </div>
            </template>

            <!-- Flash Status Row — live during flash, preserved result after -->
            <div v-if="flashStatusVisible" class="info_row">
                <strong>{{ $t("firmwareFlasherFlashStatus") }}</strong>
                <div class="status_ring_wrapper">
                    <ProgressRing
                        :value="flashStatusLive ? state.flashProgressValue : 100"
                        :indeterminate="state.flashingInProgress && state.flashProgressValue === 0"
                        :size="48"
                        :stroke-width="4"
                        :color="flashStatusLive ? flashRingColor : flashResultRingColor"
                        :label="$t('firmwareFlasherFlashingProgress')"
                    />
                    <div class="status_text">
                        <span :class="{ 'flash-status-error-text': flashStatusClass === 'invalid' }">
                            {{ flashStatusText
                            }}<template v-if="state.flashingInProgress">
                                {{ $t("firmwareFlasherPleaseWait") }}</template
                            >
                        </span>
                    </div>
                </div>
                <div>
                    <UButton
                        v-if="showRestoreButton"
                        size="xs"
                        color="success"
                        icon="i-lucide-upload"
                        :loading="restoreInProgress"
                        @click="onRestoreBackup"
                        :disabled="restoreInProgress"
                    >
                        {{ $t("firmwareFlasherRestoreBackup") }}
                    </UButton>
                </div>
            </div>
        </div>
    </UiBox>

    <!-- Avertissements sur le fichier chargé (n'empêchent pas le flash, voir confirmation) -->
    <UiBox
        v-if="check && !check.isTrueGlide"
        :title="$t('tfFlasherNotTrueGlideTitle')"
        type="warning"
        highlight
        class="mt-2 tf-file-warning"
        data-testid="tf-not-trueglide-warning"
    >
        <p>{{ $t("tfFlasherNotTrueGlideWarning", { filename: check.filename }) }}</p>
    </UiBox>
    <UiBox
        v-if="check && check.boardMismatch"
        :title="$t('tfFlasherBoardMismatchTitle')"
        type="warning"
        highlight
        class="mt-2 tf-file-warning"
        data-testid="tf-board-mismatch-warning"
    >
        <p>
            {{ $t("tfFlasherBoardMismatchWarning", { fileBoard: check.board, connectedBoard: check.connectedBoard }) }}
        </p>
    </UiBox>

    <div class="flash-extras mt-4">
        <!-- Warning and Recovery panes -->
        <div class="grid-box col2 mt-2">
            <UiBox :title="$t('warningTitle')" type="error" highlight class="note-text-format">
                <p>{{ $t("tfFlasherWarningShort") }}</p>
            </UiBox>
            <UiBox :title="$t('firmwareFlasherRecoveryHead')" highlight class="note-text-format">
                <p>{{ $t("firmwareFlasherRecoveryShort") }}</p>
            </UiBox>
        </div>

        <!-- Advanced (expert) options -->
        <UiBox :title="$t('firmwareFlasherAdvancedTitle')" type="neutral" class="mt-2">
            <SettingRow
                :label="$t('firmwareFlasherNoReboot')"
                :help="$t('firmwareFlasherNoRebootDescription')"
                full-width
            >
                <USwitch v-model="state.noRebootSequence" @change="onNoRebootChange" />
            </SettingRow>
            <SettingRow
                v-if="state.flashOnConnectWrapperVisible"
                :label="$t('firmwareFlasherFlashOnConnect')"
                :help="$t('firmwareFlasherFlashOnConnectDescription')"
                full-width
            >
                <USwitch v-model="state.flashOnConnect" />
            </SettingRow>
            <SettingRow
                :label="$t('firmwareFlasherFullChipErase')"
                :help="$t('firmwareFlasherFullChipEraseDescription')"
                full-width
            >
                <USwitch v-model="state.eraseChip" @change="onEraseChipChange" />
            </SettingRow>
            <SettingRow
                :label="$t('firmwareFlasherManualBaud')"
                :help="$t('firmwareFlasherManualBaudDescription')"
                full-width
            >
                <USwitch v-model="state.flashManualBaud" @change="onFlashManualBaudChange" />
                <USelect
                    v-model="state.flashManualBaudRate"
                    :items="[
                        { value: 921600, label: '921600' },
                        { value: 460800, label: '460800' },
                        { value: 256000, label: '256000' },
                        { value: 230400, label: '230400' },
                        { value: 115200, label: '115200' },
                        { value: 57600, label: '57600' },
                    ]"
                    class="min-w-24"
                    @update:model-value="onFlashManualBaudRateChange"
                />
            </SettingRow>
            <SettingRow :label="$t('firmwareBackupOnFlash')">
                <USelect
                    :items="[
                        { label: $t('firmwareBackupDisabled'), value: 0 },
                        { label: $t('firmwareBackupEnabled'), value: 1 },
                        { label: $t('firmwareBackupAsk'), value: 2 },
                    ]"
                    size="sm"
                    v-model="backupOnFlash"
                    class="min-w-40"
                    :ui="{ content: 'z-3002' }"
                />
            </SettingRow>
        </UiBox>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import UiBox from "@/components/elements/UiBox.vue";
import SettingRow from "@/components/elements/SettingRow.vue";
import ProgressRing from "@/components/ProgressRing.vue";
import { get as getConfig, set as setConfig } from "@/js/ConfigStorage";
import { getLastBackupData } from "@/js/utils/AutoBackup";

const props = defineProps({
    state: { type: Object, required: true },
    onLoadFirmware: { type: Function, required: true },
    flashRingColor: { type: String, required: true },
    onNoRebootChange: { type: Function, required: true },
    onEraseChipChange: { type: Function, required: true },
    onFlashManualBaudChange: { type: Function, required: true },
    onFlashManualBaudRateChange: { type: Function, required: true },
    onRestoreBackup: { type: Function, required: true },
});

// Résultat du contrôle de nom de fichier TrueGlide (js/trueglide/firmware_source.js)
const check = computed(() => props.state.tfFirmwareCheck);

const MODEL_LABEL_KEYS = {
    STANDARD: "tfFlasherModelStandard",
    TRUENAV: "tfFlasherModelTrueNav",
    TRUENAV_LIGHT: "tfFlasherModelTrueNavLeger",
};
const modelLabelKey = computed(() => MODEL_LABEL_KEYS[check.value?.model] || null);

// True while flash is actively running (progress updates flowing)
const flashStatusLive = computed(() => props.state.flashingInProgress || props.state.flashProgressValue > 0);

// Show row if live OR if a saved result exists
const flashStatusVisible = computed(() => flashStatusLive.value || !!props.state.lastFlashResultText);

// Text: live progress text during flash, saved result after
const flashStatusText = computed(() =>
    flashStatusLive.value ? props.state.progressLabelText : props.state.lastFlashResultText,
);

// Class: live class during flash, saved result class after
const flashStatusClass = computed(() =>
    flashStatusLive.value ? props.state.progressLabelClass : props.state.lastFlashResultClass,
);

// Ring color for saved result (mirrors flashRingColor logic)
const flashResultRingColor = computed(() => {
    switch (props.state.lastFlashResultClass) {
        case "invalid":
        case "erasing":
            return "error";
        case "flashing":
            return "warning";
        case "valid":
        case "verifying":
            return "success";
        default:
            return "primary";
    }
});

// backupOnFlash preference — read from ConfigStorage on mount, persisted via watch
const backupOnFlash = ref(getConfig("backupOnFlash", 1).backupOnFlash ?? 1);
watch(
    () => backupOnFlash.value,
    (v) => setConfig({ backupOnFlash: v }),
);

// Restore progress busy flag (driven by the parent via shared state)
const restoreInProgress = computed(() => props.state.restoreInProgress);

// Show restore button only when flash succeeded, not flashing, restore not already
// done, and backup data exists.
// Note: No longer checking DeviceHandler.portAvailable as it's stale after flash
const showRestoreButton = computed(() => {
    if (props.state.flashingInProgress) {
        return false;
    }
    if (props.state.lastFlashResultClass !== "valid" || !props.state.lastFlashResultText) {
        return false;
    }
    if (props.state.restoreInProgress || props.state.restoreCompleted) {
        return false;
    }
    // Only show if we have a backup available (checking for null or empty string)
    const backupData = getLastBackupData();
    return backupData !== null && backupData !== "";
});
</script>

<style scoped>
.release_info_grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem 1rem;
    align-items: center;
}

.release_info_grid .info_row {
    display: contents;
}

.release_info_grid strong {
    text-align: right;
    white-space: nowrap;
}

.release_info_grid span,
.release_info_grid a {
    text-align: left;
}

.release_info_grid .board_support {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-self: start;
}

.status_ring_wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.status_text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.85rem;
}

.flash-status-error-text {
    color: var(--error-500);
    font-weight: 600;
}

.tf-intro {
    font-size: 0.85rem;
}

.tf-muted {
    opacity: 0.7;
}

.tf-filename {
    font-family: monospace;
    word-break: break-all;
}

.flash-extras {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
