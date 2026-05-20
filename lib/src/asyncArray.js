export async function asyncMapPromise(arr, asyncCallback) {
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        const result = await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const val = await asyncCallback(arr[i]);
                    resolve(val);
                } catch (err) {
                    reject(err);
                }
            }, 50);
        });
        results.push(result);
    }
    return results;
}