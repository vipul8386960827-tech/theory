"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransitionWrapper({ children }) {
  const pathName = usePathname();
  const workerRef = useRef(null);
  const eventQueue = useRef([]);
  const previousPathRef = useRef(null);

  const sendToWorker = (data) => {
    if (workerRef.current && workerRef.current.port) {
      workerRef.current.port.postMessage(data);
    } else {
      eventQueue.current.push(data);
    }
  };

  useEffect(() => {
    const worker = new SharedWorker("/worker/analytics.js");
    workerRef.current = worker;
    worker.port.start();

    if (eventQueue.current.length > 0) {
      eventQueue.current.forEach((ev) => worker.port.postMessage(ev));
      eventQueue.current = [];
    }

    const handleFlush = () =>
      workerRef.current?.port.postMessage({ type: "FORCE_FLUSH" });

    window.addEventListener("online", handleFlush);

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") handleFlush();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      worker.port.postMessage({ type: "CLOSE_PORT" });
      worker.port.close();

      window.removeEventListener("online", handleFlush);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // ✅ Page tracking with sessionStorage persistence
  useEffect(() => {
    // 1️⃣ Get previous page from sessionStorage (survives refresh)
    const storedPrevious =
      previousPathRef.current || sessionStorage.getItem("previousPath");

    sendToWorker({
      type: "page_view",
      currentPage: pathName,
      previousPage: storedPrevious,
      referrer: !storedPrevious ? document.referrer : null,
      timeStamp: Date.now(),
    });

    // 2️⃣ Update ref
    previousPathRef.current = pathName;

    // 3️⃣ Persist for refresh survival
    sessionStorage.setItem("previousPath", pathName);

    const heartbeat = setInterval(() => {
      sendToWorker({
        type: "heartbeat",
        currentPage: pathName,
        timeStamp: Date.now(),
      });
    }, 30000);

    return () => clearInterval(heartbeat);
  }, [pathName]);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      sendToWorker({
        type: "click",
        currentPage: pathName,
        action: target.dataset.action,
        component: target.dataset.component || "unknown",
        timeStamp: Date.now(),
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathName]);

  return children;
}
