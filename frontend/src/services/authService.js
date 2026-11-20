
const API_URL = import.meta.env.VITE_API_URL;



export const registerUser=async(userData)=>{

        const response=await fetch(`${API_URL}/auth/register`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        if(!response.ok){
            throw new Error (`register failed ${response.status}`)
        }
        const result =await response.json()
        return result.data
    
}

export const loginUser=async (credentials)=>{
    const response=await fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    const result =await response.json();

    if(!response.ok){
        throw new Error (`Login failed ${response.status}`)
    }
    return result.data;
}



// {
//   "username": "User A",
//   "email": "usera@test.com",
//   "password": "Test123456!"
// }