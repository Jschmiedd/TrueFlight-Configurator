// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
import { describe, expect, it } from "vitest";
import {
    CAMERA_CONTROLS,
    cameraPowerCommand,
    parsePinio,
    pinioConflict,
} from "../../src/js/trueglide/camera_power";

// CLI replies as printed by the firmware (cli.c: arrays joined by ",", "resource %s %d %c%02d")
const veloxF7Se = [
    "# get pinio_box",
    "pinio_box = 39,255,255,255",
    "Array length: 4",
    "# resource",
    "resource BEEPER 1 C13",
    "resource MOTOR 1 B00",
    "resource PINIO 1 C15",
    "resource PINIO 2 C01",
    "resource LED_STRIP 1 A10",
];

describe("TrueGlide camera power (PINIO)", () => {
    it("lists the PINIO outputs that have a pin, with their current use", () => {
        const p = parsePinio(veloxF7Se);
        expect(p.supported).toBe(true);
        expect(p.outputs).toEqual([
            { index: 1, pin: "C15", box: 39, use: "VTX PIT MODE" },
            { index: 2, pin: "C01", box: 255, use: null },
        ]);
    });

    it("reports no PINIO when the firmware has none (SITL: get pinio_box is unknown)", () => {
        const p = parsePinio(["###ERROR IN get: INVALID NAME: pinio_box###"]);
        expect(p.supported).toBe(false);
        expect(p.outputs).toEqual([]);
    });

    it("changes only the chosen PINIO", () => {
        const { boxes } = parsePinio(veloxF7Se);
        expect(cameraPowerCommand(boxes, 2, 40)).toBe("set pinio_box = 39,40,255,255");
        expect(cameraPowerCommand(boxes, 2, 0)).toBe("set pinio_box = 39,0,255,255");
    });

    it("refuses an unknown PINIO or a mode that is not a camera control", () => {
        const { boxes } = parsePinio(veloxF7Se);
        expect(() => cameraPowerCommand(boxes, 5, 40)).toThrow();
        expect(() => cameraPowerCommand(boxes, 1, 39)).toThrow();
        expect(CAMERA_CONTROLS.map((c) => c.name)).toEqual(["USER1", "USER2", "USER3", "USER4", "ARM"]);
    });

    it("warns before taking an output used by something else", () => {
        const [vtx, free] = parsePinio(veloxF7Se).outputs;
        expect(pinioConflict(vtx, 40)).toBe("VTX PIT MODE");
        expect(pinioConflict(free, 40)).toBe(null);
        expect(pinioConflict({ ...free, box: 40, use: "USER1" }, 40)).toBe(null);
    });
});
