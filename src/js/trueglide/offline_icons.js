// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
// TrueGlide: the Lucide icons are bundled with the app, so they show without Internet (Nuxt UI otherwise
// downloads each icon set from api.iconify.design at startup).
import { addCollection } from "@iconify/vue";
import lucide from "@iconify-json/lucide/icons.json";

addCollection(lucide);
