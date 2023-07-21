import styles from './task.module.css'
import { TbTrash } from 'react-icons/tb';
import { BsCheckLg, BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai'
import { useState } from 'react';

export function Task({ task, onComplete, onDelete, editTaskTitle }) {
    const [editMode, setEditMode] = useState(false)

    const handleBlur = (e) => {
        let payload = e.target.value
        if(payload == ""){payload = task.title}
        editTaskTitle(task.id, payload)
        setEditMode(false)
    }

    return (
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
            </button>

            <p className={task.isCompleted ? styles.textCompleted : ""}>
            {!editMode ? task.title : <input onBlur={handleBlur} placeholder={task.title} type="text"></input>}
            </p>

            <button className={styles.editButton}
                onClick={() => {
                    setEditMode(true)
                }}
            >
                <AiOutlineEdit size={20} />
            </button>
            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <TbTrash size={20} />
            </button>
        </div>
    )
}
