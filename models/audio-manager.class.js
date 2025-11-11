class AudioManager {
    lastPlayed = 0;
    lastPlayedSound = '';
    activeSounds = new Set();
    overallVolume = 0;

    constructor() {
        this.sounds = {};
        this.overallVolume = parseFloat(localStorage.getItem('volume')) || 0.5;
        if(document.getElementById('volume-slider')) {
            document.getElementById('volume-slider').value = this.overallVolume;
            this.changeVolumeDisplay();
        }
    }
    changeVolumeDisplay() {
        if(document.getElementById('volume-label')) {
            document.getElementById('volume-label').textContent = Math.round(this.overallVolume * 100) + '%';
        }
    }

    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
    }

    playSound(name, volume = 1.0, loop = false, duration = null, delay = 1000) {
        if (this.sounds[name] && (Date.now() - this.lastPlayed > delay || this.lastPlayedSound !== name)) {
            const sound = this.sounds[name].cloneNode();
            sound.baseVolume = volume;
            sound.volume = this.overallVolume * sound.baseVolume;
            sound.loop = loop;

            this.activeSounds.add(sound);

            sound.onended = () => {
                this.activeSounds.delete(sound);
            };

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
            this.activeSounds.delete(sound);
        }
    }

    stopAllSounds() {
        this.activeSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.activeSounds.clear();
    }

    stopSoundByName(name) {
        this.activeSounds.forEach(sound => {
            if (sound.src.includes(name)) {
                sound.pause();
                sound.currentTime = 0;
                this.activeSounds.delete(sound);
            }
        });
    }
    changeVolume(name, volumeMultiplier) {
        this.activeSounds.forEach(sound => {
            if (sound.src.includes(name)) {
                sound.volume = volumeMultiplier * sound.volume;
            }
        });
    }
    changeAllVolume(volume) {
        this.overallVolume = volume;
        localStorage.setItem('volume', volume);

        this.activeSounds.forEach(sound => {
            const base = sound.baseVolume ?? 1.0;
            sound.volume = base * volume;
        });
    }
}
