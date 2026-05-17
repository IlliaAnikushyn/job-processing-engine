export class BiDirectionalPriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(item, priority) {
        this.items.push({ item, priority });
    }
    dequeueOldest() {
        if (this.items.length === 0) return null;
        return this.items.shift().item;
    }
}