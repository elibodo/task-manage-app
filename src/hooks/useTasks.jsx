import { useState, useEffect } from "react";

export const useTasks = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeFilter, setActiveFilter] = useState("all");

  // Sets the state of tasks from localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add or update a task
  // If an ID is provided, it updates the task with that ID; otherwise, it adds a new task
  const addOrUpdateTask = (text, id = null) => {
    const newTask = {
      id: id || Date.now(), // Used to generate an ID
      text,
      completed: false,
    };

    if (id) {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text } : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
  };

  // Function to toggle the completion status of a task by its ID
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task by its ID
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Filter tasks based on the active filter
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "pending") return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    activeFilter,
    setActiveFilter,
    addOrUpdateTask,
    toggleTaskCompletion,
    deleteTask,
  };
};
