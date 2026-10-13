# Installation et flash

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

## 1. Obtenir le fichier .hex

Un fichier par carte et par modèle (voir [Modèles de firmware et cartes](modeles-firmware.md)) :

| Modèle | Nom du fichier |
|---|---|
| TRUEGLIDE | `trueglide_2026.6.2_<MCU>_<CARTE>.hex` |
| TRUENAV | `truenav_…hex` |
| TRUENAV_LIGHT | `truenav_light_…hex` |

- **GitHub** : dépôt du firmware, onglet **Actions** > **TrueGlide**. L'archive **trueglide-hex** contient les cartes
  courantes. Pour une autre carte : **Run workflow** en indiquant son nom (par exemple `SPEEDYBEEF405V4`) et le modèle.
- **PC Linux** : `make arm_sdk_install`, `make configs`, puis `make CONFIG=NOM_DE_LA_CARTE` (ajouter `MODELE=TRUENAV`
  ou `MODELE=TRUENAV_LIGHT` pour les modèles de navigation). Le fichier est créé dans `obj/`.

## 2. Sauvegarder l'ancienne configuration

Avant tout flash : onglet **Ligne de commande (CLI)**, taper `diff all`, puis **enregistrer le texte** dans un fichier.

## 3. Flasher

1. Débrancher la batterie. Brancher la carte en USB **sans** cliquer sur Connexion.
2. Onglet **Flasher le Firmware** : **Charger un firmware TrueGlide (.hex)**, choisir le `.hex` de sa carte (le nom indique le modèle et la carte).
3. Cocher **Effacement complet de la puce** (première installation), puis **Flasher le Firmware**.
4. Attendre la fin, puis **Connexion**.

Le logiciel tourne dans Chrome ou Edge (connexion USB par Web Serial). Sous Windows, une ancienne carte peut
demander un pilote USB (CP210x, STM32 VCP) : liens sur la page d'accueil.

## 4. Refaire la configuration de base

Suivre le menu dans l'ordre (voir [Menu du logiciel](menu.md)) : Ports, Configuration, Récepteur, Modes, Moteurs,
Alimentation et batterie, Failsafe.

Venant d'une version 4.4, 4.5 ou 2025.12 : **ne pas recoller l'ancien `diff all` tel quel**. Des réglages ont disparu
ou changé de nom, et le sens du D a été inversé en 2025.12. L'[Assistant de réglage](assistant-reglage.md), page
« Analyser ma configuration », signale ce qui a changé.

## 5. Premier vol en sécurité

1. **Sans hélices**, avec un *smoke stopper* si possible : onglet **Moteurs**, vérifier l'ordre et le sens de rotation.
2. Onglet **Protections** (groupe Fonctions TrueGlide) : régler la [protection anti-surchauffe](anti-surchauffe.md), par exemple
   `power_guard_esc_temp = 100` (ESC avec télémétrie de température), `power_guard_current` à 80 % du calibre total
   des ESC (capteur de courant nécessaire). Activer la [santé moteurs](sante-moteurs.md) si les ESC envoient leur vitesse.
3. Onglet **OSD** : cocher les alertes « Gaz limités » et « Moteur relancé ».
4. Onglet **Blackbox** : mode debug `POWER_GUARD` ou `MOTOR_HEALTH` pour les premiers vols.
5. Hélices montées : stationnaire de 30 s, atterrir, **toucher les moteurs**. Tièdes : on peut continuer. Chauds :
   baisser le curseur maître des PID ou renforcer le filtrage avant d'aller plus loin.

Aucun logiciel ne garantit qu'un drone vole du premier coup : un moteur mal monté ou une hélice à l'envers restent
possibles. Ces étapes servent à les voir sans casse.
