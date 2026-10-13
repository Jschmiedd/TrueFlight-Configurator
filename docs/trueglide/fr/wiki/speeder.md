# Mode SPEEDER

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Pour les speeders qui décollent fuselage vertical (90°) et volent vite fuselage presque horizontal. Le mode incline
progressivement le drone vers l'avant, en mode **ANGLE**, et le pilote garde la main autour de cet angle.

**À vérifier en vol** : la logique est vérifiée (tests unitaires, simulateur), pas encore le comportement en vol réel.

## Réglages

Onglet **Speeder** (groupe Fonctions TrueGlide), ou CLI :

| Réglage | Rôle | Défaut | Plage |
|---|---|---|---|
| `speeder_cruise_angle` | inclinaison vers l'avant en fin de transition (°) | 60 | 10 à 80 |
| `speeder_transition_rate` | vitesse de la transition (°/s) | 30 | 5 à 180 |
| `speeder_fpv_mix` | roulis / lacet tournés avec la transition (comme `fpv_mix_degrees`, mais progressif) | OFF | OFF / ON |

## Mise en place

1. Onglet **Modes** : placer **SPEEDER** sur un interrupteur.
2. Voler en mode **ANGLE** (sans ANGLE, le mode ne fait rien).
3. Interrupteur actif : le nez descend progressivement jusqu'à l'angle de croisière.
4. Interrupteur coupé, ou failsafe : retour progressif au stationnaire.
5. GPS RESCUE, ALTHOLD et POSHOLD annulent la transition (ils commandent eux-mêmes l'inclinaison).

## Premiers essais

Commencer avec `speeder_cruise_angle = 20`, en altitude, puis monter par pas de 10°. Avec 30 °/s, passer de 0 à 60°
prend 2 s.

## Boîte noire

Le décalage d'inclinaison appliqué est enregistré dans le mode debug `ANGLE_MODE`, canal 4 (degrés × 10).
