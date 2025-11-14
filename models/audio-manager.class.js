/**
 * @class AudioManager
 * @description Handles loading, playback, and volume control for game audio assets.
 */
class AudioManager {
    /**
     * @type {number}
     * @description Timestamp of the last sound that was played.
     */
    lastPlayed = 0;
    /**
     * @type {string}
     * @description Name of the most recently played sound effect.
     */
    lastPlayedSound = '';
    /**
     * @type {number}
     * @description Master volume multiplier applied to all sounds.
     */
    overallVolume = 0.5;
    /**
     * @type {HTMLAudioElement[]}
     * @description Active audio elements currently playing.
     */
    playedSounds = [];

    /**
     * @constructor
     * @description Initializes audio storage and restores volume settings from local storage.
     */
    constructor() {
        this.sounds = {};
        if (localStorage.getItem('volume')) {
            this.overallVolume = parseFloat(localStorage.getItem('volume'));
        } else {
            this.overallVolume = 0.5;
        }

        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.value = this.overallVolume;
            this.changeVolumeDisplay();
        }
    }

    /**
     * @function changeVolumeDisplay
     * @description Updates the on-screen volume label to match the current master volume.
     */
    changeVolumeDisplay() {
        const label = document.getElementById('volume-label');
        if (label) {
            label.textContent = Math.round(this.overallVolume * 100) + '%';
        }
    }

    /**
     * @function loadSound
     * @param {string} name - Identifier for the sound effect.
     * @param {string} path - Asset path to the audio file.
     * @description Loads an audio asset and stores it for later playback.
     */
    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].dataset.name = name;
    }

    /**
     * @function isSoundInCooldown
     * @param {string} name - Name of the sound to check.
     * @param {number} cooldown - Cooldown period in milliseconds.
     * @returns {boolean} True if the sound is in cooldown, false otherwise.
     * @private
     */
    isSoundInCooldown(name, cooldown) {
        return cooldown && this.lastPlayedSound === name && Date.now() - this.lastPlayed < cooldown;
    }

    /**
     * @function createSoundInstance
     * @param {HTMLAudioElement} template - The audio element to clone.
     * @param {string} name - Identifier for the sound.
     * @param {number} baseVolume - Base volume multiplier.
     * @returns {HTMLAudioElement} A configured audio element instance.
     * @private
     */
    createSoundInstance(template, name, baseVolume) {
        const sound = template.cloneNode();
        sound.dataset.name = name;
        sound.baseVolume = baseVolume;
        sound.volume = this.overallVolume * baseVolume;
        sound.onended = () => this.stopSound(sound);
        return sound;
    }

    /**
     * @function setupSoundPlayback
     * @param {HTMLAudioElement} sound - The sound to play.
     * @param {boolean} loop - Whether to loop the sound.
     * @param {?number} duration - Optional duration after which to stop the sound.
     * @private
     */
    setupSoundPlayback(sound, loop, duration) {
        sound.loop = loop;
        this.playedSounds.push(sound);
        sound.play().catch(() => {});
        
        if (duration) {
            setTimeout(() => this.stopSound(sound), duration);
        }
    }

    /**
     * @function playSound
     * @param {string} name - Identifier of the sound to play.
     * @param {number} [baseVolume=1.0] - Base volume multiplier before applying the master volume.
     * @param {boolean} [loop=false] - Whether the sound should loop continuously.
     * @param {?number} [duration=null] - Optional duration in milliseconds after which the sound stops.
     * @param {number} [cooldown=100] - Cooldown in milliseconds to prevent rapid replays of the same sound.
     * @returns {?HTMLAudioElement} A clone of the audio element being played, or null if playback was skipped.
     * @description Plays a cloned instance of a loaded sound with volume and cooldown handling.
     */
    playSound(name, baseVolume = 1.0, loop = false, duration = null, cooldown = 100) {
        const template = this.sounds[name];
        if (!template || this.isSoundInCooldown(name, cooldown)) {
            return null;
        }

        const sound = this.createSoundInstance(template, name, baseVolume);
        this.setupSoundPlayback(sound, loop, duration);
        
        this.lastPlayedSound = name;
        this.lastPlayed = Date.now();
        return sound;
    }
    
    /**
     * @function stopSound
     * @param {?HTMLAudioElement} sound - The audio element to stop.
     * @description Stops playback of a specific sound and removes it from the active list.
     */
    stopSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
        this.playedSounds = this.playedSounds.filter(s => s !== sound);
    }

    /**
     * @function stopAllSounds
     * @description Stops and clears all currently playing sounds.
     */
    stopAllSounds() {
        this.playedSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.playedSounds = [];
    }

    /**
     * @function changeVolume
     * @param {string} name - Identifier of the sound whose instances should be adjusted.
     * @param {number} multiplier - Additional multiplier applied to the base volume of matched sounds.
     * @description Adjusts the volume of all active instances of a specific sound.
     */
    changeVolume(name, multiplier) {
        this.playedSounds.forEach(sound => {
            if (sound.dataset.name === name) {
                const base = sound.baseVolume ?? 1.0;
                sound.volume = base * this.overallVolume * multiplier;
            }
        });
    }

    /**
     * @function changeAllVolume
     * @param {number|string} volume - New master volume value to apply and persist.
     * @description Updates the global volume multiplier and applies it to all playing sounds.
     */
    changeAllVolume(volume) {
        this.overallVolume = parseFloat(volume);
        localStorage.setItem('volume', this.overallVolume);
        this.playedSounds.forEach(sound => {
            const base = sound.baseVolume ?? 1.0;
            sound.volume = base * this.overallVolume;
        });
        this.changeVolumeDisplay();
    }
}
