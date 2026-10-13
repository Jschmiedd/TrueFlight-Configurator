# Assistant de réglage

[Sommaire du wiki](index.md) · [Mémo](../memo.md)

Onglet **Assistant de réglage** (groupe « Réglage du vol », drone branché). Il calcule un **réglage de départ** à
partir du drone et l'écrit sur la carte. Il reprend TrueGlide Studio, branché sur la carte connectée.

## Mon drone

Champs communs aux deux pages (cadre « Mon drone ») :

- taille d'hélice (pouces), KV des moteurs, batterie (cellules S), masse en vol (g), pôles des moteurs (= aimants,
  « 12N14P » = 14), calibre ESC en continu (facultatif) ;
- style de vol (freestyle, cinématique, longue portée, course, speeder) ;
- châssis : normal, souple ou vibrant, très rigide ;
- fréquence PWM et firmware des ESC (Bluejay, AM32, BLHeli_32, KISS, BLHeli_S d'origine, BLHeli ancien, PWM) ;
- capteur de courant sur la carte, fil de télémétrie série des ESC.

La carte branchée est reconnue (processeur, gyroscope, nombre de sorties moteur). L'assistant indique le profil PID et
le profil de rates actifs : c'est là que le réglage sera écrit.

**Choix du châssis** : Quad X, Hexa, X8 coaxial ([détails](x8-coaxial.md)), Quad X pusher (moteurs à l'envers,
[détails](pusher.md)).

## Page « Réglage du drone »

L'assistant propose :

- le **protocole moteur** et la **boucle PID** adaptés à la carte et aux ESC ;
- les **PID** (roulis, tangage, lacet) par les curseurs du réglage simplifié : on peut ensuite les ajuster à la souris
  dans l'onglet Réglages de PID ;
- filtres, ralenti dynamique, filtre RPM ;
- les protections TrueGlide possibles avec ce matériel (par exemple `power_guard_current` = 80 % du calibre total
  des ESC, `power_guard_esc_temp = 100`, `power_guard_min_throttle = 50`).

Bouton **Appliquer au drone et redémarrer**. Un réglage qui n'existe
pas sur la carte (par exemple pas de DShot bidirectionnel) est signalé : on peut appliquer les autres.

D'où viennent les chiffres : moyennes de préréglages publiés par des régleurs reconnus (Tiny Whoop 1,2", puis 3,5" à 10" ; whoop : UAV Tech Whoop et AOS 65mm). Au-delà de 10"
(jusqu'à 15"), c'est un prolongement plus prudent, signalé « extrapolé ».

## Page « Analyser ma configuration »

Relit la configuration de la carte et la compare au réglage TrueGlide : tableau **Réglage / Actuel / Proposé**,
bouton **Appliquer les écarts et redémarrer**. Signale aussi les problèmes (DShot bidirectionnel, failsafe, protection
TrueGlide inactive…).

## Et ensuite

Un réglage de départ n'est pas un réglage fini. Voler prudemment, toucher les moteurs, puis affiner (curseur maître
par pas de 5). L'onglet **Réglage automatique** (mode expert) mesure la réponse du drone pour affiner les PID. Les
[journaux](journaux.md) disent si les moteurs chauffent, décrochent ou si `motor_poles` est faux.
