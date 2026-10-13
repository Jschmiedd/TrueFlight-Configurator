# Overheat / over-current protection

[Wiki contents](index.md) · [Memo](../memo.md)

The protection limits the **throttle** when an ESC gets too hot or when the battery current exceeds a limit. It keeps
motors and ESCs from burning during a long or overloaded flight. It is **off by default**.

## Settings

**Protections** tab (TrueGlide features group), "Overheat / over-current protection" section, or CLI:

| Setting | Role | Default | Range |
|---|---|---|---|
| `power_guard_esc_temp` | hottest ESC °C above which the throttle is limited (0 = off) | 0 | 0 to 150 |
| `power_guard_current` | battery amps above which the throttle is limited (0 = off) | 0 | 0 to 1000 |
| `power_guard_min_throttle` | the available throttle never goes below this percentage | 50 | 20 to 100 |

Starting point: `power_guard_esc_temp = 100` and `power_guard_current` = 80 % of the total continuous ESC rating
(one ESC per motor: for example 4 ESCs of 45 A: 4 × 45 × 0.8 = 144 A; an X8 with 8 ESCs of 45 A: 288 A). The [Tuning assistant](assistant-reglage.md) suggests these values.

## How it works

- Only the **throttle (collective)** is limited, never the PID corrections: the quad stays stable and controllable.
- The limit starts at the current throttle (not at 100 %), then comes down progressively. It never goes below
  `power_guard_min_throttle`.
- Temperature: the further the ESC is above the limit, the faster the throttle limit comes down (2 % per second at the
  limit, 2 % more per degree above it). Throttle comes back once the ESC is 3 °C below the limit.
- Current: the decrease is proportional to the excess. Throttle comes back below 90 % of the limit.
- Release: the limit goes back up at 25 % per second.
- Computed 100 times per second, only while armed.

## What the ESCs and board need

| Limit | Needs |
|---|---|
| Temperature | extended DShot telemetry (`dshot_edt`, Bluejay, AM32) or serial telemetry wire (BLHeli_32, KISS, AM32) |
| Current | current sensor on the board, or current from serial telemetry (`current_meter = ESC`) |

Without temperature telemetry (value 0), the temperature limit does nothing and gives the throttle back.

## Seeing what happens

- **OSD**: "Throttle limited" warning: `ESC HOT 65%` (temperature) or `AMP LIM 80%` (current). The percentage is the
  actual throttle limit. See [OSD warnings and debug modes](osd-debug.md).
- **Blackbox**: debug mode `POWER_GUARD`.

## Alert on the radio (optional)

In the goggles, the OSD already shows the ESC temperature (alarm `osd_esc_temp_alarm`) and the TrueGlide warning. For a
**voice alert on the radio** as well, turn on `crsf_tlm_esc_temp` (**Radio telemetry** tab, TrueGlide features group):

- the board sends each ESC temperature every 2 s over ELRS / Crossfire telemetry;
- on the radio (EdgeTX 2.10 or newer): Telemetry → Discover sensors, then an alert (for example above 85 °C);
- off by default; when on, the other sensors (battery, GPS) refresh a little slower, the control link is not affected;
- nothing is sent if an ESC does not report its temperature (never 0 °C nor a value on the wrong motor);
- the downlink can lose packets at long range: the radio alert adds to the OSD and the protection, it does not replace
  them.

Checked in a unit test (exact frame content); **to be tried with your radio**.

## Limits

- The protection uses the **hottest** ESC of all motors (including an [X8](x8-coaxial.md)).
- It does not replace a properly sized ESC: if the warning comes back every flight, the quad is overloaded.
