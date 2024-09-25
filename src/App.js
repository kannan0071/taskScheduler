import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const addTask = () => {
    if (taskInput && reminderTime) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        priority: false,
        reminder: reminderTime,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setReminderTime('');
      setReminder(newTask.reminder);
    }
  };

  const setReminder = (time) => {
    const currentTime = new Date().getTime();
    const reminderTime = new Date(time).getTime();
    const timeout = reminderTime - currentTime;

    if (timeout > 0) {
      setTimeout(() => {
        alert('Reminder: Task is due!');
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
        audio.play();
      }, timeout);
    }
  };

  const formatDate = (time) => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year} ${date.getHours()}:${date.getMinutes()}`;
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const prioritizeTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, priority: !task.priority } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Scheduler</h1>
      <div className="task-input">
        <input 
          type="text" 
          placeholder="Enter task..." 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
        />
        <input 
          type="datetime-local" 
          value={reminderTime} 
          onChange={(e) => setReminderTime(e.target.value)} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.priority ? 'priority' : ''}>
            <span>{task.text}</span>
            <span>Reminder: {formatDate(task.reminder)}</span>
            <div className="task-buttons">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => prioritizeTask(task.id)}>
                {task.priority ? 'Unprioritize' : 'Prioritize'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
