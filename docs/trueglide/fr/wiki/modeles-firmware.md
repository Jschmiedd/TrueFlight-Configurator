# Modèles de firmware et cartes

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

## Trois modèles

| Modèle | Pour qui | Contenu | Fichier |
|---|---|---|---|
| **TRUEGLIDE** | course, freestyle, cinéma | pilotage habituel + ajouts TrueGlide | `trueglide_2026.6.2_<MCU>_<CARTE>.hex` |
| **TRUENAV** | drones qui volent aussi en GPS | TRUEGLIDE + navigation complète : missions (AUTOPILOT), ALTHOLD, POSHOLD, GPS RESCUE, zone de vol, missions par MAVLink | `truenav_…hex` |
| **TRUENAV_LIGHT** | navigation, longue portée, cartes à 512 Ko | TRUENAV sans les fonctions de course (launch control, transpondeur de course, écran de pré-armement « spec », statistiques des manches) | `truenav_light_…hex` |

Les trois modèles ont les ajouts TrueGlide : [protection anti-surchauffe](anti-surchauffe.md),
[santé moteurs](sante-moteurs.md), [mode SPEEDER](speeder.md). Voir aussi [navigation GPS](navigation-gps.md).

## Mémoire utilisée (Ko, mesurée)

| Carte | TRUEGLIDE | TRUENAV | TRUENAV_LIGHT |
|---|---|---|---|
| MATEKF411 (512 Ko) | 381 | 467 | 464 |
| SPEEDYBEEF7V3 (F722, 512 Ko) | 397 | 492 | 490 |
| SPEEDYBEEF405MINI (1 Mo) | 546 | 572 | 566 |
| MATEKH743 (2 Mo) | — | 612 | 606 |

TRUENAV tient déjà partout ; TRUENAV_LIGHT ne gagne que 3 à 7 Ko. Sur une F722 à 512 Ko, il reste environ 20 Ko.

## Cartes

629 cartes (STM32 F405, F411, F722, F745, G474, H7, AT32F435, APM32, RP2350…). Les modèles se construisent sur F411,
F722, F405, H743 et AT32F435. Construction : `make CONFIG=<CARTE> MODELE=TRUENAV` (ou `TRUENAV_LIGHT`, ou rien pour
TRUEGLIDE).

Pour un [X8](x8-coaxial.md), il faut 8 sorties moteur.

## ESC

| Firmware des ESC | Protocole conseillé | Filtre RPM | Limite de température | Moteur calé |
|---|---|---|---|---|
| Bluejay (BLHeli_S flashé) | DShot300 ou 600 | oui | oui (télémétrie étendue, `dshot_edt`) | oui (10 ms) |
| AM32 | DShot300 ou 600 | oui | oui (étendue, ou fil série) | oui (10 ms) |
| BLHeli_32 | DShot300 ou 600 | oui | avec le fil de télémétrie série | oui (10 ms) |
| KISS | DShot | non | avec le fil série | avec le fil série (0,3 s) |
| BLHeli_S d'origine | DShot | non (flasher Bluejay) | non | non |
| BLHeli ancien, SimonK | OneShot125 | non | non | non |
| ESC PWM analogique | PWM | non | non | non |

La limite de courant marche avec n'importe quel ESC si la carte a un capteur de courant.

## Radio et vidéo

Récepteurs série (ExpressLRS / CRSF, Ghost, SBUS, FPort, SRXL2, IBUS…), récepteurs intégrés (ExpressLRS SPI), OSD
analogique et numérique (DJI O3 / O4, Walksnail, HDZero par MSP DisplayPort) : tout fonctionne comme avant.

## Logiciel

TrueGlide Configurator est compatible avec les modèles TRUEGLIDE et TRUENAV (API MSP 1.48).
