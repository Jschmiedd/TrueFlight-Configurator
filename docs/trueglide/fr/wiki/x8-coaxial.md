# X8 coaxial

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Un X8 est un octocoptère **coaxial** : 4 bras, 2 moteurs par bras (un dessus, un dessous, hélices en sens contraires).
Le firmware le gère avec le mixeur **OCTOX8** (8 moteurs).

## Mise en place

1. Une carte avec **8 sorties moteur** (ou plus).
2. Onglet **Configuration** : mixeur **Octo X8** (CLI : `mixer OCTOX8`). Enregistrer.
3. **Sans hélices**, onglet **Moteurs** : vérifier les 8 moteurs un par un, leur position et leur sens de rotation
   (schéma affiché par l'onglet Configuration).

## Ce que TrueGlide fait sur un X8

| Fonction | Sur un X8 |
|---|---|
| [Santé moteurs](sante-moteurs.md) | suit les 8 moteurs (relance d'un moteur calé, télémétrie de secours) |
| Mode debug `MOTOR_HEALTH` | une valeur par moteur, moteurs 1 à 8 |
| Alerte OSD « Moteur relancé » | `M1 RESTART` à `M8 RESTART` |
| [Protection anti-surchauffe](anti-surchauffe.md) | prend l'ESC le plus chaud des 8 |
| [Analyse des journaux](journaux.md) | les outils lisent jusqu'à 8 moteurs |
| [Assistant de réglage](assistant-reglage.md) | choix du châssis « X8 coaxial » (poussée estimée avec 20 % de perte par moteur) |

## Conseils

- Les moteurs du dessous travaillent dans le souffle de ceux du dessus : ils tournent plus vite pour la même poussée.
  La santé moteurs compare la vitesse de chaque moteur à celle **attendue** d'après les commandes, pas à une valeur
  fixe.
- Limite de courant : 80 % du calibre total des **8** ESC si le capteur de courant mesure tout le drone.
- Premier vol : **à vérifier en vol**. Les outils et la logique sont vérifiés jusqu'à 8 moteurs en tests, pas encore
  sur un vol réel d'X8.
