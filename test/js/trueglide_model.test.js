// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
import { describe, expect, it, vi } from "vitest";

vi.mock("three", () => ({}));
vi.mock("three/examples/jsm/loaders/GLTFLoader.js", () => ({ GLTFLoader: class {} }));
vi.mock("../../src/js/utils/three/CanvasRenderer", () => ({ CanvasRenderer: class {} }));

const { modelFileFor, mixerList } = await import("../../src/js/model.js");
const pos = (name) => mixerList.findIndex((m) => m.name === name) + 1;

describe("TrueGlide 3D model", () => {
    it("shows a quad X for Quad X and X8", () => {
        expect(modelFileFor(pos("Quad X"))).toBe("quad_x");
        expect(modelFileFor(pos("Octo X8"))).toBe("quad_x");
    });

    it("keeps the generic model for custom mixers and the usual models elsewhere", () => {
        expect(modelFileFor(pos("Custom"))).toBe("custom");
        expect(modelFileFor(pos("Hex X"))).toBe("hex_x");
        expect(modelFileFor(pos("Octo Flat X"))).toBe("custom");
    });
});
