"use client"
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  // Add a new task
  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle("");
    setDesc("");
  };

  // Delete task
  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  // Toggle complete / undo
  const toggleHandler = (i) => {
    let copytask = [...mainTask];
    copytask[i].completed = !copytask[i].completed;
    setMainTask(copytask);
  };

  // Render tasks
  let renderTask = <h2>No task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="task-item">
          <div className={`task-info ${t.completed ? "completed" : ""}`}>
            <h5>{t.title}</h5>
            <h6>{t.desc}</h6>
          </div>

          <div className="buttons">
            <button onClick={() => toggleHandler(i)} className="btncomplete">
              {t.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteHandler(i)} className="btn delete">
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="header">My Todo-List</h1>

      {/* Form */}
      <form onSubmit={submitHandler} className="task-form">
        <input
          type="text"
          placeholder="Enter task here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="btn add">Add Task</button>
      </form>

      <hr />

      {/* Task List */}
      <div className="task-list">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
