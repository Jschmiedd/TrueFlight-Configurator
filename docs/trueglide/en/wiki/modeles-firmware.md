# Firmware models and boards

[Wiki contents](index.md) · [Memo](../memo.md)

## Three models

| Model | For | Contents | File |
|---|---|---|---|
| **TRUEGLIDE** | racing, freestyle, cinematic | usual flight control + TrueGlide additions | `trueglide_2026.6.2_<MCU>_<BOARD>.hex` |
| **TRUENAV** | quads that also fly with GPS | TRUEGLIDE + full navigation: missions (AUTOPILOT), ALTHOLD, POSHOLD, GPS RESCUE, geofence, missions over MAVLink | `truenav_…hex` |
| **TRUENAV_LIGHT** | navigation, long range, 512 KB boards | TRUENAV without the racing features (launch control, race transponder, "spec" pre-arm screen, race statistics) | `truenav_light_…hex` |

All three models have the TrueGlide additions: [overheat protection](anti-surchauffe.md),
[motor health](sante-moteurs.md), [SPEEDER mode](speeder.md). See also [GPS navigation](navigation-gps.md).

## Memory used (KB, measured)

| Board | TRUEGLIDE | TRUENAV | TRUENAV_LIGHT |
|---|---|---|---|
| MATEKF411 (512 KB) | 381 | 467 | 464 |
| SPEEDYBEEF7V3 (F722, 512 KB) | 397 | 492 | 490 |
| SPEEDYBEEF405MINI (1 MB) | 546 | 572 | 566 |
| MATEKH743 (2 MB) | — | 612 | 606 |

TRUENAV already fits everywhere; TRUENAV_LIGHT only saves 3 to 7 KB. On a 512 KB F722, about 20 KB remain free.

## Boards

629 boards (STM32 F405, F411, F722, F745, G474, H7, AT32F435, APM32, RP2350…). The models build on F411, F722, F405,
H743 and AT32F435. Build: `make CONFIG=<BOARD> MODELE=TRUENAV` (or `TRUENAV_LIGHT`, or nothing for TRUEGLIDE).

An [X8](x8-coaxial.md) needs 8 motor outputs.

## ESCs

| ESC firmware | Advised protocol | RPM filter | Temperature limit | Stalled motor |
|---|---|---|---|---|
| Bluejay (flashed BLHeli_S) | DShot300 or 600 | yes | yes (extended telemetry, `dshot_edt`) | yes (10 ms) |
| AM32 | DShot300 or 600 | yes | yes (extended, or serial wire) | yes (10 ms) |
| BLHeli_32 | DShot300 or 600 | yes | with the serial telemetry wire | yes (10 ms) |
| KISS | DShot | no | with the serial wire | with the serial wire (0.3 s) |
| Stock BLHeli_S | DShot | no (flash Bluejay) | no | no |
| Old BLHeli, SimonK | OneShot125 | no | no | no |
| Analog PWM ESC | PWM | no | no | no |

The current limit works with any ESC if the board has a current sensor.

## Radio and video

Serial receivers (ExpressLRS / CRSF, Ghost, SBUS, FPort, SRXL2, IBUS…), on-board receivers (ExpressLRS SPI), analog
and digital OSD (DJI O3 / O4, Walksnail, HDZero over MSP DisplayPort): everything works as before.

## App

TrueGlide Configurator works with the TRUEGLIDE and TRUENAV models (MSP API 1.48).
