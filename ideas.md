# GameCritic — Design Brainstorm

## Approche 1 — "Terminal Noir"
<response>
<text>
**Design Movement**: Brutalist-Digital / Hacker Aesthetic
**Core Principles**:
- Monospace typography dominante, contrastes extrêmes noir/blanc/vert
- Grilles asymétriques avec des bordures visibles et des éléments "cassés"
- Interface qui ressemble à un terminal de jeu rétro-futuriste
- Scores affichés comme des readouts de système

**Color Philosophy**: Noir profond (#0a0a0a), vert terminal (#00ff41), blanc cassé (#e8e8e8). Couleurs qui évoquent les écrans CRT et les interfaces de hacking.

**Layout Paradigm**: Colonnes asymétriques, texte aligné à gauche, pas de centrage. Cards avec bordures visibles et coins carrés.

**Signature Elements**:
- Curseur clignotant animé dans les titres
- Lignes de scan horizontales subtiles sur les images
- Scores en style "7-segment display"

**Interaction Philosophy**: Hover effects qui simulent un "scan" de l'élément. Transitions instantanées, pas de douceur.

**Animation**: Glitch effects sur les titres, fade-in ligne par ligne pour le contenu.

**Typography System**: JetBrains Mono (titres + scores) + IBM Plex Mono (corps). Tout en monospace.
</text>
<probability>0.07</probability>
</response>

---

## Approche 2 — "Obsidian Edge" ✅ SÉLECTIONNÉE
<response>
<text>
**Design Movement**: Dark Luxury / Premium Gaming Editorial
**Core Principles**:
- Fond obsidian profond avec des accents néon cyan/violet électrique
- Typographie contrastée : serif lourd pour les titres, sans-serif propre pour le corps
- Cartes avec effet glassmorphism subtil et bordures lumineuses
- Scores avec des anneaux de progression animés

**Color Philosophy**: Fond #0d0f14 (obsidian), accent primaire cyan électrique oklch(0.75 0.18 195), accent secondaire violet oklch(0.65 0.22 285). Évoque la qualité premium des jeux AAA et les interfaces sci-fi.

**Layout Paradigm**: Grille éditoriale avec une colonne hero large à gauche et une sidebar de contenu à droite. Cards en disposition masonry pour la homepage.

**Signature Elements**:
- Ligne de séparation lumineuse (gradient cyan→violet) sous le header
- Score badge avec anneau SVG animé et couleur selon la note
- Effet de lueur (glow) sur les images au hover

**Interaction Philosophy**: Transitions fluides 300ms, cards qui "se soulèvent" au hover avec une ombre colorée. Scroll reveal pour le contenu.

**Animation**: Entrance animations avec framer-motion, score rings qui se remplissent à l'entrée dans le viewport.

**Typography System**: Rajdhani (titres gaming bold) + Inter (corps lisible). Hiérarchie claire avec des tailles très contrastées.
</text>
<probability>0.09</probability>
</response>

---

## Approche 3 — "Pixel Chronicle"
<response>
<text>
**Design Movement**: Retro-Modern / Neo-Pixel Art
**Core Principles**:
- Pixel art décoratif combiné avec un layout moderne et propre
- Palette limitée mais vibrante, inspirée des jeux 16-bit
- Cards avec des ombres "pixel" (box-shadow en escalier)
- Scores en style RPG avec des étoiles/cristaux

**Color Philosophy**: Fond sombre #1a1625, accent orange #ff6b35, accent bleu #4ecdc4. Couleurs qui rappellent les jaquettes de jeux rétro.

**Layout Paradigm**: Grille régulière de cards, header avec une barre de navigation style "menu de jeu". Séparateurs en forme de pixels.

**Signature Elements**:
- Bordures en pointillés pixel-style
- Icônes custom en pixel art
- Barre de score en style "health bar" de RPG

**Interaction Philosophy**: Hover effects avec un son visuel (flash de couleur), transitions en "steps" pour évoquer l'animation pixel.

**Animation**: Animations en steps() CSS, pas de courbes de Bézier.

**Typography System**: Press Start 2P (accents décoratifs uniquement) + Nunito (corps lisible). Contraste fort entre les deux.
</text>
<probability>0.06</probability>
</response>

---

## Décision Finale : **Obsidian Edge**

L'approche "Obsidian Edge" est sélectionnée pour sa combinaison de sophistication premium et d'identité gaming forte. Elle offre :
- Un look professionnel qui inspire confiance aux lecteurs
- Des accents néon qui ancrent le site dans l'univers gaming
- Une lisibilité optimale pour les longues critiques
- Des animations qui enrichissent sans distraire
