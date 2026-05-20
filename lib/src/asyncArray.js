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

export function asyncMapCallback(arr, callbackFn, finalCallback, signal) {
    const results = [];
    let completed = 0;
    let hasError = false;
    if (arr.length === 0) return finalCallback(null, results);
    const onAbort = () => {
        if (hasError) return;
        hasError = true;
        finalCallback(new Error('Aborted by AbortController'));
    };
    if (signal) {
        if (signal.aborted) return onAbort();
        signal.addEventListener('abort', onAbort);
    }
    arr.forEach((item, index) => {
        if (hasError) return;
        setTimeout(() => {
            if (hasError) return;
            callbackFn(item, (err, val) => {
                if (hasError) return;
                if (err) {
                    hasError = true;
                    if (signal) signal.removeEventListener('abort', onAbort);
                    return finalCallback(err);
                }
                results[index] = val;
                completed++;
                if (completed === arr.length) {
                    if (signal) signal.removeEventListener('abort', onAbort);
                    finalCallback(null, results);
                }
            });
        }, 50);
    });
}