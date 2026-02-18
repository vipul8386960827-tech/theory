/*
const connectedPorts = new Set()

onconnect=(e)=>{ ... }
so first we will write a function onconnect which will run once per tab that connects. It is basically
a handler for new connection to the SharedWorker. e is the connection event which is triggered when a new
tab window connects 
now we have force flush and close port as types we can pass these these via useEffect in which we can
we close the port in the clean up function of that useEffect at that time we can write
return = ()=>{worker.port.postMessage("FORCE_FLUSH")} suppose there are multiple tabs open it 
will help us to close that port. i mean when that particular component in that page will unmount
and will disconnect the port.
onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = async (event) => {
    const data = event.data;

    if (data.type === "CLOSE_PORT") {
      return; // just ignore further messages from this port
    }

    if (data.type === "FORCE_FLUSH") {
      await flushBatch();
      return;
    }

    const enrichedEvent = {
      ...data,
      sessionId: WORKER_SESSION_ID,
      timestamp: data.timeStamp || data.timestamp || Date.now(),
    };

    batchQueue.push(enrichedEvent);

    if (batchQueue.length >= BATCH_SIZE) {
      await flushBatch();
    }
  };

  port.start();
};

*/
