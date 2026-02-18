useEffect(() => {
  // 1️⃣ Initialize SharedWorker for centralized event tracking across tabs
  const worker = new SharedWorker("/worker/analytics.js");
  workerRef.current = worker;
  worker.port.start(); // Activate message channel for communication

  // 2️⃣ Send any events queued before worker was ready
  if (eventQueue.current.length > 0) {
    eventQueue.current.forEach((ev) => worker.port.postMessage(ev));
    eventQueue.current = []; // Clear queue after sending
  }

  // 3️⃣ Define a function to force immediate flush
  const handleFlush = () =>
    workerRef.current?.port.postMessage({ type: "FORCE_FLUSH" });

  // 4️⃣ Flush events when the user comes online (offline → online)
  window.addEventListener("online", handleFlush);

  // 5️⃣ Flush events when the tab becomes hidden (user switches tabs or closes tab)
  const handleVisibility = () => {
    if (document.visibilityState === "hidden") handleFlush();
  };
  document.addEventListener("visibilitychange", handleVisibility);

  // 6️⃣ Cleanup function when component unmounts
  return () => {
    worker.port.postMessage({ type: "CLOSE_PORT" }); // Inform worker to stop processing this port
    worker.port.close(); // Close port to prevent memory leaks

    // Remove event listeners to prevent dangling references
    window.removeEventListener("online", handleFlush);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, []); // Empty dependency array → runs only once on mount
