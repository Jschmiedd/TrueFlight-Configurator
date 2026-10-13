# Camera and gimbal

[Wiki contents](index.md) · [Memo](../memo.md)

Adding a camera (recording, inspection, filming) or a gimbal to a TrueGlide quad. This guide applies to every camera;
the sheets at the bottom give what changes with the model.

**To be checked on the quad**: these features come from the base firmware and the Configurator. The setup logic is
covered by tests, but nothing has been tried with a real camera yet.

## 1. Power: turning the camera on and off

To save battery, the camera can be powered by a **switchable PINIO output** of the board:

1. Check on the **board wiring diagram** which output is switchable (often a "VTX / Cam" 12 V) and its voltage. It must
   be within the camera range and supply enough current.
2. **Camera** tab (TrueGlide features group): pick the output, then the control:
   - **Radio switch (USER1 to USER4)**: then, **Modes** tab, assign that USER mode to a switch;
   - **On when the quad is armed**: the camera turns on when arming and off when disarming.
3. **Save and reboot**, then test **with props off**.

If an output is already used for something else (VTX power cut in "VTX PIT MODE", Bluetooth…), the Configurator warns
you: using it for the camera removes that function.

Board **without a switchable output**: a small **switch module (MOSFET)** on the battery, driven by a free pad of the
board declared in the CLI (`resource PINIO 1 <pad>`), then the same section.

Never power a camera or a gimbal from the **board 5 V**: a current spike can reboot the board in flight.

## 2. Motion control: four families

| Family | Control | Where it is set | Examples |
|---|---|---|---|
| 1. Fixed camera | none (on / off only) | Camera / payload section | recording camera |
| 2. Servo gimbal | AUX channels to the servo outputs | **Servos** tab (SERVO_TILT feature, CAMSTAB mode) | 1 or 2 axis servo gimbal |
| 3. S.Bus / PWM gimbal | straight from a receiver | manufacturer software | SIYI A8 mini, Storm32 in RC mode |
| 4. Serial protocol gimbal | the flight controller talks to the gimbal | firmware (one driver per protocol) | Caddx GM3 |

- **Family 2**: each servo can follow an AUX channel (dial: continuous angle; switch: fixed positions), and the
  **CAMSTAB** mode (Modes tab) turns stabilisation on. One free output per servo is needed.
- **Family 3**: with an ELRS receiver wired to the board in CRSF, the flight controller does not send S.Bus back: a
  **second receiver** set to S.Bus output is needed, or a PWM-output receiver with one pin outputting S.Bus (check for
  the model).
- **Family 4**: the **Caddx GM3** driver is enabled in the TrueGlide firmwares (except F411 boards and the
  TRUENAV_LIGHT model, for lack of room): **Ports** tab, choose "Caddx GM3 gimbal" on the serial port wired to the gimbal.

## 3. Video

A filming camera is not always compatible with the FPV video link. With **Walksnail**, **DJI** or **HDZero**, the link
only takes its own camera: the filming camera **records to its SD card**, and you fly with the FPV camera. Seeing its
picture live needs a second video link (analog or Ethernet, depending on the camera).

## 4. Weight and tuning

A camera or gimbal adds weight and vibration: damped mounting, centre of gravity checked, then run the
[Tuning assistant](assistant-reglage.md) again with the new weight.

## Camera sheets

### SIYI A8 mini (family 3)

- 4K camera, 6x digital zoom (no zoom in 4K), 3-axis gimbal.
- Power **11 to 25.2 V** (3S to 6S) according to the manufacturer, about 5 W on average and 12 W peak: a switched
  **12 V** output works, a 9 V output does not.
- Controlled by **S.Bus** (dials and switches set in SIYI PC Assistant: tilt, pan, centre, zoom). It also takes UART
  and Ethernet (SIYI protocol), not handled by TrueGlide.
- Video: Ethernet, HDMI or analog depending on the version, **not Walksnail compatible**: records to the SD card.
- The announced travel differs between manual versions: rely on the manual of the camera you buy.

### Caddx GM3 (family 4)

- 3-axis gimbal for a Walksnail camera, driven by a serial port (115200 baud) and the goggles head tracking.
- Driver **enabled** in the TrueGlide firmwares (except F411 and TRUENAV_LIGHT). Setup: **Ports** tab, "Caddx GM3
  gimbal" on the serial port wired to the gimbal, then save. CLI settings `gimbal_*` (gains, offsets, limits,
  `gimbal_stabilisation` 0 to 2, `gimbal_sensitivity`).
- It follows the radio sticks and the goggles head tracking; without head tracking for 0.25 s the gimbal re-centres.
  No switch control yet.
- Verified in the simulator: frames sent to the gimbal (correct header and CRC), port recognised in the Ports tab.
  **Not tried with a real GM3 yet.**

## Boards

- **SpeedyBee F405 Mini**: 4 motor outputs only (no X8); its PINIO is tied to arming (stock): for a camera,
  a switch module.
- **T-Hobby Velox F7 SE** (V70A 8S stack): 8 motor outputs, **12 V / 3 A** output according to the manufacturer sheet;
  **PINIO1** is used for "VTX PIT MODE" from stock, **PINIO2** is free. Check on the diagram which one switches the 12 V.
