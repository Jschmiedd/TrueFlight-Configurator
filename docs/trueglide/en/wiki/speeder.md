# SPEEDER mode

[Wiki contents](index.md) · [Memo](../memo.md)

For speeders that take off with the fuselage vertical (90°) and fly fast with the fuselage nearly horizontal. The mode
tilts the quad forward progressively, in **ANGLE** mode, and the pilot keeps control around that angle.

**To be verified in flight**: the logic is verified (unit tests, simulator), not yet the behaviour in real flight.

## Settings

**Speeder** tab (TrueGlide features group), or CLI:

| Setting | Role | Default | Range |
|---|---|---|---|
| `speeder_cruise_angle` | forward tilt at the end of the transition (°) | 60 | 10 to 80 |
| `speeder_transition_rate` | transition speed (°/s) | 30 | 5 to 180 |
| `speeder_fpv_mix` | roll / yaw rotated with the transition (like `fpv_mix_degrees`, but progressive) | OFF | OFF / ON |

## Setup

1. **Modes** tab: put **SPEEDER** on a switch.
2. Fly in **ANGLE** mode (without ANGLE, the mode does nothing).
3. Switch on: the nose goes down progressively to the cruise angle.
4. Switch off, or failsafe: progressive return to hover.
5. GPS RESCUE, ALTHOLD and POSHOLD cancel the transition (they command the tilt themselves).

## First tries

Start with `speeder_cruise_angle = 20`, at altitude, then go up in 10° steps. At 30 °/s, going from 0 to 60° takes
2 s.

## Blackbox

The applied tilt offset is logged in the `ANGLE_MODE` debug mode, channel 4 (degrees × 10).
