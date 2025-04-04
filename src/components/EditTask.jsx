import React, { useState, useEffect } from "react";
import "../styles/edittask.css";

const EditTask = ({ isOpen, onClose, task, onSave }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // When the modal opens or the task changes, set state of task and error
  useEffect(() => {
    setText(task?.text || "");
    setError("");
  }, [task, isOpen]);

  // Saves the task and checks for empty input
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    onSave(text);
    setError("");
  };

  // Modal will not be displayed if isOpen is false
  if (!isOpen) return null;

  return (
    <section
      className={`modal-overlay ${isOpen ? "open" : ""}`}
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>{task ? "Edit Task" : "Add Task"}</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <textarea
            aria-label="Task Description"
            id="task-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task"
          />
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <footer className="modal-buttons">
            <button
              aria-label="Add / Update Task"
              className="save-button"
              type="submit"
            >
              {task ? "Update" : "Add"}
            </button>
            <button
              aria-label="Cancel"
              className="close-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
};

export default EditTask;
