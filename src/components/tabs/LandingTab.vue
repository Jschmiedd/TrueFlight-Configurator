<template>
    <BaseTab tab-name="landing">
        <div class="content_wrapper tf-landing">
            <!-- TrueGlide home page (no drone connected): light band with the logo, colored band with three columns -->
            <header class="tf-hero">
                <img src="/images/tf_logo_accueil_clair.png" alt="TrueGlide" class="tf-logo tf-logo-clair" />
                <img src="/images/tf_logo_accueil_sombre.png" alt="TrueGlide" class="tf-logo tf-logo-sombre" />
                <!-- same width as the logo, so the text lines up with it -->
                <div class="tf-hero-text">
                    <p class="tf-intro" v-html="$t('defaultWelcomeIntro')"></p>
                </div>
                <!-- the tagline may be wider than the logo, to stay on one line -->
                <p class="tf-tagline">{{ $t("tfLandingTagline") }}</p>
            </header>

            <section class="tf-band">
                <!-- the three firmware models at the top; safety and hardware frames at the bottom, like the right column -->
                <div class="tf-col tf-col-left">
                    <div>
                        <h2>{{ $t("tfLandingModelsHead") }}</h2>
                        <ul class="tf-models">
                            <li v-for="m in models" :key="m.key">
                                <UIcon :name="m.icon" class="size-4 shrink-0 mt-0.5" />
                                <span>
                                    <strong>{{ $t(`tfLandingModel_${m.key}`) }}</strong>
                                    {{ $t(`tfLandingModel_${m.key}Text`) }}
                                </span>
                            </li>
                        </ul>
                        <p class="mt-2">{{ $t("tfLandingModelsNote") }}</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="tf-card">
                            <h2>{{ $t("tfSafetyHead") }}</h2>
                            <p>{{ $t("tfSafetyNotice") }}</p>
                        </div>
                        <div class="tf-card">
                            <h2>{{ $t("defaultHardwareHead") }}</h2>
                            <div class="tf-landing-html" v-html="$t('tfLandingHardwareText')"></div>
                        </div>
                    </div>
                </div>
                <div class="tf-col">
                    <h2>{{ $t("tfLandingFeaturesHead") }}</h2>
                    <ul class="tf-features">
                        <li v-for="f in features" :key="f.key">
                            <UIcon :name="f.icon" class="size-4 shrink-0 mt-0.5" />
                            <span>
                                <strong>{{ $t(`tfLandingFeat_${f.key}`) }}</strong>
                                {{ $t(`tfLandingFeat_${f.key}Text`) }}
                            </span>
                        </li>
                    </ul>
                    <p class="mt-2">{{ $t("tfLandingDefaultsOff") }}</p>
                    <ul class="tf-links">
                        <li v-for="l in links" :key="l.tab">
                            <UIcon :name="l.icon" class="size-4 shrink-0 mt-0.5" />
                            <span>
                                <a href="#" @click.prevent="go(l.tab)">{{ $t(l.label) }}</a> :
                                {{ $t(l.text) }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="tf-col tf-col-right">
                    <div>
                        <h2>{{ $t("tfLandingStartHead") }}</h2>
                        <ol class="tf-steps">
                            <li v-for="(step, i) in steps" :key="step">
                                <span class="tf-step-number">{{ i + 1 }}</span>
                                <span>{{ $t(step) }}</span>
                            </li>
                        </ol>
                    </div>
                    <div class="tf-card">
                        <h2>{{ $t("tfLandingFreeHead") }}</h2>
                        <p>
                            {{ $t("tfLandingCredit") }}
                            <a :href="SOURCE_URL" target="_blank" rel="noopener noreferrer">{{ SOURCE_URL }}</a>
                        </p>
                        <p class="mt-1">{{ $t("tfLandingTrademarks") }}</p>
                        <p class="mt-1">
                            <a href="resources/THIRD_PARTY_NOTICES.txt" target="_blank" rel="noopener">{{
                                $t("tfLandingNotices")
                            }}</a>
                        </p>
                        <h2 class="mt-3">{{ $t("tfLandingPrivacyHead") }}</h2>
                        <p>{{ $t("tfLandingPrivacyText") }}</p>
                    </div>
                </div>
            </section>

            <footer class="tf-foot">
                <span>{{ $t("language_choice_message") }}</span>
                <USelect
                    :model-value="selectedLanguage"
                    :items="languageItems"
                    size="sm"
                    class="min-w-48"
                    @update:model-value="changeLanguage"
                />
            </footer>
        </div>
    </BaseTab>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseTab from "./BaseTab.vue";
import GUI from "../../js/gui";
import { i18n } from "../../js/localization";

const links = [
    { tab: "help", icon: "i-lucide-book-open", label: "tabHelp", text: "tfLandingLinkHelp" },
    { tab: "firmware_flasher", icon: "i-lucide-zap", label: "tabFirmwareFlasher", text: "tfLandingLinkFlasher" },
    { tab: "preflight", icon: "i-lucide-clipboard-check", label: "tabPreflight", text: "tfLandingLinkPreflight" },
    { tab: "blackbox_viewer", icon: "i-lucide-line-chart", label: "tabBlackboxViewer", text: "tfLandingLinkBlackbox" },
];

// licence text and source code of the published version (GPL-3.0 §5d / §6)
const SOURCE_URL = "https://github.com/Jschmiedd/TrueGlide-Configurator";

// the three TrueGlide firmware models (file prefixes trueglide_, truenav_, truenav_light_)
const models = [
    { key: "standard", icon: "i-lucide-zap" },
    { key: "truenav", icon: "i-lucide-map-pinned" },
    { key: "leger", icon: "i-lucide-navigation" },
];

const steps = ["tfLandingStep1", "tfLandingStep2", "tfLandingStep3", "tfLandingStep4"];

const features = [
    { key: "power", icon: "i-lucide-thermometer" },
    { key: "motor", icon: "i-lucide-fan" },
    { key: "speeder", icon: "i-lucide-gauge" },
    { key: "assistant", icon: "i-lucide-wand-sparkles" },
    { key: "nav", icon: "i-lucide-map-pin" },
    { key: "camera", icon: "i-lucide-camera" },
];

const availableLanguages = ["DEFAULT", ...i18n.getLanguagesAvailables()];
const selectedLanguage = ref(i18n.selectedLanguage);
const languageItems = computed(() =>
    availableLanguages.map((lang) => ({ label: i18n.getMessage(`language_${lang}`), value: lang })),
);

function changeLanguage(lang) {
    if (i18n.selectedLanguage !== lang) {
        i18n.changeLanguage(lang);
        selectedLanguage.value = lang;
    }
}

function go(tab) {
    import("@/js/tab_switch").then(({ switchTab }) =>
        switchTab(tab, { mode: tab === "blackbox_viewer" ? "shared" : "disconnected" }),
    );
}

onMounted(() => {
    GUI.content_ready();
});
</script>

<style lang="less">
/* TrueGlide: one logo per theme */
.dark .tf-logo-clair,
html:not(.dark) .tf-logo-sombre {
    display: none;
}
.tab-landing {
    display: flex;
    min-height: 100%;
    background: var(--surface-100) url(../../images/pattern_light.png);
    background-size: 300px;
    overflow: hidden;
}
.tf-landing {
    display: flex;
    flex-direction: column;
    height: unset;
    overflow-y: auto;
    padding: 0;

    .tf-hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        padding: 28px 20px 24px;
    }
    .tf-logo {
        width: 480px;
        max-width: 100%;
        /* the word TRUEGLIDE sits right of the round badge: shift the image so the word is centred on the page */
        transform: translateX(-12.5%);
    }
    .tf-hero-text {
        width: 480px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
    .tf-intro {
        font-size: 15px;
        font-weight: 300;
    }
    .tf-tagline {
        font-size: 17px;
        font-weight: 600;
    }
    .tf-steps {
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
            display: flex;
            gap: 8px;
            align-items: flex-start;
        }
    }
    .tf-col-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 16px;
    }
    .tf-models li {
        display: flex;
        gap: 8px;
        padding: 3px 0;
    }
    .tf-col-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 16px;
    }
    .tf-step-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 999px;
        border: 2px solid currentColor;
        font-weight: 700;
        font-size: 0.8rem;
    }

    /* colored band, like the Betaflight home page: text in the background color for contrast */
    .tf-band {
        display: grid;
        grid-template-columns: 1.1fr 1.4fr 1fr;
        gap: 24px;
        padding: 24px;
        background-color: var(--ui-primary);
        color: var(--ui-bg);
        font-size: 13px;

        h2 {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        a {
            color: inherit;
            font-weight: 700;
            text-decoration: underline;
        }
    }
    /* small black frame at the bottom of the right column */
    .tf-card {
        font-size: 12px;
        background-color: var(--ui-bg);
        color: var(--ui-text);
        border-radius: 6px;
        padding: 10px 14px;

        h2 {
            font-size: 13px;
            margin-bottom: 4px;
        }

        a {
            color: var(--ui-primary);
        }
    }
    .tf-features li {
        display: flex;
        gap: 8px;
        padding: 3px 0;
    }
    .tf-landing-html ul {
        margin-top: 6px;
        padding-left: 18px;
        list-style: disc;
    }
    .tf-landing-html li {
        padding: 2px 0;
    }
    .tf-links {
        margin-top: 10px;

        li {
            display: flex;
            gap: 8px;
            padding: 3px 0;
        }
    }
    .tf-foot {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px;
        font-size: 13px;
    }
}
@media all and (max-width: 1100px) {
    .tf-landing {
        .tf-band {
            grid-template-columns: 1fr 1fr;
        }
        .tf-col-right {
            grid-column: 1 / -1;
        }
    }
}
@media all and (max-width: 575px), all and (max-width: 950px) and (max-height: 500px) and (orientation: landscape) {
    .tf-landing {
        .tf-logo {
            display: none;
        }
        .tf-band {
            grid-template-columns: 1fr;
        }
    }
}
</style>
