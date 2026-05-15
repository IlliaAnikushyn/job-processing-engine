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

export function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}