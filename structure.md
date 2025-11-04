# Game Architecture Documentation

## Inheritance Hierarchy

```
MovableObject (Base Class)
├── BackgroundObject
├── Cloud
├── Collectable
│   └── CoinCollectable
├── Throwables
│   └── BottleThrowable
└── PcNpc
    ├── Character
    ├── Chicken
    └── Endboss

StatusBars (UI Base)
├── HpStatusbar
├── CoinStatusbar
└── BottleStatusbar

Utility Classes:
├── Inputs
├── IntervalManager
├── Level
└── World
```

## Class Descriptions

### Core Game Objects
- **MovableObject**: Base class for all game objects with position, velocity, and rendering
- **Collectable**: Base for collectable items with world reference and collection logic
- **PcNpc**: Base for playable and non-playable characters with health and combat systems
- **StatusBars**: Base class for UI elements with screen-space positioning

### Game Entities
- **Character**: Player character with movement, inventory, and throwing mechanics
- **Chicken**: Basic enemy type
- **Endboss**: Final boss enemy with unique behaviors
- **Cloud**: Decorative background elements with parallax movement
- **BackgroundObject**: Layered background system for parallax effects
- **BottleThrowable**: Throwable weapon with arc physics and collision detection
- **CoinCollectable**: Collectible item that increases player's coin count

### UI System
- **HpStatusbar**: Displays player health with visual feedback
- **CoinStatusbar**: Shows collected coin count
- **BottleStatusbar**: Displays available throwable bottles

### Game Systems
- **Inputs**: Centralized input handling for keyboard controls
- **IntervalManager**: Manages animation and game loops with cleanup
- **Level**: Configures and instantiates level layouts
- **World**: Main game controller and renderer

## Camera System

The game features a camera that follows the player character:
- Camera is controlled by `World.cameraX`
- World objects are drawn with `ctx.translate(cameraX, 0)`
- Status bars are drawn in screen space after restoring the canvas context
- Camera follows the character with an offset for better visibility

## UI Positioning

Status bars use a screen-space coordinate system:
- Positioned using `offsetX` and `offsetY` properties
- Drawn after world rendering to stay fixed on screen
- Stacked vertically with consistent spacing
- Not affected by camera movement

## Key Relationships

- **World** manages the game loop and rendering pipeline
- **Character** updates camera position based on its movement
- **StatusBars** are positioned relative to screen coordinates
- **All game objects** are positioned in world coordinates
- **UI elements** are positioned in screen coordinates
- **Collectable** hierarchy provides base functionality for all collectible items
- **Throwables** extends **Collectable** for throwable items with physics
- **CoinCollectable** extends **Collectable** for coin pickups