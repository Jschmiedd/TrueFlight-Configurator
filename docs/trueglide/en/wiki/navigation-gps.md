# GPS navigation, TRUENAV and Mission Planner

[Wiki contents](index.md) · [Memo](../memo.md)

The **TRUENAV** and **TRUENAV_LIGHT** firmware models add full GPS navigation on real boards, including 512 KB ones
(see [Firmware models and boards](modeles-firmware.md)).

**Not yet verified in real flight.** Verified in the simulator: 19 scenarios out of 19 passed (missions, take-off,
landing, orbit, figure eight, radio loss, geofence, GPS RESCUE). First tries: open field, low speed, ready to take
over.

## What TRUENAV contains

- **Missions** (AUTOPILOT mode): waypoints, hold, orbit, landing, take-off, altitude change.
- **ALTHOLD** (altitude hold) and **POSHOLD** (position hold).
- **GPS RESCUE** (return to home).
- **Geofence**: maximum distance from home.
- **Missions uploaded over MAVLink** (Mission Planner, QGroundControl).

Nothing changes in flight until a navigation mode is put on a switch (**Modes** tab).

## Preparing a mission

- **In the app**: **Flight Plan** tab ("GPS navigation" group). Draw the points on the map, set altitudes and actions,
  **Save to FC**. With no quad connected, the tab is also there in expert mode.
- **With Mission Planner**: link a serial port set to **MAVLink** telemetry (**Ports** tab) to Mission Planner
  (telemetry radio). Write the mission as for any other autopilot.

### Mission Planner convention (`mav_mission_home_item`)

| Setting | Role | Default | Range |
|---|---|---|---|
| `mav_mission_home_item` | item 0 sent by Mission Planner is home, never flown | ON in TRUENAV, OFF elsewhere | OFF / ON |

With ON: the altitude of item 0 is the reference for relative altitudes as long as the GPS home does not exist
(mission prepared before arming); reading the mission back returns home as item 0; item numbering follows Mission
Planner. Without home or GPS, a relative altitude is refused.

## Safety settings

**Navigation safety** tab (TrueGlide features group):

| Setting | Role | Default | Range |
|---|---|---|---|
| `ap_max_velocity` | maximum speed in navigation | 5 m/s (500 cm/s) | 1 to 50 m/s |
| `ap_max_angle` | maximum tilt in navigation (°) | 50 | 10 to 70 |
| `ap_waypoint_arrival_radius` | waypoint arrival radius | 5 m (500 cm) | 1 to 50 m |
| `ap_max_distance_from_home` | geofence: maximum distance from home (m, 0 = off) | 0 | 0 to 10000 |
| `ap_geofence_action` | leaving the fence: land or return | LAND | LAND / RTH |
| `ap_rx_loss_policy` | radio loss during a mission: stop the mission (usual failsafe), continue or land | DISABLE | DISABLE / CONTINUE / LAND |
| `gps_rescue_return_alt` | return altitude (m) | 30 | 5 to 1000 |
| `gps_rescue_ground_speed` | return speed | 7.5 m/s (750 cm/s) | 0 to 30 m/s |
| `gps_rescue_min_sats` | minimum satellites | 8 | 5 to 50 |
| `failsafe_procedure` | failsafe action | DROP | AUTO-LAND / DROP / GPS-RESCUE |

The firmware counts in cm and cm/s; the Navigation safety tab shows m and m/s.

## Not there yet

Flying wings and planes in missions, terrain following, programmable logic.
