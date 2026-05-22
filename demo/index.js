import {
    EventEmitter, BiDirectionalPriorityQueue, createLogDecorator,
    BaseHttpClient, AuthProxy, GitHubService, 
    asyncMapPromise, asyncMapCallback
} from '../lib/src/index.js';
import { DataStreamer } from '../lib/src/stream.js';

async function runDemo() {
    console.log("=== Job Processing Engine Initialized ===\n");
    
    const queue = new BiDirectionalPriorityQueue();
    queue.enqueue("Task A", 1);
    queue.enqueue("Task B", 5);
    console.log(`[Queue] Dequeued highest priority: ${queue.dequeueHighestPriority()}`);

    const log = createLogDecorator('INFO');
    const processData = log(function processData(data) { return `Processed ${data}`; });
    processData("Sample Core Data");

    const streamer = new DataStreamer();
    streamer.on('data', (d) => console.log(`[Stream] Received: ${d}`));
    streamer.on('end', () => console.log(`[Stream] Finished`));
    await streamer.streamData([1, 2, 3], 10);

    const tokenProvider = { getToken: () => "valid-jwt", refreshToken: async () => "new-jwt" };
    const authProxy = new AuthProxy(new BaseHttpClient(), tokenProvider);
    const githubService = new GitHubService(authProxy);
    await githubService.getUserData("IlliaAnikushyn");

    console.log("\n=== Testing Lab 5 (Callback-based Async Array) ===");
    const cbController = new AbortController();
    
    asyncMapCallback([1, 2, 3], 
        (val, cb) => cb(null, val * 2),
        (err, res) => {
            if (err) console.error("Callback Map Error:", err.message);
            else console.log("Callback Map Result:", res);
        }, 
        cbController.signal
    );

    console.log("\n=== Testing Lab 5 (Promise-based Async Array) ===");
    const promiseController = new AbortController();
    try {
        const promiseRes = await asyncMapPromise([10, 20, 30], async (x) => x + 5, promiseController.signal);
        console.log("Promise Map Result:", promiseRes);
    } catch (error) {
        console.log(`Promise Map Error: ${error.message}`);
    }
}

runDemo();