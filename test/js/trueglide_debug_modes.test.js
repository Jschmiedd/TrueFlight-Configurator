// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
import { describe, expect, it } from "vitest";
import { getDebugModeIndex, getDebugFieldNames } from "../../src/js/utils/debugModes";

// Indices of the TrueGlide firmware enum (src/main/build/debug.h of the TrueGlide firmware, 2026.6.2 base).
describe("TrueGlide debug modes", () => {
    it("match the firmware enum", () => {
        expect(getDebugModeIndex("AUTOPILOT_STOP", "1.48.0")).toBe(101);
        expect(getDebugModeIndex("POWER_GUARD", "1.48.0")).toBe(102);
        expect(getDebugModeIndex("MOTOR_HEALTH", "1.48.0")).toBe(103);
    });

    it("name the blackbox fields", () => {
        const fields = getDebugFieldNames("1.48.0");
        expect(fields.POWER_GUARD["debug[0]"]).toBe("Throttle Cap (‰)");
        expect(fields.MOTOR_HEALTH["debug[1]"]).toBe("Motor 2 Recoveries");
    });
});
