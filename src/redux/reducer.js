import { createSlice } from "@reduxjs/toolkit";

import { storeTodosInLocalStorage } from "../utils/storeTodosInLocalStorage";
import { getStoredTodosFromLocalStorage } from "../utils/getStoredTodosFromLocalStorage";

const initialState = getStoredTodosFromLocalStorage();

const addTodoReducer = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initializeTodos: (state, action) => {
            return action.payload;
        },
        // Adding Todo
        addTodos: (state, action) => {
            state.push(action.payload);
            storeTodosInLocalStorage(state);
            return state;
        },
        // Deleting Todo
        removeTodos: (state, action) => {
            const removedState = state.filter(item => item.id !== action.payload);
            storeTodosInLocalStorage(removedState);
            return removedState;
        },
        // Updating Todo
        updateTodos: (state, action) => {
            const updatedState = state.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        item: action.payload.item
                    };
                }
                return todo;
            });
            storeTodosInLocalStorage(updatedState);
            return updatedState;
        },
        // Completed Todo
        completeTodos: (state, action) => {
            const completedState = state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });
            storeTodosInLocalStorage(completedState);
            return completedState;
        }
    }
});

export const { initializeTodos, addTodos, removeTodos, updateTodos, completeTodos } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;