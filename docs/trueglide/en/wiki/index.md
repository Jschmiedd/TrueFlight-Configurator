# TrueGlide wiki

TrueGlide is a flight controller firmware and a configuration app, TrueGlide Configurator. The firmware adds
protections and features to the usual flight control. Everything is off by default, and without TrueGlide settings
the quad flies as with the original firmware.

The essentials on one page: [Memo](../memo.md).

## Getting started

- [Installation and flashing](installation.md): get the `.hex` file, flash, safe first flight.
- [Firmware models and boards](modeles-firmware.md): TRUEGLIDE, TRUENAV, TRUENAV_LIGHT, memory, compatible ESCs.
- [App menu](menu.md): every group and tab of TrueGlide Configurator.

## TrueGlide features

- [Overheat protection](anti-surchauffe.md): limits the throttle when an ESC gets hot or the current is too high.
- [Motor health](sante-moteurs.md): restart of a stalled motor, fallback DShot telemetry.
- [SPEEDER mode](speeder.md): transition from hover to fast forward flight.
- [Quad X pusher](pusher.md): motors mounted upside down, spin direction read from above.
- [Coaxial X8](x8-coaxial.md): 8-motor coaxial octocopter.
- [GPS navigation, TRUENAV and Mission Planner](navigation-gps.md): missions, GPS rescue, geofence.
- [Camera and gimbal](camera.md): power by switch, gimbals, SIYI A8 mini and Caddx GM3 sheets.

## Tune and analyse

- [Tuning assistant](assistant-reglage.md): starting tune from the quad's specs, configuration check.
- [Log analysis](journaux.md): Python tools for blackbox logs.
- [OSD warnings and debug modes](osd-debug.md): what the OSD and the blackbox show.

## Other

- [License and credits](licence.md)
- [FAQ](faq.md)

## Conventions of this wiki

- Values (ranges, defaults) are those of the firmware code.
- "**To be verified in flight**" marks a feature verified in tests or in the simulator, but not yet in real flight.
