class IntervalManager {
    static intervals = new Set();
    static intervalCount = 0;
    static allFunctions = [];
    static addInterval(id, name = 'unnamed') {
        this.intervals.add(id);
        this.intervalCount++;
        console.log(`Interval added: ${name} (ID: ${id}) - Total: ${this.intervalCount}`);
        return id;
    }
    static removeInterval(id, name = 'unnamed') {
        if (this.intervals.has(id)) {
            clearInterval(id);
            this.intervals.delete(id);
            this.intervalCount--;
            console.log(`Interval removed: ${name} (ID: ${id}) - Total: ${this.intervalCount}`);
        }
    }
    static clearAllIntervals() {
        console.log(`Clearing all ${this.intervalCount} intervals...`);
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();
        this.intervalCount = 0;
        console.log('All intervals cleared');
    }
    static setInterval(callback, delay, name = 'unnamed') {
        if (!this.allFunctions.some(fn => fn.fn === callback)) {
            this.allFunctions.push({fn: callback, ms: delay });
        }
        const id = setInterval(callback, delay);
        return this.addInterval(id, name);
    }
    static getIntervalList() {
        return Array.from(this.intervals);
    }
    static getIntervalCount() {
        return this.intervalCount;
    }
    static logAllIntervals() {
        console.log(`Active intervals (${this.intervalCount}):`, this.getIntervalList());
    }

    static pauseAllIntervals() {
        this.clearAllIntervals();
    }
    static resumeAllIntervals() {
        this.allFunctions.forEach(fn => {
            this.setInterval(fn.fn, fn.ms);
        });
    }
}
