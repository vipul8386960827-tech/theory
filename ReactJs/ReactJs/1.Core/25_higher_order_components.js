/*
Higher-Order Components (HOC) in React – Interview-Ready Answer:

"A Higher-Order Component (HOC) is a pattern in React where a function takes a component 
as input and returns a new enhanced component. HOCs allow you to reuse component logic 
across multiple components without repeating code."

Key Points:

1️⃣ Purpose:
- Reuse logic across components.
- Add additional props, behavior, or state to existing components.
- Do not modify the original component; instead, return a new wrapper component.

2️⃣ How it Works:
- HOC is a function: `const EnhancedComponent = hoc(OriginalComponent)`
- The HOC can:
  - Add new props.
  - Inject state or lifecycle logic.
  - Wrap the original component with additional UI.

3️⃣ Real-life Analogies:

- Global Analogy: A chef (HOC) takes a raw ingredient (component) and enhances it with 
  seasoning, making it ready to serve.
- India-specific Analogy: A tailoring shop (HOC) takes a plain shirt (component) and customizes 
  it with embroidery, buttons, and fit adjustments.
- Web Analogy: Authentication HOC wraps a page component to check if the user is logged in 
  before rendering the page.

4️⃣ Coding Example:

// HOC that adds a loading indicator
function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <Component {...props} />;
    };
}

// Original component
function DataList({ data }) {
    return (
        <ul>
            {data.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

// Enhanced component
const DataListWithLoading = withLoading(DataList);

// Usage
// <DataListWithLoading isLoading={true} data={['A','B','C']} />

// In this example:
// - withLoading HOC wraps DataList
// - If isLoading is true, a loading indicator is shown
// - Otherwise, the original DataList is rendered

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can HOCs modify the original component?  
A1: No, HOCs create a new component and leave the original intact.

Q2: Are HOCs similar to React Hooks?  
A2: Both are used to share logic, but HOCs wrap components, while Hooks use functions.

Q3: Can you compose multiple HOCs?  
A3: Yes, you can wrap a component with multiple HOCs: `hoc1(hoc2(Component))`.

Q4: Are HOCs still recommended in modern React?  
A4: Hooks and custom hooks are often preferred now, but HOCs are still valid for certain patterns.

Q5: Can HOCs work with functional and class components?  
A5: Yes, HOCs can wrap both functional and class components.
*/
