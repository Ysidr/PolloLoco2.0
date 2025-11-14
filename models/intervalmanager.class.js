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
     * @type {Array<{id: number, name: string}>}
     * @description Collection of active intervals with their IDs and associated names.
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
     * @description Stores an interval reference (ID + name) and increments the active count.
     */
    static addInterval(id, name = 'unnamed') {
        this.intervals.push({id, name});
        this.intervalCount++;
        return id;
    }
    /**
     * @function removeInterval
     * @param {number} id - Interval identifier to clear.
     * @param {string} [name='unnamed'] - Human-readable label used when the interval was created.
     * @description Clears and removes a tracked interval by ID or matching name.
     */
    static removeInterval(id, name = 'unnamed') {
        this.intervals.forEach(element => {
            if ((element.name === name &&name!='unnamed') || element.id === id) {
                clearInterval(element.id);
                this.intervals.splice(this.intervals.indexOf(element), 1);
                this.intervalCount--;
            }
        });
    }
    /**
     * @function clearAllIntervals
     * @description Stops every tracked interval and resets the manager state.
     */
    static clearAllIntervals() {
        this.intervals.forEach(element => clearInterval(element.id));
        this.intervals = [];
        this.intervalCount = 0;
    }
    /**
     * @function setInterval
     * @param {Function} callback - Function to execute on each interval tick.
     * @param {number} delay - Interval delay in milliseconds.
     * @param {string} [name='unnamed'] - Human-readable label for logging and lookups after resume.
     * @returns {number} Interval identifier from setInterval.
     * @description Registers and starts an interval while tracking its metadata for pause/resume support.
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
     * @returns {Array<{id: number, name: string}>} Array of active interval records.
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
