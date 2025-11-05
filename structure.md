# El Pollo Loco - Game Architecture

## Project Structure

```
/
├── audio/                 # Game sound effects
├── img/                   # Game assets (sprites, backgrounds, etc.)
│   ├── 1_editables/       # Source design files
│   ├── 2_character_pepe/  # Player character sprites
│   ├── 3_enemies_chicken/ # Enemy sprites
│   └── 4_enemie_boss_chicken/ # Boss enemy sprites
├── js/                    # Main game scripts
├── levels/                # Level definitions
├── models/                # Game object classes
│   ├── collectables/      # Collectable items
│   ├── statusbars/        # UI status bars
│   └── throwables/        # Projectile objects
├── index.html            # Main HTML file
├── style.css             # Game styles
└── structure.md          # This documentation file
```

## Inheritance Hierarchy

### Core Game Objects
```
MovableObject (Base Class)
├── BackgroundObject      # Background elements
├── Cloud                 # Cloud objects for parallax
├── Collectable           # Base for collectable items
│   ├── CoinCollectable   # Collectible coins
│   └── BottleCollectable # Collectible bottles
├── Throwable             # Base for throwable objects
│   └── BottleThrowable   # Throwable bottles
└── PcNpc                 # Base for characters
    ├── Character         # Playable character
    ├── Chicken           # Regular enemy
    └── Endboss           # Boss enemy
```

### UI Components
```
StatusBars (Base Class)
├── HpStatusbar      # Health display
├── CoinStatusbar    # Coin counter
└── BottleStatusbar  # Bottle counter
```

### Game Systems
```
- AudioManager      # Handles sound effects and music
- Inputs            # Manages keyboard input
- IntervalManager   # Controls game loops and timers
- Level             # Level configuration and state
- World             # Main game world and loop
```

## Key Components

### Core Systems
- **World**: Main game controller, manages game loop and object updates
- **Level**: Defines level layout, enemies, and collectables
- **Inputs**: Handles keyboard input and maps it to game actions
- **AudioManager**: Manages sound effects and background music

### Game Objects
- **Character**: Player-controlled character with movement and combat abilities
- **Enemies**: Various enemy types with different behaviors
- **Collectables**: Items that can be collected by the player
- **Throwables**: Projectiles that can be used in combat

### UI Elements
- **StatusBars**: Display player health and resource information
- **Counters**: Show current coin and bottle counts

## Game Flow
1. Game initializes and loads assets
2. World is created with the current level
3. Game loop starts, processing input and updating game state
4. Player interacts with the world, collecting items and fighting enemies
5. Game state is rendered to the canvas
6. Player either completes the level or loses all health

## Dependencies
- HTML5 Canvas for rendering
- Web Audio API for sound
- Modern JavaScript (ES6+)

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