export function createLogDecorator(level) {
    return function(fn) {
        return function(...args) {
            const result = fn(...args);
            console.log(`[${new Date().toISOString()}] [${level}] ${fn.name} executed successfully.`);
            return result;
        };
    };
}