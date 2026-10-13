# Santé moteurs

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Deux fonctions qui utilisent la vitesse des moteurs envoyée par les ESC. Les deux sont **désactivées par défaut**.

## Réglages

Onglet **Protections** (groupe Fonctions TrueGlide), section « Santé moteurs », ou CLI :

| Réglage | Rôle | Défaut | Plage |
|---|---|---|---|
| `motor_desync_recovery` | relance d'un moteur désynchronisé ou calé | OFF | OFF / ON |
| `motor_desync_threshold` | % de la vitesse attendue en dessous duquel le moteur est jugé décroché | 40 | 10 à 80 |
| `dshot_telemetry_fallback` | vitesse d'un moteur dont la télémétrie est perdue : suit les autres au lieu de rester figée | OFF | OFF / ON |

## Relance d'un moteur calé (`motor_desync_recovery`)

Détection : un moteur commandé à au moins 30 % tourne plus lentement que `motor_desync_threshold` % de la vitesse
attendue (calculée à partir des autres moteurs, au prorata des commandes) **et** que la moitié du plus lent des autres.

- Délai avant d'agir : 10 ms en DShot bidirectionnel, 0,3 s avec la télémétrie série.
- Action : le moteur est coupé au ralenti 50 ms, puis remis progressivement en 100 ms. L'ESC relance sa commutation.
- Un moteur vraiment bloqué est relancé environ 6 fois par seconde au lieu de chauffer à pleine puissance.
- La comparaison n'est faite que si la vitesse attendue dépasse 1 500 tr/min (assez bas pour des hélices de 10 à 15").
- Jusqu'à **8 moteurs** suivis (quadri, hexa, [X8](x8-coaxial.md)).

Mise au point sur de vrais journaux : la logique du firmware, rejouée sur 26 vols, intervient sur chaque calage et
jamais sur les vols sains. Elle **ne répare pas** une voie d'ESC défaillante : elle limite les dégâts. Les grandes
hélices (10 à 15") ne sont vérifiées qu'en tests unitaires : **à vérifier en vol**.

## Télémétrie de secours (`dshot_telemetry_fallback`)

Après 4 trames de télémétrie invalides de suite, la vitesse d'un moteur est estimée à partir des autres. Elle ne sert
**qu'au filtre RPM et au ralenti dynamique**. L'OSD et la boîte noire continuent d'afficher la valeur reçue de l'ESC,
figée si la télémétrie est perdue.

## Ce qu'il faut côté ESC

| Firmware des ESC | Relance | Remarque |
|---|---|---|
| Bluejay, AM32, BLHeli_32 | oui (10 ms) | DShot300 ou 600 avec DShot bidirectionnel |
| KISS | avec le fil série (0,3 s) | |
| BLHeli_S d'origine, BLHeli ancien, SimonK, PWM | non | flasher Bluejay sur un BLHeli_S |

Avec la télémétrie série, la vitesse est convertie en tr/min comme en DShot : `motor_poles` doit être juste.

## Voir ce qui se passe

- **OSD** : alerte « Moteur relancé », `M2 RESTART` qui clignote pendant 3 s (M1 à M8).
- **Boîte noire** : mode debug `MOTOR_HEALTH`, nombre de relances par moteur.
- **Après le vol** : [Analyse des journaux](journaux.md) (`analyse_blackbox.py`, `rejouer_desync.py`).

## Conseil DShot

Avec le DShot bidirectionnel, DShot300 suffit pour une boucle PID à 4 kHz et rend la télémétrie moins sensible aux
parasites. DShot600 sert pour une boucle à 8 kHz (F7, H7, AT32F435). Sur F405, F411, G474 et APM32F4, le firmware
remplace lui-même DShot600 par DShot300 quand le DShot bidirectionnel est actif : ce n'est pas une panne.
