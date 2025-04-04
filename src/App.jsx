import React, { useState } from "react";
import "./styles/App.css";
import Task from "./components/Task";
import EditTask from "./components/EditTask";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    activeFilter,
    setActiveFilter,
    addOrUpdateTask,
    toggleTaskCompletion,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Opening and closing the modal
  const openModal = (id = null) => {
    setEditingIndex(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  // Saving/updating the task
  // Function is in the useTasks hook
  const handleSaveTask = (text) => {
    addOrUpdateTask(text, editingIndex);
    closeModal();
  };

  // Messages to show when there are no tasks for each filter
  const noTaskMessage = () => {
    if (activeFilter === "completed" && tasks.length === 0) {
      return <p className="message">No tasks complete</p>;
    }
    if (activeFilter === "pending" && tasks.length === 0) {
      return <p className="message">No tasks in progress</p>;
    }
    if (tasks.length === 0) {
      return (
        <p className="message">
          Click the "Add Task" button to start a new task
        </p>
      );
    }
    return null;
  };

  return (
    <main className="app">
      <h1>task-manage-app</h1>
      <section className="container">
        <section className="task-filters-wrapper">
          <header className="task-filters-header">
            <button aria-label="Add Task" onClick={() => openModal()}>
              Add Task
            </button>
            <div className="task-filters">
              <input
                aria-label="All Tasks"
                type="radio"
                name="filter"
                id="all-tasks"
                checked={activeFilter === "all"}
                onChange={() => setActiveFilter("all")}
              />
              <label htmlFor="all-tasks">All Tasks</label>
              <input
                aria-label="Pending Tasks"
                type="radio"
                name="filter"
                id="pending"
                checked={activeFilter === "pending"}
                onChange={() => setActiveFilter("pending")}
              />
              <label htmlFor="pending">Pending</label>
              <input
                aria-label="Completed Tasks"
                type="radio"
                name="filter"
                id="completed"
                checked={activeFilter === "completed"}
                onChange={() => setActiveFilter("completed")}
              />
              <label htmlFor="completed">Completed</label>
            </div>
          </header>
          {noTaskMessage()}
          <section className="task-list">
            {/* shows the most recent task added first */}
            {tasks
              .slice()
              .reverse()
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onComplete={toggleTaskCompletion}
                  onDelete={deleteTask}
                  onEdit={() => openModal(task.id)}
                />
              ))}
          </section>
        </section>
      </section>

      <EditTask
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        task={tasks.find((task) => task.id === editingIndex)}
      />
    </main>
  );
}

export default App;
