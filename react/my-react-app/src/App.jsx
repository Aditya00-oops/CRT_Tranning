
import { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Plan my priorities", category: "PERSONAL", done: false },
  { id: 2, title: "Review today's goals", category: "WORK", done: false },
  { id: 3, title: "Take a break and recharge", category: "LIFESTYLE", done: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const completed = tasks.filter((t) => t.done).length;
  const pending = tasks.length - completed;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTasks((prev) => [
      { id: crypto.randomUUID(), title: input.trim(), category: "PERSONAL", done: false },
      ...prev,
    ]);
    setInput("");
    setFilter("All");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, title: editText.trim() } : t)
    );
    setEditing(null);
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "Active") return !t.done;
    if (filter === "Completed") return t.done;
    return true;
  });

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-mark">✳</span>
          task<span>ora</span>
        </a>

        <p className="side-label">WORKSPACE</p>

        <button className="side-link active" onClick={() => setFilter("All")}>
          <span>▦</span> Overview
        </button>
        <button className="side-link" onClick={() => setFilter("Active")}>
          <span>◷</span> My tasks
          <span className="side-number">{pending}</span>
        </button>
        <button className="side-link" onClick={() => setFilter("Completed")}>
          <span>✓</span> Completed
        </button>

        <div className="sidebar-note">
          <div className="note-icon">✦</div>
          <h3>Small steps.</h3>
          <h3>Big progress.</h3>
          <p>Keep showing up for yourself. You've got this.</p>
          <div className="note-decoration">✳</div>
        </div>

        <div className="profile">
          <div className="avatar">A</div>
          <div className="profile-text">
            <strong>My workspace</strong>
            <span>Personal account</span>
          </div>
          <span className="profile-menu">•••</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span className="breadcrumb">Workspace <span>/</span> Overview</span>
          <div className="top-right">
            <span className="online"><i /> All systems ready</span>
            <div className="avatar top-avatar">A</div>
          </div>
        </header>

        <div className="content" id="home">
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span /> YOUR SPACE TO FOCUS</div>
              <h1>Make room for<br />what <span>matters.</span></h1>
              <p>Organize your day, clear your mind, and make progress one task at a time.</p>
              <a className="hero-link" href="#tasks">Explore your tasks <span>↘</span></a>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-glow" />
              <div className="hero-tile">✳</div>
              <div className="float-card float-top">✦ <span>Stay focused</span></div>
              <div className="float-card float-bottom"><span className="tiny-check">✓</span><div><b>You're doing great</b><small>One step at a time</small></div></div>
            </div>
          </section>

          <div className="section-intro">
            <div><span className="eyebrow plain">YOUR PROGRESS</span><h2>A little goes a long way.</h2></div>
            <span className="date-label">✧ &nbsp; YOUR PERSONAL DASHBOARD</span>
          </div>

          <section className="stats">
            <article className="stat-card">
              <div className="stat-heading"><span>Total tasks</span><span className="stat-icon violet">▤</span></div>
              <div className="stat-value">{tasks.length.toString().padStart(2, "0")}</div>
              <div className="stat-foot">Everything on your plate</div>
              <div className="stat-line violet-line" />
            </article>
            <article className="stat-card">
              <div className="stat-heading"><span>In progress</span><span className="stat-icon amber">◷</span></div>
              <div className="stat-value">{pending.toString().padStart(2, "0")}</div>
              <div className="stat-foot">Your next wins await</div>
              <div className="stat-line amber-line" />
            </article>
            <article className="stat-card">
              <div className="stat-heading"><span>Completed</span><span className="stat-icon green">✓</span></div>
              <div className="stat-value">{completed.toString().padStart(2, "0")}</div>
              <div className="stat-foot">Look how far you've come</div>
              <div className="stat-line green-line" />
            </article>
          </section>

          <section className="progress-panel">
            <div className="progress-copy">
              <div className="progress-symbol">✦</div>
              <div><span className="progress-label">DAILY MOMENTUM</span><h3>You're building good habits.</h3><p>{completed} of {tasks.length} tasks completed. Keep that energy going.</p></div>
            </div>
            <div className="progress-right"><strong>{progress}%</strong><span>COMPLETE</span></div>
            <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
          </section>

          <section className="tasks-panel" id="tasks">
            <div className="tasks-header">
              <div><span className="eyebrow plain">YOUR TO-DO LIST</span><h2>Today's focus <span className="task-count">{visibleTasks.length}</span></h2><p>One thing at a time. You've got this.</p></div>
              <div className="filters">
                {["All", "Active", "Completed"].map((f) => (
                  <button key={f} className={filter === f ? "filter selected" : "filter"} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
            </div>

            <form className="add-form" onSubmit={addTask}>
              <span className="plus">＋</span>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add something you want to accomplish..." aria-label="New task" />
              <button type="submit">Add task <span>↗</span></button>
            </form>

            <div className="task-list">
              {visibleTasks.map((task) => (
                <article className="task-row" key={task.id}>
                  <button className={task.done ? "task-checkbox checked" : "task-checkbox"} onClick={() => toggleTask(task.id)} aria-label="Toggle task">{task.done ? "✓" : ""}</button>
                  <div className="task-info">
                    {editing === task.id ? (
                      <input className="edit-input" value={editText} autoFocus onChange={(e) => setEditText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEdit(task.id); if (e.key === "Escape") setEditing(null); }} />
                    ) : <span className={task.done ? "task-title done" : "task-title"}>{task.title}</span>}
                    <span className="task-category"><i /> {task.category}</span>
                  </div>
                  <span className={task.done ? "status completed-status" : "status pending-status"}>{task.done ? "Completed" : "In progress"}</span>
                  {editing === task.id ? (
                    <button className="action-btn" onClick={() => saveEdit(task.id)} title="Save">✓</button>
                  ) : (
                    <button className="action-btn" onClick={() => { setEditing(task.id); setEditText(task.title); }} title="Edit">✎</button>
                  )}
                  <button className="action-btn delete" onClick={() => deleteTask(task.id)} title="Delete">×</button>
                </article>
              ))}
              {visibleTasks.length === 0 && <div className="empty-state"><div>✳</div><h3>Nothing here just yet.</h3><p>Add a task above and make a little progress today.</p></div>}
            </div>
            <div className="list-footer"><span><i /> Looking good. You're all caught up.</span><span>{completed}/{tasks.length} complete</span></div>
          </section>

          <footer className="footer"><span>Designed for a more intentional day.</span><span>FOCUS WITH PURPOSE&nbsp; ✳</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;
