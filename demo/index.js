import {
    BiDirectionalPriorityQueue, createLogDecorator,
    BaseHttpClient, AuthProxy, GitHubService
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

    const tokenProvider = { getToken: () => "valid-jwt", refreshToken: async () => "new-jwt" };
    const authProxy = new AuthProxy(new BaseHttpClient(), tokenProvider);
    const githubService = new GitHubService(authProxy);
    await githubService.getUserData("IlliaAnikushyn");
}

runDemo();