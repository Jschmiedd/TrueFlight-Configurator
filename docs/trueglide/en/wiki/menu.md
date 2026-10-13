# App menu

[Wiki contents](index.md) · [Memo](../memo.md)

The left menu of TrueGlide Configurator follows the order in which a quad is set up. Some tabs only show in
**expert mode** (checkbox at the top of the app), or if the board has the feature (GPS, OSD, LED…).

## No quad connected

| Tab | Role |
|---|---|
| **Welcome** | home page: getting started, TrueGlide features, **Memo** and **Wiki** links |
| **Firmware Flasher** | install a TrueGlide `.hex` (see [Installation and flashing](installation.md)) |
| **Memo & Wiki** | this documentation, readable offline |
| **Pre-Flight** | weather and conditions at the flying site |
| **Flight Plan** | (expert mode) prepare a GPS mission without being connected |

## Quad connected

### Dashboard

Opens on connection (unless "remember last tab" is ticked):

- **Drone**: battery voltage (and per cell when the board detected the cell count), radio link (RSSI), GPS, and
  **what prevents arming**, reason by reason;
- **TrueGlide features**: what is on in the board (overheat protection, motor restart, speeder, PINIO
  outputs). A feature the firmware does not have is not listed;
- **Setup**: progress of the 9 setup steps and a **Continue** button;
- **Shortcuts**: Tuning assistant, **Back up the configuration** (saves a `diff all` to a text file, keep it before any
  change), Blackbox viewer, Memo.

### Guided setup

On the *Setup* group tabs and the *TrueGlide* tab, a bar at the top shows the step (1 to 9), what to check, and offers
**Previous** / **Step done, continue**. "Step done" only ticks the step: **settings are still saved with the tab's own
button**. Ticked steps are kept in the browser, per board, and shown in the menu (tick and "2/9" counter). **Hide the
guide** removes the bar; bring it back from the dashboard ("Show the guide").

### Setup

| Tab | Role |
|---|---|
| **Setup** | board status, accelerometer calibration, orientation. The attitude and heading dials (quad X icon) are shown only with a navigation firmware (`truenav_…`) |
| **Ports** | role of each serial port (receiver, GPS, MAVLink telemetry, VTX…) |
| **Configuration** | mixer (QuadX, X8…), motor protocol, bidirectional DShot, features |
| **Receiver** | radio protocol, channels, calibration |
| **Modes** | switches: ARM, ANGLE, SPEEDER, ALTHOLD, POSHOLD, GPS RESCUE, AUTOPILOT… |
| **Power & Battery** | voltage, current sensor (needed for the current limit) |
| **Motors** | motor test **with props off**, order and spin direction |
| **Servos** | servo outputs (tricopter, flying wing, tilting camera gimbal): direction, travel, centre. Present in TrueGlide firmwares, but not needed on a plain quad, hexa or X8 |
| **Failsafe** | behaviour on radio loss (a guided setup step, so shown without expert mode) |

### TrueGlide features

One tab per feature (each shows only what the board's firmware has):

| Tab | Role |
|---|---|
| **Protections** | overheat / over-current protection ([details](anti-surchauffe.md)) and motor health ([details](sante-moteurs.md)) |
| **Speeder** | SPEEDER mode ([details](speeder.md)) |
| **Navigation safety** | GPS navigation safety and TRUENAV missions ([details](navigation-gps.md)); if the board has GPS |
| **Camera** | camera power from a PINIO output ([details](camera.md)) |
| **Radio telemetry** | ESC temperature sent to the ELRS / Crossfire radio ([details](anti-surchauffe.md)) |

Buttons at the bottom: **Refresh** (reads the board again) and **Save and reboot** (sends only what changed; an
out-of-range value is refused, never silently clamped).

### Flight tuning

| Tab | Role |
|---|---|
| **Presets** | published presets |
| **PID Tuning** | PIDs, filters, simplified tuning sliders |
| **Tuning assistant** | TrueGlide starting tune from the quad's specs (see [Tuning assistant](assistant-reglage.md)) |
| **Autotune** | (expert mode) measures the quad's response ("chirp" excitation) |
| **Adjustments** | (expert mode) settings changed in flight with an AUX channel |

### GPS navigation

| Tab | Role |
|---|---|
| **GPS** | position, satellites, GPS settings (if the board has GPS) |
| **Flight Plan** | draw a mission on the map and send it to the quad (TRUENAV models) |

### Video and lights

| Tab | Role |
|---|---|
| **OSD** | displayed elements and warnings, including the [TrueGlide warnings](osd-debug.md) |
| **Video Transmitter** | channel, power |
| **LED Strip** | if the LED_STRIP feature is on |

### Analysis

| Tab | Role |
|---|---|
| **Sensors** | gyro, accelerometer, barometer graphs |
| **Blackbox** | logging setup and **debug mode** choice (`POWER_GUARD`, `MOTOR_HEALTH`) |
| **Blackbox Viewer** | flight log viewer |
| **Tethered Logging** | (expert mode) logging over the USB cable |

For automatic log analysis: [Log analysis](journaux.md).

### Tools

**CLI**: `get`, `set`, `save`, `diff all`. Every TrueGlide setting is also available there.
