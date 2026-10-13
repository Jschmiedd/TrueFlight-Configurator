# Motor health

[Wiki contents](index.md) · [Memo](../memo.md)

Two features that use the motor speed reported by the ESCs. Both are **off by default**.

## Settings

**Protections** tab (TrueGlide features group), "Motor health" section, or CLI:

| Setting | Role | Default | Range |
|---|---|---|---|
| `motor_desync_recovery` | restart of a desynced or stalled motor | OFF | OFF / ON |
| `motor_desync_threshold` | % of the expected speed below which the motor is judged stalled | 40 | 10 to 80 |
| `dshot_telemetry_fallback` | speed of a motor whose telemetry is lost: follows the others instead of staying frozen | OFF | OFF / ON |

## Restarting a stalled motor (`motor_desync_recovery`)

Detection: a motor commanded at 30 % or more spins slower than `motor_desync_threshold` % of its expected speed
(computed from the other motors, in proportion to the commands) **and** slower than half of the slowest other motor.

- Delay before acting: 10 ms with bidirectional DShot, 0.3 s with serial telemetry.
- Action: the motor is held at idle for 50 ms, then brought back progressively over 100 ms. The ESC restarts its
  commutation.
- A truly blocked motor is restarted about 6 times per second instead of heating at full power.
- The comparison is only made when the expected speed is above 1,500 rpm (low enough for 10 to 15" props).
- Up to **8 motors** are watched (quad, hexa, [X8](x8-coaxial.md)).

Developed on real logs: the firmware logic, replayed on 26 flights, acts on every stall and never on healthy flights.
It **does not repair** a failing ESC channel: it limits the damage. Large props (10 to 15") are only verified in unit
tests: **to be verified in flight**.

## Fallback telemetry (`dshot_telemetry_fallback`)

After 4 invalid telemetry frames in a row, a motor's speed is estimated from the others. It is used **only by the RPM
filter and dynamic idle**. The OSD and the blackbox keep showing the value received from the ESC, frozen if telemetry
is lost.

## What the ESCs need

| ESC firmware | Restart | Note |
|---|---|---|
| Bluejay, AM32, BLHeli_32 | yes (10 ms) | DShot300 or 600 with bidirectional DShot |
| KISS | with the serial wire (0.3 s) | |
| Stock BLHeli_S, old BLHeli, SimonK, PWM | no | flash Bluejay on a BLHeli_S |

With serial telemetry, the speed is converted to rpm as with DShot: `motor_poles` must be right.

## Seeing what happens

- **OSD**: "Motor restarted" warning, `M2 RESTART` blinking for 3 s (M1 to M8).
- **Blackbox**: debug mode `MOTOR_HEALTH`, number of restarts per motor.
- **After the flight**: [Log analysis](journaux.md) (`analyse_blackbox.py`, `rejouer_desync.py`).

## DShot advice

With bidirectional DShot, DShot300 is enough for a 4 kHz PID loop and makes telemetry less sensitive to noise.
DShot600 is for an 8 kHz loop (F7, H7, AT32F435). On F405, F411, G474 and APM32F4, the firmware itself replaces
DShot600 with DShot300 when bidirectional DShot is on: this is not a fault.
