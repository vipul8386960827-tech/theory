"use client";
// Marks this as a Client Component in Next.js.
// Required because we use React hooks and browser APIs.

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// useInfiniteQuery → Handles paginated fetching + caching.
// useMutation → Handles write operations (like button).
// useQueryClient → Lets us manually read/update/invalidate cache.

import { useInView } from "react-intersection-observer";
// Hook built on top of IntersectionObserver.
// Detects when an element enters the viewport.

import { useEffect } from "react";
// Used to trigger fetching when scroll condition is met.

export default function FeedList() {
  const queryClient = useQueryClient();
  // Gives access to TanStack Query's global cache.
  // We use this for optimistic updates and rollback.

  const { ref, inView } = useInView();
  // ref → attach to a DOM element.
  // inView → becomes true when that element is visible.

  /* ===========================
     1. INFINITE DATA FETCHING
     =========================== */

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      // Unique identifier for this query in cache.
      // All cached data for this feed is stored under this key.

      queryFn: async ({ pageParam }) => {
        // This function runs every time a page needs to be fetched.
        // pageParam is the cursor passed from getNextPageParam.
        const res = await fetch(`/api/posts?cursor=${pageParam}&limit=10`);
        return res.json();
      },

      initialPageParam: null,
      // The cursor used for the first request.

      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      // After each fetch, this decides:
      // - What the next cursor should be.
      // - If undefined → no more pages.
    });

  /* ===========================
     2. OPTIMISTIC LIKE MUTATION
     =========================== */

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (postId) => {
      // Actual API call to update like on server.
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to update like");
      return res.json();
    },

    onMutate: async (postId) => {
      // Runs immediately when user clicks like.
      // This is where optimistic UI happens.

      await queryClient.cancelQueries({ queryKey: ["posts"] });
      // Cancel ongoing fetches to prevent overwriting optimistic update.

      const previousData = queryClient.getQueryData(["posts"]);
      // Take a snapshot of current cached data.
      // Used for rollback if mutation fails.

      queryClient.setQueryData(["posts"], (old) => {
        // Manually modify cached data (optimistic update).
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    liked: !post.liked,
                    // Toggle heart state immediately.

                    likeCount: post.liked
                      ? post.likeCount - 1
                      : post.likeCount + 1,
                    // Update like count instantly.
                  }
                : post,
            ),
          })),
        };
      });

      return { previousData };
      // Pass snapshot to onError for rollback.
    },

    onError: (err, postId, context) => {
      // If server fails → rollback optimistic change.

      console.error("Rolling back like due to error:", err);

      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
        // Restore previous snapshot.
      }
    },

    onSettled: () => {
      // Runs after success or error.
      // Ensures UI eventually matches real server state.

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Refetch feed to sync with server.
    },
  });

  /* ===========================
     3. SCROLL TRIGGER
     =========================== */

  useEffect(() => {
    // When sentinel is visible,
    // and more pages exist,
    // and not already fetching,
    // then fetch next page.

    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* ===========================
     4. RENDER UI
     =========================== */

  return (
    <div className="feed-container" style={{ padding: "20px" }}>
      {data?.pages.map((page, pageIndex) => (
        // data.pages contains all fetched pages.
        // We loop through every page.

        <div key={pageIndex}>
          {page.items.map((post, itemIndex) => {
            // Loop through items inside each page.

            const isLastPage = pageIndex === data.pages.length - 1;
            // Check if this is the last loaded page.

            const isTriggerItem = isLastPage && itemIndex === 11;
            // Attach observer to 12th item of last page.
            // Prefetch slightly before reaching true bottom.

            return (
              <div
                key={post.id}
                ref={isTriggerItem ? ref : null}
                // Attach observer only to trigger item.
                className="post-card"
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  margin: "10px 0",
                  borderRadius: "8px",
                }}
              >
                <h3>{post.title}</h3>

                {/* LIKE BUTTON */}
                <button
                  onClick={() => toggleLike(post.id)}
                  // Clicking triggers optimistic mutation.
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: post.liked ? "red" : "gray",
                    // Dynamically changes color instantly.
                  }}
                >
                  {post.liked ? "❤️" : "🤍"}
                  <span style={{ color: "black" }}>{post.likeCount}</span>
                </button>
              </div>
            );
          })}
        </div>
      ))}

      {/* FOOTER STATUS SECTION */}

      <div
        ref={ref}
        className="loading-zone"
        style={{ textAlign: "center", padding: "20px" }}
      >
        {isFetchingNextPage ? (
          <div className="spinner">Prefetching next page...</div>
        ) : // Show spinner while loading next page.
        hasNextPage ? (
          "Scroll for more"
        ) : (
          // If more pages exist.
          "End of feed"
          // No more pages available.
        )}
      </div>
    </div>
  );
}
