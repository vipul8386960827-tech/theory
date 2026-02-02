/*  
===============================================================================
FRONTEND SYSTEM DESIGN — LIFTING STATE vs COLOCATING STATE  
(CRISP, INTERVIEW-READY, ONLY WHAT THE INTERVIEWER WANTS TO HEAR)
===============================================================================

###############################
# 1. WHAT IS COLOCATING STATE?
###############################
Colocating state = **keeping state as close as possible to the component that
actually uses it**.

Meaning:
- Put state inside the component where it is directly needed.
- Avoid putting it too high in the component tree.

Examples:
- Input field value managed inside the Input component.
- Accordion open/close state inside Accordion component.
- Local dropdown selection stored inside Dropdown component.

Good line for interview:
- “I colocate state by default. State should live at the lowest possible level 
   where it is used. This keeps components simpler, reduces unnecessary 
   re-renders, and improves maintainability.”


###############################
# 2. WHAT IS LIFTING STATE?
###############################
Lifting state = **moving state up to a parent component so multiple children 
can share it**.

When to lift:
- When two or more components need the same state.
- When user interaction in one component affects another component.
- When controlling a child component’s behavior from a parent.

Examples:
- Search filter in parent controlling a list component.
- Stepper component where steps need shared state.
- Sibling components needing access to the same form data.

Good line for interview:
- “I lift state only when multiple components need to share or coordinate the 
   same data. Lifting ensures a single source of truth.”


#############################################
# 3. KEY DIFFERENCE (SHORT & CLEAR)
#############################################

| Concept           | Colocating State                     | Lifting State                            |
|------------------|----------------------------------------|-------------------------------------------|
| State location    | Inside the closest component           | Moved up to parent                        |
| Purpose           | Simplicity + local control             | Shared behavior across components         |
| Use case          | Local UI logic                         | Sibling communication / shared logic      |
| Benefit           | Fewer re-renders, cleaner components   | One source of truth for multiple children |


#############################################
# 4. RULE OF THUMB (WHAT INTERVIEWER LOVES)
#############################################
- “Colocate by default, lift when necessary.”  
- “State should be as local as possible, and as global as needed.”  
- “Only lift state if multiple components must rely on the same value.”


#############################################
# 5. ONE-LINE SUMMARY FOR INTERVIEW
#############################################
“Colocating state keeps it closest to where it’s used.  
Lifting state moves it upwards so multiple components can share it.  
I colocate by default and lift only when components need a shared source of truth.”


#############################################
# 6. WHAT THE INTERVIEWER WANTS TO HEAR
#############################################
1. You prioritize **simplicity** → colocate first.  
2. You know **when** and **why** to lift state → shared state scenarios.  
3. You care about **re-render optimization**.  
4. You understand **clean data flow** from parent → child.  
5. You articulate the decision crisply and practically.

===============================================================================
END
===============================================================================
*/
