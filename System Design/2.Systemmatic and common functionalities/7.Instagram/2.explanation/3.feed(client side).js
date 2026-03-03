"use client"; // Next.js directive to ensure this runs only in the browser

import { useInfiniteQuery } from "@tanstack/react-query"; // [TanStack] The core hook for infinite scrolling
import { useInView } from "react-intersection-observer"; // [UI] Hook to detect if an element is visible on screen
import { useEffect } from "react"; // [React] Standard hook to handle side effects

export default function FeedList() {
  // [UI] ref: Attach this to the "Sentinel" div at the bottom
  // [UI] inView: Boolean that becomes true when that div enters the viewport
  const { ref, inView } = useInView();

  // [TanStack] data: Object containing all fetched pages
  // [TanStack] fetchNextPage: Function to trigger the next API call
  // [TanStack] hasNextPage: Boolean based on whether getNextPageParam returned a value or undefined
  // [TanStack] isFetchingNextPage: Boolean that is true while the next page is loading
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      // [TanStack] Unique key to identify this specific query in the global cache
      queryKey: ["posts"],

      // [TanStack] The actual function that runs the API request
      // pageParam: This is the "Baton" passed from one page to the next
      queryFn: async ({ pageParam }) => {
        const res = await fetch(`/api/posts?cursor=${pageParam}&limit=10`);
        return res.json(); // Returns the API response (usually { items: [], nextCursor: "" })
      },

      // [TanStack] The value used for the VERY FIRST API call (usually null or 1)
      initialPageParam: null,

      // [TanStack] The "Mapping Logic": Tell TanStack how to find the next cursor
      // lastPage: The JSON response from the fetch we just finished
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  // [Logic] This effect "listens" to the scroll position
  useEffect(() => {
    // If the user sees the bottom (inView)
    // AND there is actually a next page (hasNextPage)
    // AND we aren't already in the middle of a fetch (!isFetchingNextPage)
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // Trigger the TanStack function to get more data
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="feed-container">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.items.map((post, itemIndex) => {
            // We want to trigger when the 12th item of the LAST loaded page is seen
            // If we have 3 pages loaded, we only care about the 12th item of Page 3
            const isLastPage = pageIndex === data.pages.length - 1;
            const isTriggerItem = isLastPage && itemIndex === 11;

            return (
              <div
                key={post.id}
                ref={isTriggerItem ? ref : null}
                className="post-card"
              >
                <h3>{post.title}</h3>
              </div>
            );
          })}
        </div>
      ))}

      {/* We keep this only for the initial load or a fallback, 
        but the 'ref' is now doing the heavy lifting above.
      */}
      {isFetchingNextPage && <div className="spinner">Prefetching...</div>}

      {/* [UI] THE SENTINEL: This div is what the 'useInView' hook is watching */}
      <div ref={ref} className="loading-zone">
        {/* [UI] Dynamic text based on the current state of the fetch */}
        {isFetchingNextPage
          ? "Loading more memes..."
          : hasNextPage
            ? "Scroll for more"
            : "End of feed"}
      </div>
    </div>
  );
}

/*
This component implements an infinite scrolling feed using cursor-based pagination.

The main objective is to automatically load more posts as the user scrolls,
without requiring a “Load More” button. It achieves this using two key concepts:
1) useInfiniteQuery for paginated data fetching and caching.
2) Intersection Observer for efficient scroll detection.

Instead of traditional page-number pagination (page=1, page=2, etc.),
this implementation uses cursor-based pagination. The first API call starts
with a null (or initial) cursor. The backend response includes:
- items → the list of posts for that page
- nextCursor → a pointer used to fetch the next set of posts

If nextCursor is undefined, it indicates there are no more pages to fetch.
This approach is more reliable for dynamic feeds because it avoids
issues like skipped or duplicated records when new data is inserted.

useInfiniteQuery internally manages:
- Accumulating multiple pages in data.pages
- Passing the correct cursor to the next request
- Tracking whether another page exists (hasNextPage)
- Handling loading states (isFetchingNextPage)
- Caching previously fetched data

All fetched pages are stored in an array. While rendering,
we loop through each page and then each item inside the page.
This ensures previously loaded content remains visible,
and new content is appended seamlessly at the bottom.

For scroll detection, instead of attaching manual scroll listeners
(which can cause performance issues due to continuous event firing),
we use the browser’s IntersectionObserver API through useInView.

A sentinel element is placed near the bottom of the feed.
When this element enters the viewport, a boolean flag becomes true.
A side effect listens to this flag and triggers the next page fetch.

Before triggering the fetch, we ensure:
- The sentinel is visible.
- There is another page available.
- A fetch is not already in progress.

These checks prevent duplicate API calls, race conditions,
and unnecessary network traffic.

While the next page is loading, a loading indicator is displayed
to improve user experience. When there are no more pages,
an “End of feed” message is shown.

Additionally, instead of attaching the observer to a static bottom div,
it can be attached to a specific item in the last loaded page.
This allows prefetching slightly before the user fully reaches the end,
making the scroll experience smoother and more responsive.

Overall, this implementation is scalable and production-ready.
It avoids manual state management for pagination,
reduces performance overhead by avoiding scroll listeners,
leverages built-in caching and background fetching,
and provides a smooth infinite scrolling experience.
*/