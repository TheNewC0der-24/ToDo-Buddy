import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Adding Todo
        addTodos: (state, action) => {
            state.push(action.payload);
            return state;
        },
        // Deleting Todo
        removeTodos: (state, action) => {
            state.filter(item => item.id !== action.payload);
        }
    }
});

export const { addTodos, removeTodos } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;