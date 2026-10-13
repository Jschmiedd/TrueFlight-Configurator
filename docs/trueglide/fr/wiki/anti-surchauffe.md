# Protection anti-surchauffe / surintensité

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

La protection limite les **gaz** quand un ESC devient trop chaud ou quand le courant de la batterie dépasse une limite.
Elle évite de brûler moteurs et ESC dans un vol long ou trop chargé. Elle est **désactivée par défaut**.

## Réglages

Onglet **Protections** (groupe Fonctions TrueGlide), section « Protection anti-surchauffe / surintensité », ou CLI :

| Réglage | Rôle | Défaut | Plage |
|---|---|---|---|
| `power_guard_esc_temp` | °C de l'ESC le plus chaud au-delà desquels les gaz sont limités (0 = arrêt) | 0 | 0 à 150 |
| `power_guard_current` | ampères batterie au-delà desquels les gaz sont limités (0 = arrêt) | 0 | 0 à 1000 |
| `power_guard_min_throttle` | les gaz disponibles ne descendent jamais sous ce pourcentage | 50 | 20 à 100 |

Exemple de départ : `power_guard_esc_temp = 100` et `power_guard_current` = 80 % du calibre continu total des ESC
(un ESC par moteur : par exemple 4 ESC de 45 A : 4 × 45 × 0,8 = 144 A ; un X8 avec 8 ESC de 45 A : 288 A). L'[Assistant de réglage](assistant-reglage.md) propose ces valeurs.

## Fonctionnement

- Seuls les **gaz (collectif)** sont limités, jamais les corrections PID : le drone reste stable et pilotable.
- La limite part des gaz du moment (pas de 100 %), puis descend progressivement. Elle ne descend jamais sous
  `power_guard_min_throttle`.
- Température : plus l'ESC dépasse la limite, plus la limite des gaz descend vite (2 % par seconde à la limite, 2 % de
  plus par degré au-dessus). Les gaz reviennent quand l'ESC est redescendu à 3 °C sous la limite.
- Courant : la descente est proportionnelle au dépassement. Les gaz reviennent sous 90 % de la limite.
- Retour : la limite remonte de 25 % par seconde.
- Calcul 100 fois par seconde, seulement drone armé.

## Ce qu'il faut côté ESC et carte

| Limite | Il faut |
|---|---|
| Température | télémétrie DShot étendue (`dshot_edt`, Bluejay, AM32) ou fil de télémétrie série (BLHeli_32, KISS, AM32) |
| Courant | capteur de courant sur la carte, ou courant de la télémétrie série (`current_meter = ESC`) |

Sans télémétrie de température (valeur 0), la limite de température ne fait rien et rend les gaz.

## Voir ce qui se passe

- **OSD** : alerte « Gaz limités » : `ESC HOT 65%` (température) ou `AMP LIM 80%` (courant). Le pourcentage est la limite
  réelle des gaz. Voir [Alertes OSD et modes debug](osd-debug.md).
- **Boîte noire** : mode debug `POWER_GUARD`.

## Alerte sur la radio (optionnel)

Dans les lunettes, l'OSD affiche déjà la température des ESC (alarme `osd_esc_temp_alarm`) et l'alerte TrueGlide. Pour
une **alerte vocale sur la radio** en plus, activer `crsf_tlm_esc_temp` (onglet **Télémétrie radio**, groupe Fonctions
TrueGlide) :

- la carte envoie la température de chaque ESC toutes les 2 s, par la télémétrie ELRS / Crossfire ;
- sur la radio (EdgeTX 2.10 ou plus récent) : Télémesure → Découvrir les capteurs, puis une alerte (par exemple
  au-dessus de 85 °C) ;
- désactivé par défaut ; activé, les autres capteurs (batterie, GPS) se rafraîchissent un peu moins vite, la commande
  du drone n'est pas touchée ;
- rien n'est envoyé si un ESC ne donne pas sa température (jamais de 0 °C ni de valeur attribuée au mauvais moteur) ;
- la liaison de retour peut perdre des paquets à longue distance : l'alerte radio complète l'OSD et la protection, elle
  ne les remplace pas.

Vérifié en test unitaire (contenu exact de la trame) ; **à essayer avec ta radio**.

## Limites

- La protection agit sur l'ESC **le plus chaud** de tous les moteurs (y compris un [X8](x8-coaxial.md)).
- Elle ne remplace pas un ESC bien dimensionné : si l'alerte revient à chaque vol, le drone est trop chargé.
