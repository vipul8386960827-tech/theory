/*
=========================================================
WHY I WOULD USE A WRAPPER FOR ANALYTICS
(Architectural Design Reasoning)
=========================================================

In a scalable frontend system, analytics is a cross-cutting concern.
It affects multiple components but does not belong to any one of them.

If I attach tracking logic directly inside every button or component:

- It tightly couples UI logic with analytics logic.
- It introduces repetition across the codebase.
- It increases the risk of inconsistent event structures.
- It makes future refactoring expensive and error-prone.

Instead, I would design a centralized wrapper layer
that captures user interactions at a higher level.

This approach allows:

1. Separation of concerns
   (UI components focus only on rendering and business logic.)

2. Event delegation
   (A single listener can handle interactions efficiently.)

3. Standardized event structure
   (All events pass through one controlled pipeline.)

4. Scalability
   (New components automatically become trackable without extra logic.)

5. Maintainability
   (Changes to analytics behavior are made in one place.)

Architecturally, this ensures the analytics system remains
clean, scalable, and easy to evolve as the application grows.
*/
