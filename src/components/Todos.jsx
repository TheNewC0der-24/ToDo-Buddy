import React, { useState } from 'react';

const Todos = () => {

    const [todo, setTodo] = useState('');

    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    // console.log('ToDo Text: ', todo);

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

export default Todos;