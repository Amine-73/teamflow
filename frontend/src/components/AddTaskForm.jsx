import { useState } from "react";
import { createTask } from "../services/taskServices";



function AddTaskForm({onTaskCreated}){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [status,setStatus]=useState("to-do");
    const [priority,setPriority]=useState("medium");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("")
    
    const handleSubmit=async (event)=>{
        event.preventDefault();
        setLoading(true);
        setError("");
        const newTask={
            title,
            description,
            status,
            priority
        };

        try {
            // Your fetch() request here
            
            const createdTask=await createTask(newTask)
            onTaskCreated(createdTask)
            
            setTitle("");
            setDescription("");
            setStatus("to-do")
            setPriority("medium")
        } catch (error) {
            setError(error.message)
            console.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>Create a New Task</h2>
                <p>Add a task to your team's workspace.</p>
            </div>

            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter task title..."
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe your task..."
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="to-do">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
            </button>
        </form>
    )
}

export default AddTaskForm;