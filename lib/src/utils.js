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