# FAQ

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

**Mon drone vole-t-il différemment après le flash de TrueGlide ?**
Non, tant qu'aucun réglage TrueGlide n'est activé : tout est désactivé ou neutre par défaut.

**Puis-je recoller mon ancien `diff all` ?**
Pas tel quel s'il vient d'une version 4.4, 4.5 ou 2025.12 : des réglages ont changé de nom et le sens du D a été
inversé en 2025.12. Utiliser l'[Assistant de réglage](assistant-reglage.md), page « Analyser ma configuration », ou
TrueGlide Studio pour le convertir.

**Quel modèle de firmware choisir ?**
TRUEGLIDE sans GPS ; TRUENAV pour les missions GPS ; TRUENAV_LIGHT si la place manque. Voir
[Modèles de firmware et cartes](modeles-firmware.md).

**`ESC HOT` s'affiche sans raison au décollage.**
Vérifier la température affichée (mode debug `POWER_GUARD`, `debug[3]`). Une limite trop basse (par exemple 60 °C)
coupe trop tôt : 100 °C est un départ courant. Voir [Protection anti-surchauffe](anti-surchauffe.md).

**`M1 RESTART` apparaît à chaque vol.**
Un moteur décroche vraiment : contrôler le moteur, l'hélice, les soudures, la voie d'ESC, et analyser le journal
([Analyse des journaux](journaux.md)). Si les relances arrivent à bas régime avec de très grandes hélices, monter
légèrement `motor_desync_threshold` n'est à faire qu'après analyse. Voir [Santé moteurs](sante-moteurs.md).

**La santé moteurs ne fait rien.**
Il faut la vitesse des moteurs : DShot bidirectionnel (Bluejay, AM32, BLHeli_32) ou télémétrie série. Et
`motor_desync_recovery = ON`.

**Pourquoi DShot300 alors que j'ai choisi DShot600 ?**
Sur F405, F411, G474 et APM32F4 avec le DShot bidirectionnel, le firmware passe lui-même en DShot300 (boucle PID
à 4 kHz). Ce n'est pas une panne.

**Le mode SPEEDER ne fait rien.**
Il faut voler en mode ANGLE, armé, avec l'interrupteur SPEEDER actif. GPS RESCUE, ALTHOLD et POSHOLD l'annulent. Voir
[Mode SPEEDER](speeder.md).

**Mon quad X pusher (moteurs à l'envers) tourne sur lui-même au décollage.**
Le sens de rotation a été jugé par en dessous : il se lit **vu de dessus**, comme le schéma de l'onglet Moteurs.
Voir [Quad X pusher](pusher.md).

**Puis-je utiliser Mission Planner ?**
Oui avec les modèles TRUENAV, par la télémétrie MAVLink. Voir [Navigation GPS](navigation-gps.md).

**Où trouver cette documentation hors ligne ?**
Onglet **Mémo & Wiki** du logiciel, ou liens **Mémo** et **Wiki** de la page d'accueil.
