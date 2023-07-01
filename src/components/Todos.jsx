import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { connect } from 'react-redux';
import { addTodos } from '../redux/reducer';

import { GoPlus } from 'react-icons/go';

import { notification } from 'antd';

const mapStateToProps = (state) => {
    return {
        todos: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (obj) => dispatch(addTodos(obj))
    };
};

const Todos = (props) => {

    const [todo, setTodo] = useState('');

    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    // console.log('props from store: ', props);

    const add = () => {
        if (todo === "") {
            notification.error({
                message: 'Error',
                description: 'Please enter a ToDo',
                duration: 2,
                placement: 'bottomRight'
            });
        } else {
            props.addTodo({
                id: Math.floor(Math.random() * 1000),
                item: todo,
                completed: false
            })
            setTodo('');
            notification.success({
                message: 'Success',
                description: 'ToDo added successfully',
                duration: 2,
                placement: 'bottomRight'
            });
        }
    }

    return (
        <div className='addTodos'>
            <input
                type="text"
                className='todo-input'
                placeholder='Add a ToDo...'
                value={todo}
                onChange={(e) => handleChange(e)}
            />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='add-btn'
                onClick={() => add()}>
                <GoPlus />
            </motion.button>
            <br />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);