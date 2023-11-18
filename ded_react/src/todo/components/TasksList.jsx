import { useState } from "react";
import { useRef } from "react";
import { tasks as tasksData } from "../data/tasks";

export function TasksList() {

    const [tasks, setTasks] = useState([]);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleDeleteTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    const handleCompletedTasks = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    const handleAddNewTasks = () => {
        const newTasks = [...tasks];
        newTasks.push({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            completed: false
        });
        setTasks(newTasks);
    };


return (
    <>
    <p>
    <input type='text' id='title' ref={titleRef} />
    </p>
    <input type='text' id='title' ref={descriptionRef} />
    <button onClick={handleAddNewTasks}>+</button>
    {tasks.length === 0 ? (
        <div>Empty Tasks List</div>
        ) : (
        <ul>
            
            {tasks.map(({ title, description, completed }, index) => (
                    
                <li key={index} style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}>
                    <p> {title} <p/>
                    {description} </p>
                <button onClick={() => handleCompletedTasks(index)}>
                    {completed ? 'Undo' : 'Complete'}</button>
                <button onClick={() => handleDeleteTask(index)}>X</button>
                </li>
            ))}
        </ul>
        )
    }
    </>
    )
}