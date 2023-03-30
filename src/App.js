import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTaskAdd = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredTasks =
    filterType === "all"
      ? tasks
      : filterType === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleTaskAdd} class="learn-more">
          <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
          </span>
          <span class="button-text">Add Task</span>
        </button>
      </div>
      <div className="filters">
        <button value="all" onClick={handleFilterChange}>
          All
        </button>
        <button value="active" onClick={handleFilterChange}>
          Active
        </button>
        <button value="completed" onClick={handleFilterChange}>
          Completed
        </button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <div className="clear-all">
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      )}
    </div>
  );
}

export default App;
