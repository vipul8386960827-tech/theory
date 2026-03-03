"use client"; // Marks this as a Client Component in Next.js.

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FeedList() {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  /* =============================================
     1. SERVER-SENT EVENTS (SSE) - REAL-TIME SYNC
     ============================================= */
  useEffect(() => {
    // EventSource is a native browser API for unidirectional real-time streams.
    // It keeps a single HTTP connection open to the server.
    const eventSource = new EventSource("/api/posts/stream");

    // Listen for a specific event type from the server (e.g., 'like-update')
    eventSource.addEventListener("like-update", (event) => {
      // Parse the data sent from the server (Device A's action)
      const { postId, newLikeCount } = JSON.parse(event.data);

      // SORGICAL CACHE UPDATE:
      // We manually update Device B's cache so the like count changes without a refresh.
      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((post) =>
              post.id === postId 
                ? { ...post, likeCount: newLikeCount } // Update only the specific post
                : post
            ),
          })),
        };
      });
    });

    // CLEANUP: Close the connection when the component unmounts.
    // This is vital to prevent memory leaks and dangling connections.
    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  /* ===========================
     2. INFINITE DATA FETCHING
     =========================== */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(`/api/posts?cursor=${pageParam}&limit=10`);
        return res.json();
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  /* ===========================
     3. OPTIMISTIC LIKE MUTATION
     =========================== */
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (postId) => {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to update like");
      return res.json();
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => {
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
                    likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
                  }
                : post,
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (err, postId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },

    onSettled: () => {
      // We invalidate to make sure our local "Optimistic" count 
      // is perfectly in sync with the server's final count.
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  /* ===========================
     4. SCROLL TRIGGER
     =========================== */
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* ===========================
     5. RENDER UI
     =========================== */
  return (
    <div className="feed-container" style={{ padding: "20px" }}>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.items.map((post, itemIndex) => {
            const isLastPage = pageIndex === data.pages.length - 1;
            const isTriggerItem = isLastPage && itemIndex === 11;

            return (
              <div
                key={post.id}
                ref={isTriggerItem ? ref : null}
                className="post-card"
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  margin: "10px 0",
                  borderRadius: "8px",
                }}
              >
                <h3>{post.title}</h3>

                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: post.liked ? "red" : "gray",
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

      <div
        ref={ref}
        className="loading-zone"
        style={{ textAlign: "center", padding: "20px" }}
      >
        {isFetchingNextPage ? (
          <div className="spinner">Prefetching next page...</div>
        ) : hasNextPage ? (
          "Scroll for more"
        ) : (
          "End of feed"
        )}
      </div>
    </div>
  );
}