class AudioManager {
    lastPlayed = 0;
    lastPlayedSound = '';
    overallVolume = 0.5;
    playedSounds = [];

    constructor() {
        this.sounds = {};
        this.overallVolume = parseFloat(localStorage.getItem('volume')) || 0.5;

        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.value = this.overallVolume;
            this.changeVolumeDisplay();
        }
    }

    changeVolumeDisplay() {
        const label = document.getElementById('volume-label');
        if (label) {
            label.textContent = Math.round(this.overallVolume * 100) + '%';
        }
    }

    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].dataset.name = name;
    }

    playSound(name, baseVolume = 1.0, loop = false, duration = null, cooldown = 100) {
        const template = this.sounds[name];
        if (!template) return null;

        if (cooldown && this.lastPlayedSound === name && Date.now() - this.lastPlayed < cooldown) {
            return null;
        }

        const sound = template.cloneNode();
        sound.dataset.name = name;
        sound.baseVolume = baseVolume;
        sound.volume = this.overallVolume * baseVolume;
        sound.loop = loop;

        this.playedSounds.push(sound);

        sound.onended = () => this.stopSound(sound);

        sound.play().catch(() => {});

        if (duration) {
            setTimeout(() => this.stopSound(sound), duration);
        }

        this.lastPlayedSound = name;
        this.lastPlayed = Date.now();
        return sound;
    }

    stopSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
        this.playedSounds = this.playedSounds.filter(s => s !== sound);
    }

    stopAllSounds() {
        this.playedSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.playedSounds = [];
    }

    changeVolume(name, multiplier) {
        this.playedSounds.forEach(sound => {
            if (sound.dataset.name === name) {
                const base = sound.baseVolume ?? 1.0;
                sound.volume = base * this.overallVolume * multiplier;
            }
        });
    }

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
