# Analyse des journaux

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Deux outils Python du dépôt du firmware (`trueglide/outils/`) lisent les journaux blackbox (`.bbl`) et disent ce qui
s'est passé, vol par vol. Ils lisent tous les moteurs du journal : quadri, hexa, octo (jusqu'à 8).

## Installation

```
pip install orangebox numpy
```

`gcc` est aussi nécessaire : les outils compilent la logique « santé moteurs » du firmware telle quelle.

## analyse_blackbox.py : rapport complet

```
python3 trueglide/outils/analyse_blackbox.py mon_vol.bbl -o rapport.md
```

Plusieurs fichiers peuvent être donnés à la suite. Le rapport (Markdown, en français) donne pour chaque vol :

- la configuration (firmware, carte, protocole DShot, boucle PID) ;
- la **télémétrie DShot figée** par moteur (l'ESC n'envoie plus de trame valide) ;
- les **désynchronisations et calages**, avec la logique du firmware ;
- la saturation des moteurs, le bruit gyro, les oscillations lentes ;
- le **nombre de pôles (aimants) mesuré** dans les vibrations du gyro, comparé à `motor_poles` (mesure de 8 à 48 pôles ;
  au-delà de 28 environ, il écrit « environ N (±2) ») ;
- un conseil sur le protocole DShot et une synthèse par moteur.

Le rapport ne conclut sur les pôles que si la mesure est nette (gyro brut et vitesse des moteurs enregistrés, quelques
secondes à gaz stables).

## rejouer_desync.py : où la relance interviendrait

```
python3 trueglide/outils/rejouer_desync.py journal.bbl [autre.bbl …] [--seuil 40]
```

Rejoue chaque vol armé dans la logique de relance du firmware et affiche chaque relance déclenchée (instant, moteur,
commandes, tr/min). `--seuil` correspond à `motor_desync_threshold`.

Limites : il utilise la boîte noire (1 à 2 kHz, pas la boucle PID complète), juge la télémétrie « fraîche » quand la
valeur change, et ne simule pas l'effet de la relance sur la suite du vol. Il montre où la logique intervient, pas ce
que le drone aurait fait ensuite.

## Bien enregistrer

- Onglet **Blackbox** : enregistrer le gyro et la vitesse des moteurs (DShot bidirectionnel).
- Mode debug `POWER_GUARD` ou `MOTOR_HEALTH` selon ce qu'on veut suivre ([détails](osd-debug.md)).
- Journaux d'anciennes versions (4.4, 4.5) : la vitesse des moteurs n'y est enregistrée qu'avec
  `set debug_mode = DSHOT_RPM_TELEMETRY`.

## Dans le logiciel

L'onglet **Visualiseur Blackbox** affiche les courbes ; les modes debug `POWER_GUARD` et `MOTOR_HEALTH` y sont nommés.
