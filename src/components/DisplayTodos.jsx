import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { connect } from 'react-redux';
import { initializeTodos, addTodos, removeTodos, updateTodos, completeTodos } from '../redux/reducer';

import TodoItem from './TodoItem';

import { getStoredTodosFromLocalStorage } from "../utils/getStoredTodosFromLocalStorage";

const mapStateToProps = (state) => {
    return {
        todos: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeTodos: (todos) => dispatch(initializeTodos(todos)),
        addTodo: (obj) => dispatch(addTodos(obj)),
        removeTodo: (id) => dispatch(removeTodos(id)),
        updateTodo: (obj) => dispatch(updateTodos(obj)),
        completeTodo: (id) => dispatch(completeTodos(id))
    };
};

const DisplayTodos = (props) => {

    const [sort, setSort] = useState("active");

    const storedTodos = getStoredTodosFromLocalStorage();

    useEffect(() => {
        props.initializeTodos(storedTodos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="displaytodos">
            <div className="buttons">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSort("active")}>
                    Active
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSort("completed")}>
                    Complete
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSort("all")}>
                    All
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSort("status")}>
                    Status
                </motion.button>
            </div>

            {
                sort === "status" && (
                    <React.Fragment>
                        <motion.div
                            className="status-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <h3>
                                {
                                    props.todos.length === 0
                                        ? "No Todos"
                                        : `You have ${props.todos.length} total ${props.todos.length === 1 ? "todo" : "todos"}`
                                }
                            </h3>
                        </motion.div>
                        <motion.div
                            className="status-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <h3>
                                {
                                    props.todos.filter((todo) => todo.completed === false).length === 0
                                        ? "No Active Todos"
                                        : `You have ${props.todos.filter((todo) => todo.completed === false).length} active ${props.todos.filter((todo) => todo.completed === false).length === 1 ? "todo" : "todos"}`
                                }
                            </h3>
                        </motion.div>
                        <motion.div
                            className="status-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <h3>
                                {
                                    props.todos.filter((todo) => todo.completed === true).length === 0
                                        ? "No Completed Todos"
                                        : `You have ${props.todos.filter((todo) => todo.completed === true).length} completed ${props.todos.filter((todo) => todo.completed === true).length === 1 ? "todo" : "todos"}`
                                }
                            </h3>
                        </motion.div>
                    </React.Fragment>
                )
            }

            {sort === "active" && <h3 className='tab-heading'>Active Todos</h3>}
            {sort === "completed" && <h3 className='tab-heading'>Completed Todos</h3>}
            {sort === "all" && <h3 className='tab-heading'>All Todos</h3>}

            <ul>
                <AnimatePresence>
                    {/* FOR ACTIVE TODOS */}
                    {props.todos.length > 0 && sort === "active" ?
                        props.todos.map(item => {
                            return (
                                item.completed === false &&
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                />
                            )
                        }) : null}
                    {/* FOR COMPLETED TODOS */}
                    {props.todos.length > 0 && sort === "completed" ?
                        props.todos.map(item => {
                            return (
                                item.completed === true &&
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                />
                            )
                        }) : null}
                    {/* FOR ALL TODOS */}
                    {props.todos.length > 0 && sort === "all" ?
                        props.todos.map(item => {
                            return (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                />
                            );
                        }) : null}
                    {/* FOR STATUS */}
                </AnimatePresence>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);