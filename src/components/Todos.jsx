import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodos } from '../redux/reducer';

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
    }
    console.log('props from store: ', props);

    return (
        <div className='addTodos'>
            <input
                type="text"
                onChange={(e) => handleChange(e)}
                className='todo-input'
            />
            <button className='add-btn'>Add</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);