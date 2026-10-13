# Navigation GPS, TRUENAV et Mission Planner

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Les modèles de firmware **TRUENAV** et **TRUENAV_LIGHT** ajoutent la navigation GPS complète sur les vraies cartes, y
compris celles à 512 Ko (voir [Modèles de firmware et cartes](modeles-firmware.md)).

**Pas encore vérifié en vol réel.** Vérifié en simulateur : 19 scénarios sur 19 réussis (missions, décollage,
atterrissage, orbite, huit, perte radio, zone de vol, GPS RESCUE). Premiers essais : terrain dégagé, basse vitesse,
prêt à reprendre la main.

## Ce que contient TRUENAV

- **Missions** (mode AUTOPILOT) : points de passage, attente, orbite, atterrissage, décollage, changement d'altitude.
- **ALTHOLD** (maintien d'altitude) et **POSHOLD** (maintien de position).
- **GPS RESCUE** (retour à la maison).
- **Zone de vol** (geofence) : distance maximale de la maison.
- **Missions envoyées par MAVLink** (Mission Planner, QGroundControl).

Rien ne change en vol tant qu'aucun mode de navigation n'est placé sur un interrupteur (onglet **Modes**).

## Préparer une mission

- **Dans le logiciel** : onglet **Plan de vol** (groupe « Navigation GPS »). Dessiner les points sur la carte, régler
  altitudes et actions, **Enregistrer dans le FC**. Sans drone branché, l'onglet existe aussi en mode expert.
- **Avec Mission Planner** : relier un port série réglé en télémétrie **MAVLink** (onglet **Ports**) à Mission Planner
  (radio de télémétrie). Écrire la mission comme pour un autre autopilote.

### Convention Mission Planner (`mav_mission_home_item`)

| Réglage | Rôle | Défaut | Plage |
|---|---|---|---|
| `mav_mission_home_item` | le point 0 envoyé par Mission Planner est la maison, jamais volé | ON dans TRUENAV, OFF ailleurs | OFF / ON |

Avec ON : l'altitude du point 0 sert de référence aux altitudes relatives tant que la maison GPS n'existe pas (mission
préparée avant l'armement) ; la relecture renvoie la maison en point 0 ; la numérotation des points suit celle de
Mission Planner. Sans maison ni GPS, une altitude relative est refusée.

## Réglages de sécurité

Onglet **Sécurité navigation** (groupe Fonctions TrueGlide) :

| Réglage | Rôle | Défaut | Plage |
|---|---|---|---|
| `ap_max_velocity` | vitesse maximale en navigation | 5 m/s (500 cm/s) | 1 à 50 m/s |
| `ap_max_angle` | inclinaison maximale en navigation (°) | 50 | 10 à 70 |
| `ap_waypoint_arrival_radius` | rayon d'arrivée sur un point | 5 m (500 cm) | 1 à 50 m |
| `ap_max_distance_from_home` | zone de vol : distance maximale de la maison (m, 0 = arrêt) | 0 | 0 à 10000 |
| `ap_geofence_action` | sortie de zone : atterrir ou rentrer | LAND | LAND / RTH |
| `ap_rx_loss_policy` | perte radio en mission : arrêter la mission (failsafe habituel), continuer ou atterrir | DISABLE | DISABLE / CONTINUE / LAND |
| `gps_rescue_return_alt` | altitude de retour (m) | 30 | 5 à 1000 |
| `gps_rescue_ground_speed` | vitesse de retour | 7,5 m/s (750 cm/s) | 0 à 30 m/s |
| `gps_rescue_min_sats` | satellites minimum | 8 | 5 à 50 |
| `failsafe_procedure` | action du failsafe | DROP | AUTO-LAND / DROP / GPS-RESCUE |

Le firmware compte en cm et cm/s ; l'onglet Sécurité navigation affiche en m et m/s.

## Ce qui n'existe pas encore

Ailes volantes et avions en mission, suivi de terrain, logique programmable.
