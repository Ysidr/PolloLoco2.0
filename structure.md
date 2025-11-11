# El Pollo Loco - Game Architecture

## Project Structure

```
/
├── audio/                     # Game sound effects and music
├── img/                       # Game assets (sprites, backgrounds, etc.)
│   ├── 1_editables/           # Source design files
│   ├── 2_character_pepe/      # Player character sprites
│   │   ├── 1_idle/            # Idle animations
│   │   ├── 2_walk/            # Walking animations
│   │   ├── 3_jump/            # Jumping animations
│   │   ├── 4_hurt/            # Hurt animations
│   │   └── 5_dead/            # Death animations
│   ├── 3_enemies_chicken/     # Regular and mini chicken enemies
│   │   ├── chicken_normal/    # Standard chicken enemy
│   │   └── chicken_small/     # Mini chicken enemy
│   ├── 4_enemie_boss_chicken/ # Boss enemy sprites
│   │   ├── 1_walk/            # Walking animations
│   │   ├── 2_alert/           # Alert state animations
│   │   ├── 3_attack/          # Attack animations
│   │   ├── 4_hurt/            # Hurt animations
│   │   └── 5_dead/            # Death animations
│   ├── 5_background/          # Background layers and elements
│   │   └── layers/            # Parallax background layers
│   ├── 6_salsa_bottle/        # Bottle collectables and projectiles
│   └── 7_statusbars/          # UI status bars and counters
├── js/                        # Main game scripts
│   ├── game.js                # Main game initialization
│   ├── gameOrientationDisplays.js # Screen orientation handling
│   └── exit.js                # Game exit/restart functionality
├── models/                    # Game object classes
│   ├── collectables/          # Collectable items
│   │   ├── bottle-collectable.class.js
│   │   ├── coin-collectable.class.js
│   │   └── collectable.class.js
│   ├── statusbars/            # UI status bars
│   │   ├── bosshp-statusbar.class.js
│   │   ├── bottle-statusbar.class.js
│   │   ├── coin-statusbar.class.js
│   │   ├── hp-statusbar.class.js
│   │   └── statusbars.class.js
│   ├── throwables/            # Projectile objects
│   │   ├── bottle-throwable.class.js
│   │   └── throwables.class.js
│   ├── audio-manager.class.js # Audio management
│   ├── backgroundObject.class.js
│   ├── character.class.js     # Player character
│   ├── chicken.class.js       # Regular chicken enemy
│   ├── cloud.class.js         # Background clouds
│   ├── endboss.class.js       # Boss enemy
│   ├── inputs.class.js        # Input handling
│   ├── intervalmanager.class.js # Game timing
│   ├── level.class.js         # Level management
│   ├── mini-chicken.class.js  # Mini chicken enemy
│   ├── movable-object.class.js # Base class for all moving objects
│   ├── pcnpc.class.js         # Base class for characters and NPCs
│   └── world.class.js         # Main game world
├── index.html                 # Main HTML file
├── style.css                  # Game styles
└── structure.md               # This documentation file
```

## Inheritance Hierarchy

### Core Game Objects
```
MovableObject (Base Class)
├── BackgroundObject      # Background elements with parallax
├── Cloud                 # Cloud objects for parallax
├── Collectable           # Base for collectable items
│   ├── CoinCollectable   # Collectible coins (increases score)
│   └── BottleCollectable # Collectible bottles (ammo for throwing)
├── Throwable             # Base for throwable objects
│   └── BottleThrowable   # Throwable bottle projectiles
└── PcNpc                 # Base for characters and NPCs
    ├── Character         # Playable character
    ├── Chicken           # Regular chicken enemy
    ├── MiniChicken       # Small, faster chicken enemy
    └── Endboss           # Boss enemy with multiple states
```

### UI Components
```
StatusBars (Base Class)
├── HpStatusbar      # Player health display
├── BossHpStatusbar  # Boss health display
├── CoinStatusbar    # Coin counter
└── BottleStatusbar  # Bottle ammo counter
```

### Game Systems
```
- AudioManager      # Handles sound effects and music playback
- Inputs            # Manages keyboard input and controls
- IntervalManager   # Controls game loops, animations, and timers
- Level             # Level configuration, objects, and state
- World             # Main game world, physics, and game loop
- Game              # Main game controller and initialization
```

## Key Components

### Core Systems
- **World**: Manages the game loop, physics, collision detection, and object updates
- **Level**: Defines level layout, spawn points, and object placement
- **Inputs**: Handles keyboard input and maps it to character actions
- **AudioManager**: Controls all sound effects and background music with volume settings
- **IntervalManager**: Manages game timing, animations, and scheduled events
- **Game**: Handles game initialization, state management, and screen transitions

### Game Objects
- **Character**: Player-controlled character with movement, jumping, and combat abilities
- **Enemies**:
  - **Chicken**: Standard enemy with basic movement
  - **MiniChicken**: Faster, smaller enemy variant
  - **Endboss**: Final boss with multiple attack patterns and phases
- **Collectables**:
  - **CoinCollectable**: Increases player's score when collected
  - **BottleCollectable**: Provides ammo for throwing attacks
- **Projectiles**:
  - **BottleThrowable**: Throwable weapon with arc physics

### UI Elements
- **HpStatusbar**: Displays player's current health
- **BossHpStatusbar**: Shows boss health when in boss battles
- **CoinStatusbar**: Tracks collected coins
- **BottleStatusbar**: Shows available bottle ammo

## Game Flow

1. **Initialization**:
   - Load all assets (images, sounds)
   - Initialize game systems (input, audio, rendering)
   - Set up the game canvas and UI

2. **Main Menu**:
   - Display game title and controls
   - Wait for player to start the game

3. **Level Start**:
   - Load level configuration
   - Spawn player and level objects
   - Initialize camera and viewport

4. **Game Loop**:
   - Process player input
   - Update game state (physics, collisions, AI)
   - Handle animations and effects
   - Render the current frame
   - Check win/lose conditions

5. **Combat System**:
   - Player can jump on enemies to defeat them
   - Collect bottles to use as throwing weapons
   - Boss battles with multiple phases

6. **Game Over/Complete**:
   - Display final score and stats
   - Option to restart or return to menu

## Technical Details

### Dependencies
- **HTML5 Canvas**: For 2D rendering
- **Web Audio API**: For sound effects and music
- **Modern JavaScript (ES6+)**: For object-oriented game architecture
- **Mobile Support**: Touch controls and screen orientation handling

### Performance Optimizations
- Object pooling for frequently created/destroyed objects
- Efficient collision detection using spatial partitioning
- Asset preloading and caching
- Animation frame optimization

### Asset Management
- **Sprites**: Optimized sprite sheets for animations
- **Audio**: Compressed audio formats with fallbacks
- **Level Data**: JSON-based level definitions

## Development Notes

### File Organization
- **/models**: Contains all game object classes
- **/img**: Organized by asset type and purpose
- **/audio**: Categorized sound effects and music
- **/js**: Core game scripts and utilities

### Coding Conventions
- Classes follow PascalCase naming
- Methods and variables use camelCase
- Private members are prefixed with underscore
- Event-driven architecture for game systems
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