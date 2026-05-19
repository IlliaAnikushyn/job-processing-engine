import { EventEmitter } from './events.js';

export class DataStreamer extends EventEmitter {
    constructor() {
        super();
    }
    async streamData(dataArray, delayMs) {
        for (const item of dataArray) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            this.emit('data', item);
        }
        this.emit('end');
    }
}