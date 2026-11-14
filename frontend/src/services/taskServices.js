const API_URL = import.meta.env.VITE_API_URL;



export const getTasks = async () => {
    const response = await fetch(
        `${API_URL}/tasks`
    );

    if (!response.ok) {
        throw new Error(
            `Retrieve data failed: ${response.status}`
        );
    }

    const result = await response.json();


    return result.data;
};


export const createTask=async (newTask)=>{
    const response=await fetch(`${API_URL}/tasks`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newTask)
    })
    if(!response.ok){
        throw new Error (`Failed to add new Task ${response.status}`)
    }
    const tasks=await response.json();
    return tasks.data;
}


export const updateTask=async (id,updateTask)=>{
    const response=await fetch(`${API_URL}/tasks/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateTask),
    })

    if(!response.ok){
        throw new Error (`Failed to update task ${response.status}`)
    }
    const updatedData=await response.json();
    return updatedData.data;
}

export const deleteTask=async (id)=>{
    const response=await fetch(`${API_URL}/tasks/${id}`,{
        method:"DELETE",
    });
    if(!response.ok){
        throw new Error (`Failed to Delete task ${response.status}`)
    }
    
}