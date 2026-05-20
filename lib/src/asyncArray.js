export async function asyncMapPromise(arr, asyncCallback, signal) {
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        if (signal?.aborted) throw new Error('Aborted by AbortController');
        const result = await new Promise((resolve, reject) => {
            let timeoutId;
            const onAbort = () => {
                clearTimeout(timeoutId);
                if (signal) signal.removeEventListener('abort', onAbort);
                reject(new Error('Aborted by AbortController'));
            };
            if (signal) signal.addEventListener('abort', onAbort);
            timeoutId = setTimeout(async () => {
                try {
                    const val = await asyncCallback(arr[i]);
                    if (signal) signal.removeEventListener('abort', onAbort);
                    resolve(val);
                } catch (err) {
                    if (signal) signal.removeEventListener('abort', onAbort);
                    reject(err);
                }
            }, 50);
        });
        results.push(result);
    }
    return results;
}