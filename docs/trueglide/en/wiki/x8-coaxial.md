# Coaxial X8

[Wiki contents](index.md) · [Memo](../memo.md)

An X8 is a **coaxial** octocopter: 4 arms, 2 motors per arm (one on top, one below, props spinning in opposite
directions). The firmware drives it with the **OCTOX8** mixer (8 motors).

## Setup

1. A board with **8 motor outputs** (or more).
2. **Configuration** tab: **Octo X8** mixer (CLI: `mixer OCTOX8`). Save.
3. **Props off**, **Motors** tab: check the 8 motors one by one, their position and spin direction (diagram shown in
   the Configuration tab).

## What TrueGlide does on an X8

| Feature | On an X8 |
|---|---|
| [Motor health](sante-moteurs.md) | watches all 8 motors (stalled motor restart, fallback telemetry) |
| `MOTOR_HEALTH` debug mode | one value per motor, motors 1 to 8 |
| "Motor restarted" OSD warning | `M1 RESTART` to `M8 RESTART` |
| [Overheat protection](anti-surchauffe.md) | uses the hottest of the 8 ESCs |
| [Log analysis](journaux.md) | the tools read up to 8 motors |
| [Tuning assistant](assistant-reglage.md) | "Coaxial X8" frame choice (thrust estimated with a 20 % loss per motor) |

## Advice

- The lower motors work in the downwash of the upper ones: they spin faster for the same thrust. Motor health compares
  each motor with its **expected** speed from the commands, not with a fixed value.
- Current limit: 80 % of the total rating of the **8** ESCs if the current sensor measures the whole aircraft.
- First flight: **to be verified in flight**. The tools and the logic are verified up to 8 motors in tests, not yet on
  a real X8 flight.
