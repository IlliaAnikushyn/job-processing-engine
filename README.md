# Job Processing Engine

![Node.js](https://img.shields.io/badge/Node.js-Execution%20Environment-339933?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Modular-ff69b4?style=flat-square)

A comprehensive, asynchronous job processing and data streaming engine. This repository demonstrates core software engineering principles, including advanced algorithmic queues, reactive event streaming, and custom proxy architectures, built entirely with native JavaScript.

## 📂 Project Structure

The project is strictly separated into a core library and a client implementation, mimicking standard npm package architecture:

```text
job-processing-engine/
├── lib/
│   ├── src/
│   │   ├── asyncArray.js   # Promise & Callback async mappers
│   │   ├── events.js       # Custom Event Emitter
│   │   ├── index.js        # Main module exports
│   │   ├── logger.js       # Decorator patterns
│   │   ├── proxy.js        # Auth & HTTP Proxy
│   │   ├── queue.js        # Priority Queue (O(1) optimization)
│   │   ├── stream.js       # Reactive Data Streamer
│   │   └── utils.js        # Generators & LRU Cache
│   └── package.json        # Library manifest
├── demo/
│   ├── index.js            # Client application implementing the engine
│   └── package.json        # Client manifest (imports lib)
├── .gitignore
└── README.md
```

## ⚙️ Core Features & API Reference
1. **Data Structures & Algorithms**
   * BiDirectionalPriorityQueue (queue.js): A custom queue implementation optimized for O(1) reads using dynamic head tracking and array slicing to prevent memory leaks during high-throughput job processing.

   * LRU Cache (utils.js): A memoization wrapper featuring a Least Recently Used (LRU) eviction policy to safely cache expensive operations without exceeding memory limits.

2. **Asynchronous Processing**
   * Async Array Mappers (asyncArray.js): Custom implementations of parallel array processing supporting both modern Promise and legacy Callback architectures. Includes native AbortController integration for safe termination of pending background jobs.

3. **Reactive Event Streams**
   * EventEmitter & DataStreamer (events.js, stream.js): A custom pub/sub event system extended into a reactive data streamer, allowing asynchronous data chunks to be emitted and processed with configurable delays.

4. **Design Patterns**
   * AuthProxy (proxy.js): Structural proxy pattern acting as an interceptor for an HTTP Client. It autonomously handles JWT token verification, injection, and background refreshing without polluting the core HTTP logic.
   * Execution Logger (logger.js): Structural decorator pattern for wrapping functions to universally track execution status and timestamps.
   
## 🚀 Getting Started

   ### Prerequisites
   * **Node.js** (v18.0.0 or higher recommended)

   ### Installation & Execution
   1. Navigate to the demo client directory and install dependencies:
      ```bash
      cd demo
      npm install
      ```
   2. Run the integration sequence:
      ```bash
      node index.js
      ```

### 📄 License
This project is licensed under the MIT License.