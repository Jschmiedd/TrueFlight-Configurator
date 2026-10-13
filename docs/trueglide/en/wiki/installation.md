# Installation and flashing

[Wiki contents](index.md) · [Memo](../memo.md)

## 1. Get the .hex file

One file per board and per model (see [Firmware models and boards](modeles-firmware.md)):

| Model | File name |
|---|---|
| TRUEGLIDE | `trueglide_2026.6.2_<MCU>_<BOARD>.hex` |
| TRUENAV | `truenav_…hex` |
| TRUENAV_LIGHT | `truenav_light_…hex` |

- **GitHub**: firmware repository, **Actions** tab > **TrueGlide**. The **trueglide-hex** archive holds the common
  boards. For another board: **Run workflow** with its name (for example `SPEEDYBEEF405V4`) and the model.
- **Linux PC**: `make arm_sdk_install`, `make configs`, then `make CONFIG=BOARD_NAME` (add `MODELE=TRUENAV` or
  `MODELE=TRUENAV_LIGHT` for the navigation models). The file is created in `obj/`.

## 2. Back up the old configuration

Before any flash: **CLI** tab, type `diff all`, then **save the text** to a file.

## 3. Flash

1. Unplug the battery. Plug the board in over USB **without** clicking Connect.
2. **Firmware Flasher** tab: **Load TrueGlide firmware (.hex)**, select the `.hex` for your board (its name shows the model and the board).
3. Tick **Full chip erase** (first install), then **Flash Firmware**.
4. Wait for the end, then **Connect**.

The app runs in Chrome or Edge (USB connection through Web Serial). On Windows, an older board may need a USB driver
(CP210x, STM32 VCP): links on the welcome page.

## 4. Redo the basic configuration

Follow the menu in order (see [App menu](menu.md)): Ports, Configuration, Receiver, Modes, Motors, Power & Battery,
Failsafe.

Coming from version 4.4, 4.5 or 2025.12: **do not paste the old `diff all` as is**. Some settings were removed or
renamed, and the meaning of D was swapped in 2025.12. The [Tuning assistant](assistant-reglage.md), "Analyse my
configuration" page, shows what changed.

## 5. Safe first flight

1. **Props off**, with a *smoke stopper* if possible: **Motors** tab, check motor order and spin direction.
2. **Protections** tab (TrueGlide features group): set the [overheat protection](anti-surchauffe.md), for example `power_guard_esc_temp = 100`
   (ESCs with temperature telemetry), `power_guard_current` at 80 % of the total ESC rating (current sensor needed).
   Turn on [motor health](sante-moteurs.md) if the ESCs report their speed.
3. **OSD** tab: tick the "Throttle limited" and "Motor restarted" warnings.
4. **Blackbox** tab: debug mode `POWER_GUARD` or `MOTOR_HEALTH` for the first flights.
5. Props on: 30 s hover, land, **touch the motors**. Warm: you can go on. Hot: lower the PID master slider or add
   filtering before going further.

No software can guarantee a quad flies right the first time: a badly mounted motor or a reversed prop are still
possible. These steps are there to catch them without damage.
