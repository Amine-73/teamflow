import { useState } from "react";

function EditTaskForm({ task, onSave, onCancel }){
    const [title,setTitle]=useState(task.title);
    const [description,setDescription]=useState(task.description || "")

    const handleSubmit=(event)=>{
        event.preventDefault();
        const updatedForm={
        title,
        description
        }
        onSave(task._id,updatedForm)
    }
    

    return(
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={title}  onChange={(e)=>setTitle(e.target.value)} required/>
            <textarea name="" id="" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )

}

export default EditTaskForm;