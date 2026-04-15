import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"


function Dashboard() {
    const { user, logout } = useContext(AuthContext)
    const [loaded, setLoaded] = useState(false)
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    // Load tasks
    useEffect(() => {
        if (!user) return

        const savedTasks = localStorage.getItem(user.email + "_tasks")

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }

        setLoaded(true)   // 🔥 mark as loaded
    }, [user])
  
    // Save tasks
     useEffect(() => {
        if (!user || !loaded) return   // 🔥 prevent overwrite

        localStorage.setItem(user.email + "_tasks", JSON.stringify(tasks))
    }, [tasks, user, loaded])


    function addTask() {
        if (task.trim() === "") return

        setTasks([...tasks, task])
        setTask("")
    }

    function deleteTask(index) {
        const updated = tasks.filter((_, i) => i !== index)
        setTasks(updated)
    }

   return (
  <div className="dashboard">
    <h1>Dashboard</h1>
    <h3>Welcome, {user.name}</h3>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>

    <div className="task-input">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>
    </div>

    <div className="task-list">
      {tasks.map((t, index) => (
        <div className="task-card" key={index}>
          <span>{t}</span>
          <button onClick={() => deleteTask(index)}>❌</button>
        </div>
      ))}
    </div>
  </div>
)
}

export default Dashboard