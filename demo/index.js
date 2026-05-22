import {
    BiDirectionalPriorityQueue, createLogDecorator
} from '../lib/src/index.js';

async function runDemo() {
    console.log("=== Job Processing Engine Initialized ===\n");
    
    const queue = new BiDirectionalPriorityQueue();
    queue.enqueue("Task A", 1);
    queue.enqueue("Task B", 5);
    console.log(`[Queue] Dequeued highest priority: ${queue.dequeueHighestPriority()}`);

    const log = createLogDecorator('INFO');
    const processData = log(function processData(data) { return `Processed ${data}`; });
    processData("Sample Core Data");
}

runDemo();