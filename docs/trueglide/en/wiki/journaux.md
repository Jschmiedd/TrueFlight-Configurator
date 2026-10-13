# Log analysis

[Wiki contents](index.md) · [Memo](../memo.md)

Two Python tools in the firmware repository (`trueglide/outils/`) read blackbox logs (`.bbl`) and tell what happened,
flight by flight. They read every motor in the log: quad, hexa, octo (up to 8).

## Installation

```
pip install orangebox numpy
```

`gcc` is also needed: the tools compile the firmware's motor health logic as is.

## analyse_blackbox.py: full report

```
python3 trueglide/outils/analyse_blackbox.py my_flight.bbl -o report.md
```

Several files can be given in a row. The report (Markdown, in French) gives for each flight:

- the configuration (firmware, board, DShot protocol, PID loop);
- **frozen DShot telemetry** per motor (the ESC no longer sends a valid frame);
- **desyncs and stalls**, using the firmware logic;
- motor saturation, gyro noise, slow oscillations;
- the **number of motor poles (magnets) measured** in the gyro vibrations, compared with `motor_poles` (measured from
  8 to 48 poles; above about 28, it writes "about N (±2)");
- advice on the DShot protocol and a per-motor summary.

The report only concludes on poles when the measurement is clear (raw gyro and motor speed logged, a few seconds at
steady throttle).

## rejouer_desync.py: where the restart would act

```
python3 trueglide/outils/rejouer_desync.py log.bbl [other.bbl …] [--seuil 40]
```

Replays every armed flight through the firmware restart logic and prints each restart triggered (time, motor,
commands, rpm). `--seuil` matches `motor_desync_threshold`.

Limits: it uses the blackbox (1 to 2 kHz, not the full PID loop), judges telemetry "fresh" when the value changes, and
does not simulate the effect of the restart on the rest of the flight. It shows where the logic acts, not what the
quad would have done next.

## Logging well

- **Blackbox** tab: log the gyro and the motor speed (bidirectional DShot).
- Debug mode `POWER_GUARD` or `MOTOR_HEALTH` depending on what you want to follow ([details](osd-debug.md)).
- Logs from older versions (4.4, 4.5): motor speed is only logged with `set debug_mode = DSHOT_RPM_TELEMETRY`.

## In the app

The **Blackbox Viewer** tab shows the graphs; the `POWER_GUARD` and `MOTOR_HEALTH` debug modes are named there.
