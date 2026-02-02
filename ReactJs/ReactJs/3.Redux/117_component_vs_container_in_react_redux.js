/* 117_component_vs_container_in_react_redux.js */

/*
=====================================
Component vs Container in React Redux
=====================================

Definition:
- **Component**: A presentational React component that is primarily concerned 
  with how things look. Receives data via props and triggers callbacks.
- **Container**: A React component connected to the Redux store. It handles 
  state, dispatches actions, and passes data down to presentational components.

-------------------------------------
Key Differences:
-------------------------------------

1. **Responsibility**
   - Component: Focused on UI rendering.
   - Container: Focused on managing state and logic.

2. **Data Source**
   - Component: Receives data via props.
   - Container: Accesses Redux store directly via `connect` or `useSelector`.

3. **Reusability**
   - Component: Highly reusable because it’s unaware of Redux.
   - Container: Less reusable as it’s tied to the Redux store.

4. **Location of Logic**
   - Component: Contains minimal or no logic.
   - Container: Contains business logic, side-effects handling (via dispatch).

5. **Example**
   - Component:
     ```js
     function TodoList({ todos, onAddTodo }) {
       return (
         <div>
           <ul>
             {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
           </ul>
           <button onClick={() => onAddTodo("New Task")}>Add Todo</button>
         </div>
       );
     }
     ```
   - Container:
     ```js
     import { connect } from "react-redux";
     import { addTodo } from "../redux/actions";
     import TodoList from "./TodoList";

     const mapStateToProps = (state) => ({
       todos: state.todos
     });

     const mapDispatchToProps = (dispatch) => ({
       onAddTodo: (text) => dispatch(addTodo(text))
     });

     export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
     ```

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Component = **Car Dashboard**: Shows speed, fuel, and controls; doesn’t know 
  where data comes from.
- Container = **Car Engine Management System**: Provides the data to the dashboard, 
  controls fuel injection, and updates speed info.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can a component become a container?  
A1: Yes, by connecting it to the Redux store via `connect` or using `useSelector` and `useDispatch`.

Q2: Why separate components and containers?  
A2: For better reusability, maintainability, and separation of concerns.

Q3: Can you use hooks instead of `connect` for containers?  
A3: Yes, `useSelector` and `useDispatch` can replace `connect` for functional components.

Q4: Are all containers class components?  
A4: No, functional components can also act as containers using hooks.
*/
