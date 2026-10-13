# Wiki TrueGlide

TrueGlide, c'est un firmware de contrôleur de vol et un logiciel de configuration, TrueGlide Configurator. Le
firmware ajoute des protections et des fonctions au pilotage habituel. Tout est désactivé par défaut, et sans réglage
TrueGlide le drone vole comme avec le firmware d'origine.

Pour l'essentiel sur une page : [Mémo](../memo.md).

## Démarrer

- [Installation et flash](installation.md) : obtenir le fichier `.hex`, flasher, premier vol en sécurité.
- [Modèles de firmware et cartes](modeles-firmware.md) : TRUEGLIDE, TRUENAV, TRUENAV_LIGHT, mémoire, ESC compatibles.
- [Menu du logiciel](menu.md) : chaque groupe et chaque onglet de TrueGlide Configurator.

## Fonctions TrueGlide

- [Protection anti-surchauffe](anti-surchauffe.md) : limite les gaz si un ESC chauffe ou si le courant est trop fort.
- [Santé moteurs](sante-moteurs.md) : relance d'un moteur calé, télémétrie DShot de secours.
- [Mode SPEEDER](speeder.md) : transition du stationnaire au vol rapide.
- [Quad X pusher](pusher.md) : moteurs montés à l'envers, sens de rotation à lire vu de dessus.
- [X8 coaxial](x8-coaxial.md) : octocoptère coaxial à 8 moteurs.
- [Navigation GPS, TRUENAV et Mission Planner](navigation-gps.md) : missions, retour GPS, zone de vol.
- [Caméra et nacelle](camera.md) : alimentation par interrupteur, nacelles, fiches SIYI A8 mini et Caddx GM3.

## Régler et analyser

- [Assistant de réglage](assistant-reglage.md) : réglage de départ selon le drone, analyse de la configuration.
- [Analyse des journaux](journaux.md) : outils Python pour les journaux blackbox.
- [Alertes OSD et modes debug](osd-debug.md) : ce que l'OSD et la boîte noire montrent.

## Divers

- [Licence et crédits](licence.md)
- [FAQ](faq.md)

## Convention de ce wiki

- Les valeurs (bornes, défauts) sont celles du code du firmware.
- « **À vérifier en vol** » signale une fonction vérifiée en tests ou en simulateur, mais pas encore en vol réel.
