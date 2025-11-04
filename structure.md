# Class Structure Diagram

## Inheritance Hierarchy

```
MovableObject (Base Class)
├── BackgroundObject
├── Cloud
├── Collectable
│   └── Throwables
│       └── BottleThrowable
└── PcNpc
    ├── Character
    ├── Chicken
    └── Endboss

StatusBars (Standalone)
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

### Base Classes
- **MovableObject**: Core functionality for all game objects (position, movement, collision, image handling)
- **Collectable**: Extends MovableObject, base for all collectable items with world reference
- **PcNpc**: Extends MovableObject, adds health system and combat mechanics
- **StatusBars**: Base for UI status displays

### Game Objects
- **Character**: Player character (extends PcNpc) - manages throwableCount and coinCount inventory
- **Chicken**: Basic enemy (extends PcNpc)
- **Endboss**: Boss enemy (extends PcNpc)
- **Cloud**: Background decoration (extends MovableObject)
- **BackgroundObject**: Parallax background layers (extends MovableObject)
- **Collectable**: Base class for collectable items (extends MovableObject)
- **Throwables**: Base for throwable objects (extends Collectable)
- **BottleThrowable**: Throwable weapon (extends Throwables) - spawns at character position

### UI Elements
- **HpStatusbar**: Health display
- **CoinStatusbar**: Coin counter
- **BottleStatusbar**: Ammo counter

### System Classes
- **Inputs**: Handles keyboard input state
- **IntervalManager**: Manages game loops and animations
- **Level**: Level configuration and object placement
- **World**: Main game controller, coordinates all systems

## Key Relationships

- **World** contains and manages all game objects
- **Character** uses **Inputs** for movement
- **PcNpc** subclasses use health system for combat
- **StatusBars** display game state to player
- **Collectable** hierarchy provides world reference to all collectables
- **Throwables** used by Character for attacks, spawn at character position
- **Character** manages inventory (throwableCount, coinCount)
- **BottleThrowable** accesses character inventory via world.character.throwableCount