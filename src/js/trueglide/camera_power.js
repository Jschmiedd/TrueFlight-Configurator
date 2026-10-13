// TrueGlide Configurator - Copyright (C) 2026 TalkTrueFPV. Derived from Betaflight App.
// Free software under the GPL-3.0 license, WITHOUT ANY WARRANTY; see the LICENSE file.
// TrueGlide: camera / payload power switched by a PINIO output (base firmware feature, no firmware change).
// A PINIO pin follows a mode: USER1..USER4 (a radio switch set in the Modes tab) or ARM (on while armed).
// CLI: "pinio_box = 39,255,255,255" (mode permanent id per PINIO, 255 = none), "resource PINIO 2 C01" (pin).

export const PINIO_NONE = 255;

// Permanent mode ids (firmware src/main/msp/msp_box.c) offered for the camera, and names of the usual others
export const CAMERA_CONTROLS = [
    { id: 40, name: "USER1" },
    { id: 41, name: "USER2" },
    { id: 42, name: "USER3" },
    { id: 43, name: "USER4" },
    { id: 0, name: "ARM" },
];
const KNOWN = { 0: "ARM", 39: "VTX PIT MODE", 40: "USER1", 41: "USER2", 42: "USER3", 43: "USER4" };

export function pinioUseName(id) {
    if (id === PINIO_NONE) {
        return null;
    }
    return KNOWN[id] ?? `#${id}`;
}

// Reads the CLI replies of "get pinio_box" and "resource": the PINIO outputs that have a pin, with their mode.
export function parsePinio(lines) {
    let boxes = null;
    const pins = {};
    for (const raw of lines) {
        const line = raw.trim();
        const box = /^pinio_box\s*=\s*([\d,\s]+)$/.exec(line);
        if (box) {
            boxes = box[1].split(",").map((v) => Number(v.trim()));
        }
        const res = /^resource\s+PINIO\s+(\d+)\s+([A-Z]\d{2})$/i.exec(line);
        if (res) {
            pins[Number(res[1])] = res[2].toUpperCase();
        }
    }
    if (!boxes) {
        return { supported: false, boxes: [], outputs: [] };
    }
    const outputs = boxes
        .map((id, i) => ({ index: i + 1, pin: pins[i + 1] ?? null, box: id, use: pinioUseName(id) }))
        .filter((o) => o.pin);
    return { supported: true, boxes, outputs };
}

// Command that sets PINIO `index` (1-based) to follow `controlId`, every other PINIO unchanged.
export function cameraPowerCommand(boxes, index, controlId) {
    if (!Array.isArray(boxes) || index < 1 || index > boxes.length) {
        throw new Error(`PINIO ${index} unknown`);
    }
    if (!CAMERA_CONTROLS.some((c) => c.id === controlId)) {
        throw new Error(`mode ${controlId} not allowed for the camera`);
    }
    const next = boxes.slice();
    next[index - 1] = controlId;
    return `set pinio_box = ${next.join(",")}`;
}

// Another function already uses this output (VTX power, Bluetooth with ARM...): changing it removes that function.
export function pinioConflict(output, controlId) {
    return output.box !== PINIO_NONE && output.box !== controlId ? output.use : null;
}
