import React from "react";
import "../styles/task.css";

const Task = ({ task, onComplete, onDelete, onEdit }) => {
  return (
    <article className={`task-box ${task.completed ? "completed" : ""}`}>
      {/* Style changes if the task is complete */}
      <p className="task-details">{task.text}</p>
      <nav className="task-buttons" aria-label="Task Actions">
        <button
          aria-label="Complete Task"
          className="complete-btn"
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button
          aria-label="Edit Task"
          className="edit-btn"
          onClick={() => onEdit(task.id)}
          disabled={task.completed}
        >
          Edit
        </button>
        <button
          aria-label="Delete Task"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </nav>
    </article>
  );
};

export default Task;
