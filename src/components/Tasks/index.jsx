// Get our task component to render each todo
import { Task } from '../Task';
import styles from './tasks.module.css';

export function Tasks({ tasks, onComplete, onDelete }) {
    const taskQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Create Tasks</p>
                    <span>{taskQuantity}</span>
                </div>
                
                <div> 
                    <p className={styles.textPurple}>Completed</p> {// Show completed tasks
}
                    <span>{completedTasks} of {taskQuantity}</span>
                </div>
            </header>     
            {  // Loop through and render each task
            }
            <div className={styles.list}>
                {tasks.map(task => (
                    <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete}/>
                ))}
            </div>
        </section>
    )
}