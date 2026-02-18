/*
We calculate the next flush delay using exponential backoff for consecutive failures, capped at a 
maximum interval, with a small random jitter to avoid multiple clients sending at the same exact time.
we are adding jittering to avoid condtion suppose that many clients basically have the same flush
interval they could send all the batches at the same time this is called thundering heard.

We use setTimeout to schedule the next flush after a dynamic delay. After each flush, we recursively 
schedule the next one, creating a continuous loop that handles both periodic sending and retries 
with exponential backoff.

function shceduleNextFlush(){
const delay = Math.min(BATCH_INTERVAL * Math.pow(2,retryCount),MAX_INTERVAL) + Math.random()*2000
setTimeout(async ()=>{
    await flushBatch()
    scheduleNextFlush()
    })
}
scheduleNextFlush()

*/
