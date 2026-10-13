# Caméra et nacelle

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Ajouter une caméra (enregistrement, inspection, prise de vue) ou une nacelle sur un drone TrueGlide. Ce guide vaut
pour toutes les caméras ; les fiches en bas de page donnent ce qui change selon le modèle.

**À vérifier sur le drone** : ces fonctions viennent du firmware de base et du Configurator. La logique du réglage est
vérifiée par des tests, mais rien n'a encore été essayé avec une vraie caméra.

## 1. Alimentation : allumer et éteindre la caméra

Pour économiser la batterie, la caméra peut être alimentée par une **sortie commutable PINIO** de la carte :

1. Vérifier sur le **schéma de câblage de la carte** quelle sortie est commutable (souvent un 12 V « VTX / Cam ») et sa
   tension. Elle doit être dans la plage de la caméra et fournir assez de courant.
2. Onglet **Caméra** (groupe Fonctions TrueGlide) : choisir la sortie, puis la commande :
   - **Interrupteur radio (USER1 à USER4)** : ensuite, onglet **Modes**, assigner ce mode USER à un interrupteur ;
   - **Allumée quand le drone est armé** : la caméra s'allume à l'armement et s'éteint au désarmement.
3. **Enregistrer et redémarrer**, puis essayer **hélices retirées**.

Si une sortie sert déjà à autre chose (coupure du VTX en « VTX PIT MODE », Bluetooth…), le Configurator prévient :
la prendre pour la caméra supprime cette fonction.

Carte **sans sortie commutable** : un petit **module interrupteur (MOSFET)** sur la batterie, commandé par un plot libre
de la carte déclaré dans le CLI (`resource PINIO 1 <plot>`), puis la même section.

Ne jamais alimenter une caméra ou une nacelle par le **5 V de la carte** : un pic de courant peut faire redémarrer la
carte en vol.

## 2. Commande des mouvements : quatre familles

| Famille | Commande | Où ça se règle | Exemples |
|---|---|---|---|
| 1. Caméra fixe | aucune (marche / arrêt seulement) | section Caméra / charge utile | caméra d'enregistrement |
| 2. Nacelle à servos | voies AUX vers les sorties servo | onglet **Servos** (fonction SERVO_TILT, mode CAMSTAB) | nacelle 1 ou 2 axes à servos |
| 3. Nacelle S.Bus / PWM | directement par un récepteur | logiciel du fabricant | SIYI A8 mini, Storm32 en mode RC |
| 4. Nacelle à protocole série | le contrôleur de vol parle à la nacelle | firmware (un pilote par protocole) | Caddx GM3 |

- **Famille 2** : chaque servo peut suivre une voie AUX (molette : angle continu ; interrupteur : positions fixes), et le
  mode **CAMSTAB** (onglet Modes) active la stabilisation. Une sortie libre par servo est nécessaire.
- **Famille 3** : avec un récepteur ELRS branché en CRSF sur la carte, le contrôleur de vol ne renvoie pas de S.Bus :
  il faut un **deuxième récepteur** réglé en sortie S.Bus, ou un récepteur à sorties PWM dont une broche sort du S.Bus
  (à vérifier selon le modèle).
- **Famille 4** : le pilote **Caddx GM3** est activé dans les firmwares TrueGlide (sauf cartes F411 et modèle
  TRUENAV_LIGHT, faute de place) : onglet **Ports**, choisir « Nacelle Caddx GM3 » sur le port série relié à la nacelle.

## 3. Vidéo

Une caméra de prise de vue n'est pas forcément compatible avec la liaison vidéo FPV. Avec **Walksnail**, **DJI** ou
**HDZero**, la liaison n'accepte que sa propre caméra : la caméra de prise de vue **enregistre sur sa carte SD**, le
pilotage se fait avec la caméra FPV. Pour voir l'image en direct, il faut une deuxième liaison vidéo (analogique ou
Ethernet selon la caméra).

## 4. Masse et réglage

Une caméra ou une nacelle ajoute de la masse et des vibrations : fixation amortie, centre de gravité vérifié, puis
refaire l'[Assistant de réglage](assistant-reglage.md) avec la nouvelle masse.

## Fiches caméras

### SIYI A8 mini (famille 3)

- Caméra 4K, zoom numérique ×6 (pas de zoom en 4K), nacelle 3 axes.
- Alimentation **11 à 25,2 V** (3S à 6S) d'après le fabricant, environ 5 W en moyenne et 12 W en pointe : une sortie
  **12 V** commutable convient, une sortie 9 V non.
- Commande par **S.Bus** (molettes et interrupteurs réglés dans SIYI PC Assistant : tangage, lacet, centrage, zoom).
  Elle accepte aussi l'UART et l'Ethernet (protocole SIYI), non géré par TrueGlide.
- Vidéo : Ethernet, HDMI ou analogique selon la version, **pas compatible Walksnail** : enregistrement sur carte SD.
- Les débattements annoncés diffèrent selon les versions du manuel : se fier au manuel de la caméra achetée.

### Caddx GM3 (famille 4)

- Nacelle 3 axes pour caméra Walksnail, commandée par un port série (115 200 bauds) et le suivi de tête des lunettes.
- Pilote **activé** dans les firmwares TrueGlide (sauf F411 et TRUENAV_LIGHT). Mise en place : onglet **Ports**,
  « Nacelle Caddx GM3 » sur le port série relié à la nacelle, puis enregistrer. Réglages CLI `gimbal_*` (gains, décalages,
  limites, `gimbal_stabilisation` 0 à 2, `gimbal_sensitivity`).
- Il suit les manches de la radio et le suivi de tête des lunettes ; sans suivi de tête pendant 0,25 s, la nacelle se
  recentre. Pas encore de commande par interrupteur.
- Vérifié sur le simulateur : trames envoyées à la nacelle (en-tête et CRC corrects), port reconnu dans l'onglet Ports.
  **Pas encore essayé avec une vraie GM3.**

## Cartes

- **SpeedyBee F405 Mini** : 4 sorties moteur seulement (pas de X8) ; son PINIO est lié à l'armement
  (d'origine) : pour une caméra, un module interrupteur.
- **T-Hobby Velox F7 SE** (pile V70A 8S) : 8 sorties moteur, sortie **12 V / 3 A** d'après la fiche du fabricant ;
  **PINIO1** sert d'origine à « VTX PIT MODE », **PINIO2** est libre. Vérifier sur le schéma lequel coupe le 12 V.
