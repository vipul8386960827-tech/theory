/* 120_use_of_ownprops_in_mapstate_and_mapdispatch.js */

/*
=====================================
Use of ownProps in mapStateToProps and mapDispatchToProps
=====================================

Definition:
- `ownProps` is the second argument received by `mapStateToProps` or `mapDispatchToProps` 
  when using React Redux's `connect`.
- It represents the props passed to the component from its parent.

-------------------------------------
Why Use ownProps:
-------------------------------------
1. Accessing Component Props in State Mapping
   - You can select specific slices of state based on component props.

   Example:
   const mapStateToProps = (state, ownProps) => {
     return {
       todo: state.todos.find(todo => todo.id === ownProps.todoId)
     };
   };

2. Accessing Component Props in Dispatch Mapping
   - You can customize dispatched actions using component props.

   Example:
   const mapDispatchToProps = (dispatch, ownProps) => {
     return {
       deleteTodo: () => dispatch(deleteTodoAction(ownProps.todoId))
     };
   };

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of `ownProps` like a **VIP pass** a guest brings to an event:
  - The event organizers (Redux) can give personalized service (state/actions)
    based on that pass.
  - Without the pass, you get generic treatment.

-------------------------------------
Best Practices:
-------------------------------------
- Use `ownProps` when the state or action depends on a component-specific prop.
- Avoid overusing it to prevent tight coupling between Redux state and component props.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can `ownProps` be used with hooks like `useSelector`?  
A1: No, `ownProps` is specific to the `connect` HOC. With hooks, you pass props 
    directly to selectors or action dispatchers.

Q2: Is `ownProps` mandatory?  
A2: No, it’s optional. Only use it when needed.

Q3: Can you use both mapStateToProps and mapDispatchToProps with ownProps simultaneously?  
A3: Yes, both functions can access the same `ownProps` for dynamic behavior.

Q4: What is the performance concern with using ownProps?  
A4: If the component re-renders frequently and ownProps changes often, it can 
    trigger unnecessary re-rendering in connected components.
*/
