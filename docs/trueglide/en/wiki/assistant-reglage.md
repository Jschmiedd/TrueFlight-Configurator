# Tuning assistant

[Wiki contents](index.md) · [Memo](../memo.md)

**Tuning assistant** tab ("Flight tuning" group, quad connected). It computes a **starting tune** from the quad's specs
and writes it to the board. It is TrueGlide Studio, connected to the plugged-in board.

## The "My drone" box

Fields shared by both pages:

- prop size (inches), motor KV, battery (S cells), flying weight (g), motor poles (= magnets, "12N14P" = 14),
  continuous ESC rating (optional);
- flying style (freestyle, cinematic, long range, racing, speeder);
- frame: normal, soft or vibrating, very stiff;
- ESC PWM frequency and ESC firmware (Bluejay, AM32, BLHeli_32, KISS, stock BLHeli_S, old BLHeli, PWM);
- current sensor on the board, ESC serial telemetry wire.

The connected board is recognised (processor, gyro, number of motor outputs). The assistant shows the active PID
profile and rate profile: that is where the tune will be written.

**Frame choice**: Quad X, Hexa, Coaxial X8 ([details](x8-coaxial.md)), Quad X pusher (motors upside down,
[details](pusher.md)).

## "My drone" page

The assistant suggests:

- the **motor protocol** and **PID loop** that suit the board and ESCs;
- the **PIDs** (roll, pitch, yaw) through the simplified tuning sliders: you can then adjust them with the mouse in
  the PID Tuning tab;
- filters, dynamic idle, RPM filter;
- the TrueGlide protections possible with this hardware (for example `power_guard_current` = 80 % of the total ESC
  rating, `power_guard_esc_temp = 100`, `power_guard_min_throttle = 50`).

**Apply to the drone and reboot** button. A setting that does not exist on the board (for example no bidirectional
DShot) is reported: you can apply the others.

Where the numbers come from: averages of presets published by recognised tuners (Tiny Whoop 1.2", then 3.5" to 10"; whoop: UAV Tech Whoop and AOS 65mm). Above 10" (up to 15"),
a more cautious extension, marked "extrapolated".

## "Analyse my configuration" page

Reads the board's configuration and compares it with the TrueGlide tune: **Setting / Current / Proposed** table,
**Apply the differences and reboot** button. Also reports problems (bidirectional DShot, failsafe, TrueGlide
protection off…).

## Next

A starting tune is not a finished tune. Fly carefully, touch the motors, then refine (master slider in steps of 5).
The **Autotune** tab (expert mode) measures the quad's response to refine the PIDs. The [logs](journaux.md) tell
whether motors overheat, stall, or whether `motor_poles` is wrong.
