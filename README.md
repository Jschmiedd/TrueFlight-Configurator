![TrueGlide](src/images/tf_logo_accueil_clair.png#gh-light-mode-only)
![TrueGlide](src/images/tf_logo_accueil_sombre.png#gh-dark-mode-only)

# TrueGlide Configurator

**Réglages Optimisés pour chaque Build.** Configurateur open source et interface graphique multiplateforme pour
paramétrer le firmware **[TrueGlide](https://github.com/Jschmiedd/Firmware-TrueGlide)** du contrôleur de vol,
compatible Betaflight. Réglage fin de chaque drone FPV, du Tiny Whoop au 15 pouces : paramètres calculés, expliqués,
vérifiés. Utilisable hors ligne sur le terrain, mémo et wiki en français.

**Ouvrir le logiciel : https://jschmiedd.github.io/TrueGlide-Configurator/app/** (Chrome ou Edge ; bouton
« Installer » de la barre d'adresse pour l'utiliser ensuite sans Internet).

## Ce qu'il apporte

- **Tableau de bord** à la connexion : batterie, liaison radio, GPS, raisons qui empêchent d'armer.
- **Mise en route guidée** en 9 étapes, de l'installation aux fonctions TrueGlide.
- **Assistant de réglage** : PID, filtres et ralenti calculés selon le drone (hélices, moteurs, batterie, masse, ESC,
  châssis), du Tiny Whoop au 15 pouces ; chaque valeur est expliquée et vérifiée avant d'être écrite.
- **Fonctions TrueGlide** : protection anti-surchauffe, relance moteur, mode SPEEDER, navigation, caméra, télémétrie.
- **Flasheur** : **TRUEGLIDE**, **TRUENAV** ou **TRUENAV_LIGHT**, en ligne (fichier vérifié) ou depuis un fichier `.hex`.
- Tous les onglets de Betaflight App, en français, thème sombre ou clair, sur ordinateur et téléphone.

Avec une carte sous Betaflight, il fonctionne comme un configurateur classique ; les fonctions TrueGlide apparaissent
avec le firmware TrueGlide.

## Vie privée

Aucune statistique d'utilisation n'est envoyée. Seuls GPS, Plan de vol, Preset et Pré-vol contactent un service tiers à
l'ouverture (cartes, altitude, préréglages Betaflight, météo, espace aérien) ; la mise à jour du firmware contacte
GitHub seulement sur demande ; la localisation par adresse IP n'est faite qu'après accord.

## Développement

`npm ci`, puis `npm run build` et `npx vite preview` ; tests : `npx vitest run test/js`. Détails :
[LISEZMOI_TRUEGLIDE.md](LISEZMOI_TRUEGLIDE.md).

## Sécurité

Logiciel fourni **sans aucune garantie**. Vérifiez chaque réglage, essayez d'abord hélices retirées, puis en vol dans
un lieu dégagé. Le pilote reste seul responsable de son drone et du respect de la réglementation de son pays
(en Suisse : OFAC ; en France : DGAC).

## Licence et origine

Logiciel libre sous licence **GPL-3.0** (fichier [LICENSE](LICENSE)), modifié par TalkTrueFPV depuis octobre 2026 à
partir de [Betaflight App](https://github.com/betaflight/betaflight-configurator) 2026.6.2, dont il garde le code, les
auteurs et les mentions de copyright. Licences des composants tiers : `resources/THIRD_PARTY_NOTICES.txt`.
Betaflight et les autres marques citées appartiennent à leurs titulaires ; TrueGlide n'est ni affilié au projet
Betaflight ni approuvé par lui. Le logo TrueGlide / Talk True FPV n'est pas sous GPL : il ne doit pas être réutilisé
pour un autre produit.

Contact : TalkTrueFPV, talktruefpv@gmail.com.
