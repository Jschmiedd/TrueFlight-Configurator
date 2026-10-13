# Menu du logiciel

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Le menu de gauche de TrueGlide Configurator suit l'ordre dans lequel on prépare un drone. Certains onglets
n'apparaissent qu'en **mode expert** (case en haut de l'application), ou si la carte a la fonction (GPS, OSD, LED…).

## Sans drone branché

| Onglet | Rôle |
|---|---|
| **Bienvenue** | page d'accueil : démarrage, nouveautés TrueGlide, liens **Mémo** et **Wiki** |
| **Flasher le Firmware** | installer un `.hex` TrueGlide (voir [Installation et flash](installation.md)) |
| **Mémo & Wiki** | cette documentation, lisible hors ligne |
| **Pré-vol** | météo et conditions du lieu de vol |
| **Plan de vol** | (mode expert) préparer une mission GPS sans être connecté |

## Drone branché

### Tableau de bord

Page ouverte à la connexion (sauf si l'option « se souvenir du dernier onglet » est cochée) :

- **Drone** : tension de la batterie (et par élément si la carte a détecté le nombre d'éléments), liaison radio (RSSI),
  GPS, et **ce qui empêche d'armer**, raison par raison ;
- **Fonctions TrueGlide** : ce qui est activé sur la carte (protection anti-surchauffe, relance moteur, speeder,
  sorties PINIO). Une fonction que le firmware n'a pas n'apparaît pas ;
- **Mise en route** : avancement des 9 étapes d'installation et bouton **Continuer** ;
- **Raccourcis** : Assistant de réglage, **Sauvegarder la configuration** (enregistre un `diff all` dans un fichier
  texte, à garder avant toute modification), Visualiseur Blackbox, Mémo.

### Mise en route guidée

Sur les onglets de l'*Installation du drone* et l'onglet *TrueGlide*, une barre en haut indique l'étape (1 à 9), ce
qu'il faut vérifier, et propose **Précédente** / **Étape réglée, continuer**. « Étape réglée » ne fait que cocher
l'étape : **les réglages s'enregistrent toujours avec le bouton de l'onglet**. Les étapes cochées sont gardées dans le
navigateur, pour chaque carte, et apparaissent dans le menu (coche et compteur « 2/9 »). **Masquer le guide** retire la
barre ; on la retrouve depuis le tableau de bord (« Afficher le guide »).

### Installation du drone

| Onglet | Rôle |
|---|---|
| **Installation** | état de la carte, calibrage de l'accéléromètre, orientation. Les cadrans d'assiette et de cap (pictogramme quad X) ne s'affichent qu'avec un firmware de navigation (`truenav_…`) |
| **Ports** | rôle de chaque port série (récepteur, GPS, télémétrie MAVLink, VTX…) |
| **Configuration** | mixeur (QuadX, X8…), protocole moteur, DShot bidirectionnel, fonctions |
| **Récepteur** | protocole radio, voies, calibrage |
| **Modes** | interrupteurs : ARM, ANGLE, SPEEDER, ALTHOLD, POSHOLD, GPS RESCUE, AUTOPILOT… |
| **Alimentation et batterie** | tension, capteur de courant (nécessaire à la limite de courant) |
| **Moteurs** | test des moteurs **sans hélices**, ordre et sens de rotation |
| **Servos** | sorties servo (tricoptère, aile volante, nacelle de caméra qui s'incline) : sens, débattement, neutre. Présent sur les firmwares TrueGlide, mais inutile sur un quadri, un hexa ou un X8 classique |
| **Failsafe** | comportement en perte radio (étape de la mise en route, donc visible sans le mode expert) |

### Fonctions TrueGlide

Un onglet par fonction (chacun n'affiche que ce que le firmware de la carte possède) :

| Onglet | Rôle |
|---|---|
| **Protections** | protection anti-surchauffe / surintensité ([détails](anti-surchauffe.md)) et santé moteurs ([détails](sante-moteurs.md)) |
| **Speeder** | mode SPEEDER ([détails](speeder.md)) |
| **Sécurité navigation** | sécurité de la navigation GPS et missions TRUENAV ([détails](navigation-gps.md)) ; si la carte a le GPS |
| **Caméra** | alimentation d'une caméra par une sortie PINIO ([détails](camera.md)) |
| **Télémétrie radio** | température des ESC envoyée à la radio ELRS / Crossfire ([détails](anti-surchauffe.md)) |

Boutons en bas : **Relire** (relit la carte) et **Enregistrer et redémarrer** (n'envoie que ce qui a changé ; une valeur
hors limites est refusée, jamais corrigée en silence).

### Réglage du vol

| Onglet | Rôle |
|---|---|
| **Preset** | préréglages publiés |
| **Réglages de PID** | PID, filtres, curseurs du réglage simplifié |
| **Assistant de réglage** | réglage de départ TrueGlide selon le drone (voir [Assistant de réglage](assistant-reglage.md)) |
| **Réglage automatique** | (mode expert) Autotune : mesure de la réponse du drone (excitation « chirp ») |
| **Ajustements** | (mode expert) réglages modifiables en vol par une voie AUX |

### Navigation GPS

| Onglet | Rôle |
|---|---|
| **GPS** | position, satellites, réglages du GPS (si la carte a le GPS) |
| **Plan de vol** | dessiner une mission sur la carte et l'envoyer au drone (modèles TRUENAV) |

### Vidéo et lumières

| Onglet | Rôle |
|---|---|
| **OSD** | éléments affichés et alertes, dont les [alertes TrueGlide](osd-debug.md) |
| **Émetteur vidéo** | canal, puissance |
| **Bandeau LED** | si la fonction LED_STRIP est active |

### Analyse

| Onglet | Rôle |
|---|---|
| **Capteurs** | courbes gyro, accéléromètre, baromètre |
| **Blackbox** | réglage de l'enregistrement et choix du **mode debug** (`POWER_GUARD`, `MOTOR_HEALTH`) |
| **Visualiseur Blackbox** | lecture des journaux de vol |
| **Journal de bord** | (mode expert) enregistrement par le câble USB |

Pour une analyse automatique des journaux : [Analyse des journaux](journaux.md).

### Outils

**Ligne de commande (CLI)** : `get`, `set`, `save`, `diff all`. Tous les réglages TrueGlide y sont aussi accessibles.
