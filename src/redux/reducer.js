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
            return state.filter(item => item.id !== action.payload);
        },
        // Updating Todo
        updateTodos: (state, action) => {
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        item: action.payload.item
                    }
                }
                return todo;
            })
        }
    }
});

export const { addTodos, removeTodos, updateTodos } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;