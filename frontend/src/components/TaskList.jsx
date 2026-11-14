function TaskList({tasks=[],deleteTask,oneUpdatedTask,onUpdatePriority,onEditTask,deletingTaskId}){ 
    
    return(
        <section className="task-list">
            <h2>My Tasks</h2>

            <ul className="tasks">
                {tasks.map((e) => (
                    <li className="task-card" key={e._id}>
                        <div className="task-card-header">
                        <h3>{e.title}</h3>
                        <span className={`status-badge ${e.status}`}>
                            {e.status}
                        </span>
                        </div>
                        <div className="task-card-details">
                        <p>{e.description}</p>
                        <p>Priority: <span className={`priority-badge ${e.priority}`}>
                            {e.priority}
                        </span></p></div>
                        <div className="task-card-actions">
                        
                        <label htmlFor={`status-${e._id}`}>Status: </label>

                        <select
                            id={`status-${e._id}`}
                            value={e.status}
                            onChange={(event) =>
                                oneUpdatedTask(e._id, event.target.value)
                            }
                        >
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        
                        
                        <label htmlFor={`priority-${e._id}`}>Priority: </label>

                        <select
                            id={`priority-${e._id}`}
                            value={e.priority}
                            onChange={(event) =>
                                onUpdatePriority(e._id, event.target.value)
                            }
                        >
                            <option value="high">high</option>
                            <option value="medium">medium</option>
                            <option value="low">low</option>
                        </select>
                        
                        <button
                            className="edit-btn"
                            onClick={() => onEditTask(e)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            disabled={deletingTaskId===e._id}
                            onClick={() => deleteTask(e._id)}
                        >
                            {deletingTaskId ===e._id ? "Deleting..." : "Delete"}
                        </button>
                        </div>

                    </li>
                ))}
            </ul>
        </section>
    )
}

export default TaskList;