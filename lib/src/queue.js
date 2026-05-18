export class BiDirectionalPriorityQueue {
    constructor() {
        this.items = [];
        this.head = 0;
    }
    
    enqueue(item, priority) {
        this.items.push({ item, priority });
    }
    
    dequeueOldest() {
        if (this.head >= this.items.length) return null;
        const value = this.items[this.head].item;
        this.head++;
        if (this.head > 100 && this.head > this.items.length / 2) {
            this.items = this.items.slice(this.head);
            this.head = 0;
        }
        return value;
    }
    
    dequeueNewest() {
        if (this.head >= this.items.length) return null;
        return this.items.pop().item;
    }

    dequeueHighestPriority() {
        if (this.head >= this.items.length) return null;
        let highestIdx = this.head;
        for (let i = this.head + 1; i < this.items.length; i++) {
            if (this.items[i].priority > this.items[highestIdx].priority) {
                highestIdx = i;
            }
        }
        const value = this.items[highestIdx].item;
        this.items.splice(highestIdx, 1);
        return value;
    }
}