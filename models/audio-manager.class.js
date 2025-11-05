class AudioManager {
lastPlayed = 0;
lastPlayedSound = '';

    constructor() {
        this.sounds = {};
    }

    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
    }

    playSound(name, volume = 1.0, loop = false, duration = null, delay = 0) {
        if (this.sounds[name] && (Date.now() - this.lastPlayed > delay || this.lastPlayedSound !== name)) {
            const sound = this.sounds[name].cloneNode();
            sound.volume = volume;
            sound.loop = loop;
            sound.play().catch(e => console.warn(`Audio play failed: ${e}`));
            
            // Stop the sound after the specified duration if provided
            if (duration) {
                setTimeout(() => {
                    this.stopSound(sound);
                }, duration);
            }
            this.lastPlayedSound = name;
            this.lastPlayed = Date.now();
            
            return sound;
            
        }
        return null;
    }

    /**
     * Stops a playing sound and resets it
     * @param {HTMLAudioElement} sound - The sound to stop
     */
    stopSound(sound) {
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}