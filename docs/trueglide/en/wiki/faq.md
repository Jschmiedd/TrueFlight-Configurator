# FAQ

[Wiki contents](index.md) · [Memo](../memo.md)

**Does my quad fly differently after flashing TrueGlide?**
No, as long as no TrueGlide setting is turned on: everything is off or neutral by default.

**Can I paste my old `diff all`?**
Not as is if it comes from version 4.4, 4.5 or 2025.12: some settings were renamed and the meaning of D was swapped
in 2025.12. Use the [Tuning assistant](assistant-reglage.md), "Analyse my configuration" page, or TrueGlide Studio to
convert it.

**Which firmware model should I pick?**
TRUEGLIDE without GPS; TRUENAV for GPS missions; TRUENAV_LIGHT if space is short. See
[Firmware models and boards](modeles-firmware.md).

**`ESC HOT` shows up for no reason at take-off.**
Check the reported temperature (debug mode `POWER_GUARD`, `debug[3]`). A limit set too low (for example 60 °C) cuts
in too early: 100 °C is a common starting point. See [Overheat protection](anti-surchauffe.md).

**`M1 RESTART` shows up every flight.**
A motor really stalls: check the motor, the prop, the solder joints, the ESC channel, and analyse the log
([Log analysis](journaux.md)). If restarts happen at low rpm with very large props, raising `motor_desync_threshold`
slightly should only be done after analysis. See [Motor health](sante-moteurs.md).

**Motor health does nothing.**
It needs the motor speed: bidirectional DShot (Bluejay, AM32, BLHeli_32) or serial telemetry. And
`motor_desync_recovery = ON`.

**Why DShot300 when I chose DShot600?**
On F405, F411, G474 and APM32F4 with bidirectional DShot, the firmware itself switches to DShot300 (4 kHz PID loop).
This is not a fault.

**SPEEDER mode does nothing.**
You must fly in ANGLE mode, armed, with the SPEEDER switch on. GPS RESCUE, ALTHOLD and POSHOLD cancel it. See
[SPEEDER mode](speeder.md).

**My Quad X pusher (motors upside down) spins on itself at take-off.**
The spin direction was judged from below: it is read **from above**, like the Motors tab diagram.
See [Quad X pusher](pusher.md).

**Can I use Mission Planner?**
Yes with the TRUENAV models, over MAVLink telemetry. See [GPS navigation](navigation-gps.md).

**Where can I find this documentation offline?**
**Memo & Wiki** tab of the app, or the **Memo** and **Wiki** links on the welcome page.
