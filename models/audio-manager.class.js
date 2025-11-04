class AudioManager {
    constructor() {
        this.sounds = {};
    }

    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
    }

    playSound(name, volume = 1.0, loop = false) {
        if (this.sounds[name]) {
            const sound = this.sounds[name].cloneNode();
            sound.volume = volume;
            sound.loop = loop;
            sound.play().catch(e => console.warn(`Audio play failed: ${e}`));
            return sound;
        }
        return null;
    }
}