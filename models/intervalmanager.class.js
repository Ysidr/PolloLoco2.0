/**
 * @class IntervalManager
 * @description Utility for tracking and controlling active setInterval timers across the game.
 */

/**
 * @typedef {Object} IntervalFunction
 * @property {Function} fn - Function to execute on each interval tick.
 * @property {number} ms - Interval delay in milliseconds.
 */
class IntervalManager {
    /**
     * @type {Set<number>}
     * @description Collection of active interval IDs.
     */
    static intervals  = [];
    /**
     * @type {number}
     * @description Total count of active intervals.
     */
    static intervalCount = 0;
    /**
     * @type {IntervalFunction[]}
     * @description Registry of interval callbacks and their delays for resume support.
     */
    static allFunctions = [];
    /**
     * @function addInterval
     * @param {number} id - Interval identifier returned by setInterval.
     * @param {string} [name='unnamed'] - Human-readable label for logging.
     * @returns {number} The interval ID that was added.
     * @description Stores an interval reference and increments the active count.
     */
    static addInterval(id, name = 'unnamed') {
        this.intervals.push({id, name});
        this.intervalCount++;
        console.log(`Interval added: ${name} (ID: ${id}) - Total: ${this.intervalCount}`);
        return id;
    }
    /**
     * @function removeInterval
     * @param {number} id - Interval identifier to clear.
     * @param {string} [name='unnamed'] - Human-readable label for logging.
     * @description Clears and removes an interval from the managed set.
     */
    static removeInterval(id, name = 'unnamed') {
        this.intervals.forEach(element => {
            if ((element.name === name &&name!='unnamed') || element.id === id) {
                clearInterval(element.id);
                this.intervals.splice(this.intervals.indexOf(element), 1);
                this.intervalCount--;
                console.log(`Interval removed: ${name} (ID: ${id}) - Total: ${this.intervalCount}`);
            }
        });
    }
    /**
     * @function clearAllIntervals
     * @description Stops and removes every tracked interval.
     */
    static clearAllIntervals() {
        console.log(`Clearing all ${this.intervalCount} intervals...`);
        this.intervals.forEach(element => clearInterval(element.id));
        this.intervals = [];
        this.intervalCount = 0;
        console.log('All intervals cleared');
    }
    /**
     * @function setInterval
     * @param {Function} callback - Function to execute on each interval tick.
     * @param {number} delay - Interval delay in milliseconds.
     * @param {string} [name='unnamed'] - Human-readable label for logging.
     * @returns {number} Interval identifier from setInterval.
     * @description Registers and starts an interval while tracking it for later control.
     */
    static setInterval(callback, delay, name = 'unnamed') {
        if (!this.allFunctions.some(fn => fn.fn === callback)) {
            this.allFunctions.push({fn: callback, ms: delay, name: name });
        }
        const id = setInterval(callback, delay);
        return this.addInterval(id, name);
    }
    /**
     * @function getIntervalList
     * @returns {number[]} Array of active interval IDs.
     */
    static getIntervalList() {
        return this.intervals;
    }
    /**
     * @function getIntervalCount
     * @returns {number} Number of active intervals.
     */
    static getIntervalCount() {
        return this.intervalCount;
    }
    /**
     * @function logAllIntervals
     * @description Logs all active interval IDs and count to the console.
     */
    static logAllIntervals() {
        console.log(`Active intervals (${this.intervalCount}):`, this.getIntervalList());
    }

    /**
     * @function pauseAllIntervals
     * @description Clears every active interval without clearing the stored callbacks.
     */
    static pauseAllIntervals() {
        this.clearAllIntervals();
    }
    /**
     * @function resumeAllIntervals
     * @description Re-creates stored intervals using the saved callbacks and delays.
     */
    static resumeAllIntervals() {
        this.allFunctions.forEach(fn => {
            this.setInterval(fn.fn, fn.ms, fn.name);
        });
    }
}
