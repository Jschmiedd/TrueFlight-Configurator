# Quad X pusher (motors upside down)

[Wiki contents](index.md) · [Memo](../memo.md)

A "pusher" X quad has its **4 motors mounted upside down, under the arms**, with **pusher props**. There is no extra
motor: for the firmware it is a **normal Quad X** (`mixer QUADX`), with the same settings.

## The catch: spin direction

- The **Motors** tab diagram and the **"Reversed motor direction"** setting (`yaw_motors_reversed`) are read **from
  above** the quad.
- With the motors upside down, looking at a motor **from below** you see it turn the **opposite way**. Always judge the
  direction standing above the quad.
- The prop must work **like on a regular quad**: **marked (printed) face up**, so towards the bell of the upside-down
  motor, and the **same hand** (CW / CCW) as at that position on the diagram. Commercial "pusher props" have the same
  shape with the hub on the other side to mount this way; otherwise a standard prop flipped over works if its hub allows.
- Two mistakes to avoid: a prop of the **other hand** blows upwards; a prop of the right hand fitted **marked face
  down** still blows downwards but works backwards (less thrust, more noise, hot motors).

## Setup

1. **Configuration** tab: **Quad X** mixer.
2. **Props off**, **Motors** tab: spin each motor, check the order (1 to 4) and the direction **seen from above**. Fix a
   direction with the DShot spin direction wizard, or the "Reversed motor direction" setting if all 4 motors turn
   opposite to the diagram.
3. Fit the props (marked face up, hand from the diagram), then a short first hover at head height: a drifting yaw
   means a direction was misread.

The [Tuning assistant](assistant-reglage.md) has the "Quad X pusher (motors upside down)" frame choice: same
calculations as a quad X, with this advice. No thrust loss or gain is counted for this layout: nothing measured allows
a figure.
