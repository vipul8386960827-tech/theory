/*
This component implements infinite scrolling WITHOUT TanStack Query.
Instead of relying on a data-fetching library, all pagination state,
caching, and merging logic is handled manually using React hooks.

High-Level Flow:
1. Initial posts and cursor are received as props (usually from server-side rendering).
2. Posts are stored in local component state.
3. A cursor is stored to know where the next page begins.
4. An IntersectionObserver watches a sentinel element at the bottom.
5. When the sentinel becomes visible, the next page is fetched.
6. New posts are appended to existing posts.
7. When no cursor is returned, we stop fetching and show an end message.

Now explaining line-by-line behavior in comment form:
*/

"use client";
// Ensures this component runs only in the browser.
// Required because IntersectionObserver and hooks
// do not run on the server in Next.js App Router.

import { useState, useEffect, useRef, useCallback } from "react";
// useState → stores posts, cursor, loading state
// useEffect → sets up and cleans up IntersectionObserver
// useRef → references the sentinel DOM element
// useCallback → stabilizes fetchNextPage function reference

export default function FeedList({ initialPosts, initialCursor }) {
  // initialPosts → first batch of posts (usually server-rendered)
  // initialCursor → pointer for the next page

  const [posts, setPosts] = useState(initialPosts);
  // Stores all loaded posts in a single array.
  // Unlike TanStack, we manually accumulate pages here.

  const [cursor, setCursor] = useState(initialCursor);
  // Stores the pointer for the next page.
  // If this becomes null/undefined, we stop fetching.

  const [isLoading, setIsLoading] = useState(false);
  // Tracks whether a fetch request is currently in progress.
  // Prevents duplicate API calls.

  const sentinelRef = useRef(null);
  // Points to the invisible div at the bottom of the list.
  // This is the element IntersectionObserver watches.

  const fetchNextPage = useCallback(async () => {
    // Wrapped in useCallback so the function reference
    // does not change unnecessarily across renders.
    // This prevents unnecessary observer re-creation.

    if (isLoading || !cursor) return;
    // Guard clause:
    // - If already loading, do nothing.
    // - If no cursor exists, it means no more pages.

    setIsLoading(true);
    // Set loading state before making API call.

    try {
      const res = await fetch(`/api/posts?cursor=${cursor}&limit=10`);
      // Fetch next page using cursor-based pagination.

      const data = await res.json();
      // Parse response JSON.
      // Expected shape: { items: [], nextCursor: "..." }

      setPosts((prev) => [...prev, ...data.items]);
      // Append new items to existing posts array.
      // Manual merging (TanStack does this automatically).

      setCursor(data.nextCursor);
      // Store new cursor for next page.
      // If nextCursor is undefined → no more pages.
    } catch (err) {
      console.error("Fetch failed", err);
      // Basic error handling.
    } finally {
      setIsLoading(false);
      // Always reset loading state.
    }
  }, [cursor, isLoading]);
  // Recreate fetchNextPage only if cursor or loading changes.

  useEffect(() => {
    // Responsible for setting up IntersectionObserver.
    // Runs whenever fetchNextPage or isLoading changes.

    const target = sentinelRef.current;
    // Get the actual DOM element from the ref.

    if (!target) return;
    // If ref not attached yet, exit safely.

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        // IntersectionObserver gives an array of observed entries.

        if (firstEntry.isIntersecting && !isLoading) {
          // Trigger only if:
          // - Sentinel is visible in viewport
          // - Not already loading

          fetchNextPage();
          // Fetch next batch of posts.
        }
      },
      {
        rootMargin: "400px",
        // Starts triggering 400px before reaching bottom.
        // Improves perceived performance by preloading earlier.

        threshold: 0.1,
        // Trigger when 10% of sentinel is visible.
      },
    );

    observer.observe(target);
    // Start observing the sentinel element.

    return () => {
      // Cleanup function (very important in interviews).
      // Prevents memory leaks and duplicate observers.

      if (target) observer.unobserve(target);
      // Stop observing this specific element.

      observer.disconnect();
      // Fully disconnect observer instance.
    };
  }, [fetchNextPage, isLoading]);
  // Re-run effect if fetch function or loading state changes.

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card"
          style={{ height: "300px", border: "1px solid #ccc" }}
        >
          <h3>{post.title}</h3>
        </div>
      ))}
      // Render all accumulated posts. // Unlike paginated UI, we continuously
      append.
      <div
        ref={sentinelRef}
        className="loading-trigger"
        style={{ height: "50px", background: "transparent" }}
      >
        {isLoading && "Loading more memes..."}
        // Show loading message while fetching.
        {!cursor && "You've reached the end!"}
        // If cursor is null/undefined, show end message.
      </div>
      // This invisible div is the trigger element. // When it enters viewport,
      IntersectionObserver fires.
    </div>
  );
}

/*
Key Differences From TanStack Version:

1. We manually store and merge posts.
2. We manually track loading state.
3. We manually track cursor.
4. No automatic caching across components.
5. No automatic stale handling or background refetch.
6. We must handle cleanup ourselves.

This version gives full control but more responsibility.
TanStack version abstracts most of this complexity away.
*/
