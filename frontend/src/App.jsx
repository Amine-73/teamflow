import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';
import { useState,useEffect } from 'react';
import { deleteTask, getTasks } from './services/taskServices';
import { updateTask } from './services/taskServices';






function App() {
  const [tasks,setTasks]=useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter,setStatusFilter]=useState("all");
  const [priorityFilter,setPriorityFilter]=useState("all");
  const [searchTerm,setSearchTerm]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("")
  const [deletingTaskId, setDeletingTaskId] = useState(null);


  const filterTasks=tasks.filter((task) =>{
    const matchesStatus = statusFilter==="all" ? task :  task.status===statusFilter;
    const matchesPriority = priorityFilter==="all" ? task : task.priority===priorityFilter;
    const matchesSearch =task.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesPriority && matchesSearch;
    });





  useEffect(()=>{
        const fetchTasks = async () => {
        setLoading(true);
        setError("");

        try {
            const allTask=await getTasks()
            setTasks(allTask)

        } catch (error) {
            setError(error.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    fetchTasks();
}, []);
 



    const handleTaskCreated = (createdTask) => {
    setTasks((previousTasks) => [
        createdTask,
        ...previousTasks
    ]);
    };





    const handleDeleteTask=async (id)=>{
        setDeletingTaskId(id);
      try {
        await deleteTask(id)
        setTasks((previousTasks) =>
            previousTasks.filter((task) => task._id !== id)
        );
      } catch (error) {
        setError(error.message)
        console.error(error.message);
      }finally{
        setDeletingTaskId(null)
      }
    }






    const handleUpdateStatus = async (id, newStatus) => {
    try {
        const updatedTask=await updateTask(id, { status: newStatus });
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
    } catch (error) {
        setError(error.message);
        console.error("Failed to update status:", error.message);
    }
  };






  const handleUpdatePriority = async (id, newPriority) => {
    try {
        const updatedPriority=await updateTask(id, { priority: newPriority });
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task._id === updatedPriority._id ? updatedPriority : task
            )
        );
    } catch (error) {
        setError(error.message);
        console.error("Failed to update priority:", error.message);
    }
  };








  const handleEditTask = async (id, updatedData) => {
    try {
        const updatedTask = await updateTask(id, updatedData);
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
        setEditingTask(null)
    } catch (error) {
        setError(error.message);
        console.error("Failed to edit task:", error.message);
    }
};

  const totalTasks=tasks.length;
  const inprogressTasks=(tasks.filter((e)=>(e.status==="in-progress"))).length;
  const completedTasks=(tasks.filter((e)=>(e.status==="done"))).length;

   

  return (
    <main className="dashboard">

        <header className="dashboard-header">
            <div>
                <h1>TeamFlow</h1>
                <p>Manage your team's work, all in one place.</p>
            </div>
        </header>

        <section className="dashboard-create">
            <AddTaskForm onTaskCreated={handleTaskCreated}/>
        </section>

      <section className="dashboard-stats">
        <div className="stat-card total-stat">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
        </div>

        <div className="stat-card progress-stat">
            <h3>In-progress Tasks</h3>
            <p>{inprogressTasks}</p>
        </div>

        <div className="stat-card completed-stat">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
        </div>
    </section>


      <div className="filter-toolbar">
            <div className="filter-group">
                <label htmlFor="status-filter">Status</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="all">All Tasks</option>
                    <option value="to-do">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="priority-filter">Priority</label>
                <select
                    id="priority-filter"
                    value={priorityFilter}
                    onChange={(event) => setPriorityFilter(event.target.value)}
                >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div className="filter-group search-group">
                <label htmlFor="task-search">Search tasks</label>
                <input
                    id="task-search"
                    type="text"
                    value={searchTerm}
                    placeholder="Search by task title..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </div>

        {loading && <p>Loading ...</p>}
        {error  && <p className="error-message">{error}</p>}
      <TaskList onEditTask={setEditingTask}
        tasks={filterTasks} 
        deleteTask={handleDeleteTask}
        deletingTaskId={deletingTaskId}
        oneUpdatedTask={handleUpdateStatus} 
        onUpdatePriority={handleUpdatePriority}/>
      {editingTask && (
          <EditTaskForm
              key={editingTask._id}
              task={editingTask}
              onSave={handleEditTask}
              onCancel={() => setEditingTask(null)}
          />
      )}
    </main>
  )
}

export default App
