// Import necessary dependencies from react.
// useState: React hook for adding state to functional components.
// useEffect: React hook for performing side effects in functional components.
import React, { useState, useEffect } from 'react';

// Import react fonts
import { AiOutlinePlus } from 'react-icons/ai';

// Importing CSS module styles.
import styles from './header.module.css';

// Defining a functional component named GreetingComponent.
const GreetingComponent = () => {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');

  function getTimeGreeting(name) {
    const now = new Date(); // Get current date and time.
    const hours = now.getHours(); // Get current hours.
    const minutes = now.getMinutes(); // Get current minutes.
    // Format time string in HH:MM format.
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;

    let greetingString;

    // Check current time and set appropriate greeting.
    if (hours >= 5 && hours < 12) {
      greetingString = `Good morning ${name}`;
    } else if (hours >= 12 && hours < 18) {
      greetingString = `Good afternoon ${name}`;
    } else {
      greetingString = `Good evening ${name}`;
    }

    // Update state with new time and greeting strings.
    setTime(timeString);
    setGreeting(greetingString);
  }

  // useEffect to call getTimeGreeting function every minute and upon component mount.
  useEffect(() => {
    getTimeGreeting(name);
    const intervalId = setInterval(() => getTimeGreeting(name), 60000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval.
  }, [name]); // Effect runs when 'name' changes.

  // Render greeting, time, and name input field.
  return (
    <>
      <div id="time">{time}</div>
      <div id="greeting">{greeting}</div>
      {/* <form onSubmit={}> */}
        <input
          type="text"
          id="name-input"
          placeholder=""
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            onSaveName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              getTimeGreeting(event.target.value);
              onSaveName(event.target.value);
            }
          }}
          onBlur={(event) => {
            getTimeGreeting(event.target.value);
            onSaveName(event.target.value);
          }}
        />
      {/* </form> */}
    </>
  );
};

// Defining a functional component named Header.
export function Header({ onAddTask, onSaveName }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(title);
    setTitle('');
  }

  // Render header with logo and GreetingComponent.
  return (
    <header className={styles.header}>
      <GreetingComponent onSaveName={onSaveName} />
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          type="text"
          id="input-box"
          placeholder="Add your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button id="add-button" type="submit">
          Add
          <AiOutlinePlus size={12} />
        </button>
      </form>
    </header>
  );
}