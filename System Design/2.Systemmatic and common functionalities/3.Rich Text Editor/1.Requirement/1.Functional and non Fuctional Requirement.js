/**
WYSIWYG Editor – Frontend System Design
Scope: Purely Frontend Perspective


=========================
1. Functional Requirements
=========================

What type of editor is required?
- Basic rich text (bold, italic, underline, lists)
- Advanced features (tables, images, links, code blocks)

Is the editor single-user or collaborative (real-time multi-user)?

Should the content reflect changes instantly while typing (true WYSIWYG),
or only after save / preview?

How will formatting be applied?
- Toolbar buttons
- Keyboard shortcuts
- Context menus

What content output format is required?
- HTML
- Markdown
- Structured JSON (editor schema)

Is undo / redo required?
If yes, is there any limit on history depth?

How should copy-paste behave?
- Preserve external formatting
- Sanitize pasted content

Is image support required?
- Upload
- Resize
- Drag and drop
- Alignment options

Are advanced features needed?
- Mentions (@user)
- Comments
- Highlights

Should the editor support autosave or draft persistence?

Are there constraints on maximum document size or content length?


=============================
2. Non-Functional Requirements
=============================

Performance requirements:
- Typing latency expectations
- Handling large documents without lag

Browser and device support:
- Modern browsers only
- Mobile / tablet support

Accessibility requirements:
- Keyboard navigation
- Screen reader support
- Proper ARIA roles

Reliability:
- Editor state should not break on refresh
- Safe recovery from crashes

Scalability (frontend perspective):
- Reusability across multiple pages or applications

Security considerations:
- XSS prevention
- Sanitization before rendering user content

Extensibility:
- Ability to add new formatting tools easily

Theming and customization:
- Dark mode
- Custom fonts and colors

Offline support:
- Can users continue editing without internet?

Internationalization:
- Unicode support
- RTL language support


=========================
3. Smart Interview Notes
=========================

I will focus primarily on frontend trade-offs such as
editor state management, DOM handling, performance,
accessibility, and extensibility rather than backend persistence.


=========================
4. Key Clarification Question
=========================

Are we allowed to use existing editor libraries
(Slate, ProseMirror, Quill),
or do we need to build directly on top of contenteditable?
*/
