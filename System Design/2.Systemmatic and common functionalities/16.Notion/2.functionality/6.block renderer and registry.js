/*
===============================================================================
NOTION — BLOCK RENDERER + BLOCK REGISTRY
===============================================================================

1. ONE contentEditable PER BLOCK (not one for the whole page)
   - Isolation: a broken block can't corrupt the page.
   - Small re-renders: only the edited block updates.
   - Easy to drag, nest, and virtualize individual blocks.
   - Cost: selecting across blocks needs our own selection model (file 9).

2. BLOCK REGISTRY (open/closed principle)
   - Map: type → component. A new block type = add one entry.
   - Heavy types (code, math, database) are lazy-loaded.

3. RECURSIVE RENDERING
   - A block renders its own content, then its children with <Block id>.
*/

import React, { lazy, Suspense, memo } from "react";
import { useBlock } from "./3.normalized block store";
import { ErrorBoundary } from "react-error-boundary";

const registry = {
  text: TextBlock,
  heading_1: HeadingBlock,
  todo: TodoBlock,
  bulleted_list: BulletBlock,
  image: ImageBlock,
  page: PageLinkBlock,
  // heavy blocks → separate chunks, loaded only when a page uses them
  code: lazy(() => import("./blocks/CodeBlock")),       // syntax highlighter
  equation: lazy(() => import("./blocks/MathBlock")),   // KaTeX
  database: lazy(() => import("./blocks/DatabaseBlock")),
};

export const Block = memo(function Block({ id }) {
  const block = useBlock(id);             // subscribes to THIS block only
  if (!block || block.deleted) return null;

  const Component = registry[block.type] ?? UnsupportedBlock;

  return (
    // one error boundary per block → one bad block doesn't crash the page
    <ErrorBoundary fallback={<div role="alert">This block failed to load.</div>}>
      <div data-block-id={id} className="block">
        <Suspense fallback={<div className="block-skeleton" />}>
          <Component block={block} />
        </Suspense>

        {block.childIds.length > 0 && (
          <div className="block-children">
            {block.childIds.map((childId) => (
              <Block key={childId} id={childId} />
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
});

export function Page({ pageId }) {
  const page = useBlock(pageId);
  return (
    <main>
      <h1>{page.properties.title}</h1>
      {page.childIds.map((id) => <Block key={id} id={id} />)}
    </main>
  );
}

/*
Interview line:
"Each block is its own small editor, picked from a registry by type and
wrapped in its own error boundary. Heavy block types are code-split, so a page
with no code blocks never downloads a syntax highlighter."
*/
