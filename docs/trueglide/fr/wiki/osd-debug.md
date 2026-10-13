# Alertes OSD et modes debug

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

## Alertes OSD TrueGlide

Deux alertes s'ajoutent aux alertes habituelles. Onglet **OSD** : liste des alertes, et élément « Avertissements »
affiché à l'écran.

| Alerte (onglet OSD) | Affiché | Quand |
|---|---|---|
| Gaz limités (TrueGlide) | `ESC HOT 65%` ou `AMP LIM 80%` | la [protection anti-surchauffe](anti-surchauffe.md) limite les gaz ; le % est la limite réelle des gaz |
| Moteur relancé (TrueGlide) | `M2 RESTART` (clignote) | pendant 3 s après la relance d'un moteur calé ou désynchronisé ([santé moteurs](sante-moteurs.md)) ; `M1` à `M8` |

- `ESC HOT` : un ESC a atteint `power_guard_esc_temp`. `AMP LIM` : le courant dépasse `power_guard_current`.
- Les alertes n'apparaissent que drone armé, et seulement si la protection correspondante est activée.
- Sur une carte qui garde une ancienne configuration, **cocher les deux alertes** dans l'onglet OSD (elles sont cochées
  d'office après une remise à zéro).

## Modes debug TrueGlide

Le mode debug choisit ce que la boîte noire enregistre dans les canaux `debug[0…7]`. Onglet **Blackbox**, ou CLI
`set debug_mode = POWER_GUARD` puis `save`. Le **Visualiseur Blackbox** nomme les canaux.

### POWER_GUARD

| Canal | Contenu |
|---|---|
| `debug[0]` | limite des gaz appliquée (‰ : 1000 = pas de limite) |
| `debug[1]` | limite due à la température (‰) |
| `debug[2]` | limite due au courant (‰) |
| `debug[3]` | température de l'ESC le plus chaud (°C, 0 = inconnue) |
| `debug[4]` | courant batterie (A × 10) |

### MOTOR_HEALTH

| Canal | Contenu |
|---|---|
| `debug[0]` à `debug[7]` | nombre de relances du moteur 1 à 8 depuis la mise sous tension |

Un quadri n'utilise que les canaux 0 à 3 ; un [X8](x8-coaxial.md) les 8.

### ANGLE_MODE (mode SPEEDER)

`debug[4]` : inclinaison ajoutée par le [mode SPEEDER](speeder.md) (degrés × 10).

## Lire la vitesse des moteurs

La vitesse de chaque moteur (`eRPM`) est enregistrée avec le DShot bidirectionnel, quel que soit le mode debug. Elle
sert à l'[analyse des journaux](journaux.md).
