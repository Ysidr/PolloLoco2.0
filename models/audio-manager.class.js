class AudioManager {
lastPlayed = 0;
lastPlayedSound = '';

    constructor() {
        this.sounds = {};
    }

    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
    }

    playSound(name, volume = 1.0, loop = false, duration = null, delay = 1000) {
        if (this.sounds[name] && (Date.now() - this.lastPlayed > delay || this.lastPlayedSound !== name)) {
            const sound = this.sounds[name].cloneNode();
            sound.volume = volume;
            sound.loop = loop;
            sound.play().catch(e => console.warn(`Audio play failed: ${e}`));           
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

    stopSound(sound) {
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}