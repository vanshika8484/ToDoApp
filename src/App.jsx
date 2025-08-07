import "./App.css";
import "./index.css";
import { useState, useRef } from "react";

function App() {
  const [todolist, setTodolist] = useState([]);
  const inputRef = useRef();

  const saveToDoList = (event) => {
    event.preventDefault();

    const toname = inputRef.current.value.trim();

    if (toname === "") {
      alert("Please enter a task");
      return;
    }

    if (!todolist.includes(toname)) {
      setTodolist([...todolist, toname]);
    } else {
      alert("To-do name already exists...");
    }

    inputRef.current.value = "";
  };

  const list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        key={index}
        value={value}
        indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    );
  });

  return (
    <div className="App">
      <h1 className="Heading">To Do List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" placeholder="  Add a new Task ..." ref={inputRef} />
        <button type="submit">Save</button>
      </form>
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
  const [status, setStatus] = useState(false);

  const deleteRow = () => {
    const finalData = todolist.filter((_, i) => i !== indexNumber);
    setTodolist(finalData);
  };

  const checkStatus = () => {
    setStatus(!status);
  };

  return (
    <li className={status ? "completetodo" : ""} onClick={checkStatus}>
      {indexNumber + 1 + ". " + value}
      <span onClick={deleteRow}>&times;</span>
    </li>
  );
}
