# Design: 3D AI Art Gallery

## 1. Visual Identity
- **Background**: Deep space charcoal (`#000000`) with white/teal stellar dust.
- **Accent Color**: Teal/Cyan (`#31b8c6`) for interactive elements and highlight glows.
- **Card Material**: Dark translucent glass (`#1F2121`) with subtle border glows.

## 2. Typography
- **Headings**: Outfit (Bold, tracking-tight).
- **Sub-info**: Outfit (Light/Medium, opacity-70).

## 3. Interaction Mechanics
- **Hover**: 1.15x scale, cyan box-shadow intensity increase, cursor change.
- **3D Rotation**: OrbitControls with smooth damping and specific min/max zoom distances.
- **Modal Transition**: Backdrop blur with a perspective-transformed 3D card tilt effect following the mouse.

## 4. Components
- `StellarCardGallerySingle`: Main orchestrator.
- `StarfieldBackground`: Procedural Three.js points.
- `CardGalaxy`: Golden ratio sphere distribution algorithm.
- `FloatingCard`: Individual card with Html overlay from `@react-three/drei`.
