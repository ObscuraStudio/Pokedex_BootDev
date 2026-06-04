export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val,
        });
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry)
            return undefined;
        return entry.val;
    }
    #reap() {
        const cutoff = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt <= cutoff) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
