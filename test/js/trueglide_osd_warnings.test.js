// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
import { describe, expect, it } from "vitest";
import FC from "../../src/js/fc";
import { OSD } from "../../src/components/tabs/osd/osd.js";

// Firmware order (src/main/osd/osd.h of TrueGlide): the 20 Betaflight 2026.6 warnings, then POWER_GUARD (20) and
// MOTOR_RESTART (21). A shift here would show the wrong name next to a checkbox.
function choose(apiVersion) {
    FC.CONFIG.apiVersion = apiVersion;
    OSD.loadDisplayFields();
    OSD.chooseFields();
    return OSD.constants;
}

describe("TrueGlide OSD warnings", () => {
    it("follow the 20 Betaflight warnings at API 1.48", () => {
        const c = choose("1.48.0");
        expect(c.WARNINGS.length).toBe(20);
        expect(c.WARNINGS.at(-1).name).toBe("AUTOPILOT_ABORT");
        expect(c.TRUEGLIDE_WARNINGS.map((w) => w.name)).toEqual(["POWER_GUARD", "MOTOR_RESTART"]);
    });

    it("are not named on another API version (a newer Betaflight may add its own warnings there)", () => {
        expect(choose("1.49.0").TRUEGLIDE_WARNINGS).toEqual([]);
        expect(choose("1.47.0").TRUEGLIDE_WARNINGS).toEqual([]);
    });
});
