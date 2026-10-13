# Quad X pusher (moteurs à l'envers)

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Un quad X « pusher » a ses **4 moteurs montés à l'envers, sous les bras**, avec des **hélices pusher**. Il n'y a pas de
moteur en plus : pour le firmware, c'est un **Quad X normal** (`mixer QUADX`), avec les mêmes réglages.

## Le piège : le sens de rotation

- Le schéma de l'onglet **Moteurs** et le réglage **« Sens de rotation inversé »** (`yaw_motors_reversed`) se lisent
  **vu de dessus** du drone.
- Moteurs à l'envers, en regardant un moteur **par en dessous**, on voit tourner dans le **sens inverse**. Toujours
  juger le sens en se plaçant au-dessus du drone.
- L'hélice doit travailler **comme sur un quad classique** : **face marquée (inscriptions) vers le haut**, donc contre la
  cloche du moteur inversé, et de la **même main** (CW / CCW) qu'à cette position sur le schéma. Les « hélices pusher »
  du commerce ont la même forme avec le moyeu de l'autre côté pour se monter ainsi ; sinon, une hélice standard
  retournée convient si son moyeu le permet.
- Deux erreurs à éviter : une hélice de **l'autre main** souffle vers le haut ; une hélice de la bonne main montée
  **face marquée vers le bas** souffle bien vers le bas mais travaille à l'envers (moins de poussée, plus de bruit, moteurs
  qui chauffent).

## Mise en place

1. Onglet **Configuration** : mixeur **Quad X**.
2. **Sans hélices**, onglet **Moteurs** : faire tourner chaque moteur, vérifier l'ordre (1 à 4) et le sens **vu de
   dessus**. Corriger un sens avec l'assistant de sens de rotation DShot, ou le réglage « Sens de rotation inversé » si
   les 4 moteurs tournent à l'opposé du schéma.
3. Monter les hélices (face marquée vers le haut, main du schéma), puis un premier stationnaire court à hauteur
   d'homme : un lacet qui dérive signale un sens mal lu.

L'[Assistant de réglage](assistant-reglage.md) a le choix de châssis « Quad X pusher (moteurs à l'envers) » : mêmes
calculs qu'un quad X, avec ces conseils. Aucune perte ou gain de poussée n'est compté pour ce montage : rien de mesuré
ne permet de le chiffrer.
