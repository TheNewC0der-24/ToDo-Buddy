import React, { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { notification } from 'antd';

const TodoItem = (props) => {
    const { item, updateTodo, removeTodo, completeTodo } = props;

    const inputRef = useRef(true);

    const changeFocus = () => {
        inputRef.current.disabled = false;
        inputRef.current.focus();

        notification.info({
            message: 'Info',
            description: 'Click enter to update',
            duration: 5,
            placement: 'bottomRight'
        })
    };

    const update = (id, value, e) => {
        if (e.which === 13) {
            // 13 is key code for enter key
            updateTodo({ id, item: value });
            inputRef.current.disabled = true;

            notification.success({
                message: 'Success',
                description: 'Todo edited successfully',
                placement: 'bottomRight'
            })
        }
    };

    return (
        <motion.li
            initial={{
                x: "150vw",
                transition: { type: "spring", duration: 2 }
            }}

            animate={{
                x: 0,
                transition: { type: "spring", duration: 2 }
            }}

            whileHover={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.2 }
            }}

            exit={{
                x: "-60vw",
                scale: [1, 0],
                transition: { duration: 0.5 },
                backgroundColor: "rgba(255,0,0,1)"
            }}

            key={item.id} className='card'>
            <textarea
                ref={inputRef}
                disabled={inputRef}
                defaultValue={item.item}
                onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
            />

            <div className="btns">
                <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changeFocus()}>
                    {" "}<AiFillEdit />{" "}
                </motion.button>

                {item.completed === false && (
                    <motion.button
                        whileHover={{ scale: 1.4 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ color: 'green' }}
                        onClick={() => {
                            completeTodo(item.id);
                            notification.success({
                                message: 'Success',
                                description: 'Todo marked as done successfully',
                                placement: 'bottomRight'
                            })
                        }}>
                        {" "}<IoCheckmarkDoneSharp />{" "}
                    </motion.button>
                )}
                <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ color: 'red' }}
                    onClick={() => {
                        removeTodo(item.id);
                        notification.success({
                            message: 'Success',
                            description: 'Todo deleted successfully',
                            placement: 'bottomRight'
                        })
                    }}>
                    {" "}<IoClose />{" "}
                </motion.button>{" "}
            </div>
            {item.completed && <span className="completed"> Done </span>}
        </motion.li>
    )
}

export default TodoItem