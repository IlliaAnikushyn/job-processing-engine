export function* infiniteGenerator() {
    let i = 1;
    while (true) {
        yield { id: i++, load: Math.floor(Math.random() * 100) };
    }
}

export function timeoutIterator(iterator, timeoutMs) {
    const startTime = Date.now();
    return {
        next() {
            if (Date.now() - startTime > timeoutMs) return { done: true, value: undefined };
            return iterator.next();
        }
    };
}

export function memoize(fn, strategy = 'LRU', maxCacheSize = 5) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            const value = cache.get(key);
            if (strategy === 'LRU') {
                cache.delete(key);
                cache.set(key, value);
            }
            return value;
        }
        const result = fn(...args);
        if (cache.size >= maxCacheSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        cache.set(key, result);
        return result;
    };
}