import { useState } from "react";
import _ from "lodash";

export const todoReducer = (state: any, action: any) => {
    const copy = _.cloneDeep(state)
    if (action.type === "INIT") {
        return action.payload;
    } else if (action.type === "ADD_TODO") {
        copy.push(action.payload)
        return copy;
    } else if (action.type === "UPDATE_TODO") {
        const {
            payload: { id, status }
        } = action;
        //or
        // const id = action.payload.id
        // const status = action.payload.status
        const updatedTodos = copy.map((todo: any) =>
            todo.id === id ? { ...todo, status } : todo
        );
        return updatedTodos;

        //this way mutates original state (which is dangerous)
        // for(let i = 0; i < state.length; i++) {
        //     const todo = state[i]
        //     if(todo.id === id) {
        //         todo.status = status;
        //         break;
        //     }
        // }
        // return state;
    } else if (action.type === "DELETE_TODO") {
        return copy.filter((todo: any) => todo.id !== action.payload.id);
    }
};

// const useMyReducer = (reducer: any, initialState: any) => {
//     const [state, setState] = useState(initialState);

//     const dispatch = (action: any) => {
//         const newState = reducer(state, action);
//         setState(newState);
//     };
//     return [state, dispatch];
// };
