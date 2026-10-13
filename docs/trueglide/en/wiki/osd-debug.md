# OSD warnings and debug modes

[Wiki contents](index.md) · [Memo](../memo.md)

## TrueGlide OSD warnings

Two warnings are added to the usual ones. **OSD** tab: warnings list, and the "Warnings" element shown on screen.

| Warning (OSD tab) | Shown | When |
|---|---|---|
| Throttle limited (TrueGlide) | `ESC HOT 65%` or `AMP LIM 80%` | the [overheat protection](anti-surchauffe.md) limits the throttle; the % is the actual throttle limit |
| Motor restarted (TrueGlide) | `M2 RESTART` (blinking) | for 3 s after a stalled or desynced motor is restarted ([motor health](sante-moteurs.md)); `M1` to `M8` |

- `ESC HOT`: an ESC reached `power_guard_esc_temp`. `AMP LIM`: the current is above `power_guard_current`.
- The warnings only show while armed, and only if the matching protection is on.
- On a board that keeps an old configuration, **tick both warnings** in the OSD tab (they are ticked by default after a
  reset).

## TrueGlide debug modes

The debug mode chooses what the blackbox logs in the `debug[0…7]` channels. **Blackbox** tab, or CLI
`set debug_mode = POWER_GUARD` then `save`. The **Blackbox Viewer** names the channels.

### POWER_GUARD

| Channel | Content |
|---|---|
| `debug[0]` | applied throttle limit (‰: 1000 = no limit) |
| `debug[1]` | limit from temperature (‰) |
| `debug[2]` | limit from current (‰) |
| `debug[3]` | hottest ESC temperature (°C, 0 = unknown) |
| `debug[4]` | battery current (A × 10) |

### MOTOR_HEALTH

| Channel | Content |
|---|---|
| `debug[0]` to `debug[7]` | number of restarts of motor 1 to 8 since power-on |

A quad only uses channels 0 to 3; an [X8](x8-coaxial.md) uses all 8.

### ANGLE_MODE (SPEEDER mode)

`debug[4]`: tilt added by [SPEEDER mode](speeder.md) (degrees × 10).

## Reading motor speed

Each motor's speed (`eRPM`) is logged with bidirectional DShot, whatever the debug mode. It is used by
[log analysis](journaux.md).
