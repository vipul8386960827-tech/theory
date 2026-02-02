// ToastEmitter.js
let listeners = [];

export const useToastEmitter = () => {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const callback = (toast) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 3000);
    };

    listeners.push(callback);

    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  }, []);

  return toasts;
};

export const emitToast = (toast) => {
  listeners.forEach((callback) => callback(toast));
};

/*  
===============================================================================
EXPLANATION OF ToastEmitterHook.js
===============================================================================

1. Purpose:
- This file implements a **global toast system without Context or Redux**.
- It uses a **custom hook** (`useToastEmitter`) combined with a **shared listener array** (`listeners`) to allow any component to trigger toasts globally.

2. listeners array:
- `let listeners = []` is a **global array** that stores callback functions.
- Each callback is a function that can update a component’s state with new toasts.
- It allows any component that imports `emitToast` to trigger toasts by calling all registered callbacks.

3. useToastEmitter hook:
- This hook is used inside the **ToastContainer component**.
- It maintains **local state `toasts`** for all active toasts.
- `useEffect` registers a callback in the global `listeners` array.
  - The callback adds a new toast to state with a unique ID.
  - A `setTimeout` removes the toast after `toast.duration` (default 3s).
- The hook **returns the current list of toasts**, so `ToastContainer` can render them.

4. emitToast function:
- `emitToast(toast)` is exported for use anywhere in the app.
- It loops through all registered callbacks in `listeners` and calls them with the toast data.
- This **triggers a toast in all components using the hook** (usually just the ToastContainer).

5. Why we need this:
- Avoids **prop drilling** or **Context/Redux**.
- Centralizes toast management.
- Allows **any component to trigger a toast** while keeping the rendering logic only in the ToastContainer.
- Keeps code modular and reusable.
- Automatically handles **toast removal after duration**.

6. Flow Summary:
- Any component calls `emitToast({ message, type })`.
- The callback in `listeners` (registered via `useToastEmitter`) is executed.
- Toast gets added to state with unique ID.
- ToastContainer re-renders with new toast.
- After duration, toast is removed from state automatically.

===============================================================================
*/
