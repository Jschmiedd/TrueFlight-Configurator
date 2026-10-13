# TrueGlide Configurator

Configurateur du firmware **TrueGlide** (Talk True FPV), dérivé du **Betaflight App / Configurator 2026.6.2**
(GPL v3, fichier `LICENSE`), modifié par TalkTrueFPV depuis octobre 2026 et fourni **sans aucune garantie**. Il
garde tous les onglets de Betaflight et y ajoute les réglages TrueGlide. Contact : talktruefpv@gmail.com.

- Marque TrueGlide : logo, nom, couleurs vert fluo (mode sombre) et vert foncé (mode clair).
- Compatible avec les firmwares TrueGlide STANDARD et TRUENAV (MSP API 1.48), et avec Betaflight 2025.12 / 2026.6.

Lancer en local : `npm ci`, puis `npm run build` et `npx vite preview` (Chrome ou Edge, connexion USB par Web Serial).

Le logo Talk True FPV / TrueGlide (`src/images/tf_logo_*.png`, `src/images/pwa/*`) est la marque de Johann
(TalkTrueFPV) : il n'est pas sous GPL et ne doit pas être réutilisé pour un autre produit sans son accord.
Betaflight et les autres marques citées appartiennent à leurs titulaires ; TrueGlide n'est ni affilié au projet
Betaflight ni approuvé par lui. Les licences des composants tiers sont dans `resources/THIRD_PARTY_NOTICES.txt`
(à régénérer après tout changement de dépendance : `node scripts/third-party-notices.mjs`).

## Utiliser le logiciel sur le terrain, sans Internet

TrueGlide Configurator est une application web installable, comme celle de Betaflight : on l'ouvre une fois avec
Internet dans **Chrome ou Edge**, on clique sur **« Installer »** (icône dans la barre d'adresse), puis elle s'ouvre
comme un logiciel et fonctionne **sans Internet**, connexion USB à la carte comprise. Tout est gardé sur l'ordinateur :
onglets, Mémo & Wiki, flasheur (fichiers .hex locaux), icônes et polices. Ont besoin d'Internet : Preset, les fonds de
carte (GPS, Plan de vol) et la météo / l'espace aérien de Pré-vol.

Vérifié : application servie dans un sous-dossier (comme GitHub Pages), réseau coupé puis rechargée : accueil, wiki,
flasheur et icônes s'affichent (398 fichiers gardés hors ligne).

### Mise en ligne (GitHub Pages, gratuit avec un dépôt public)

1. Construire : `npm run build` (résultat dans `src/dist`).
2. Copier le contenu de `src/dist` à la racine d'un dépôt GitHub **public**, ajouter un fichier vide `.nojekyll`,
   pousser sur la branche `main`.
3. Dans ce dépôt : Settings → Pages → Source « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. L'adresse sera `https://<compte>.github.io/<dépôt>/`. Les chemins sont relatifs : un sous-dossier ne pose pas de
   problème.

Mise à jour du firmware en ligne : le flasheur et le tableau de bord lisent `firmware/index.json` à l'adresse
`TRUEGLIDE_FIRMWARE_URL` (`src/js/trueglide/firmware_source.js`, GitHub Pages), seulement sur clic du pilote.
Fichiers préparés par `trueglide/outils/publier_firmware.py` dans le dépôt du firmware. Pour un essai avec un autre
serveur : `localStorage.tf_update_url = "http://…/firmware/"` (le serveur doit envoyer `Access-Control-Allow-Origin`).

Licence : le logiciel est sous GPL-3.0 ; une version publique doit aussi donner accès à son code source (par exemple
en rendant public ce dépôt ou en publiant le code source à côté).
