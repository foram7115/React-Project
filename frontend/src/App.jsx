import { useEffect, useInsertionEffect, useState, useRef } from "react";
import Item from "./Item";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const isFirstRender = useRef(true);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Input can't be empty");
      return;
    }
    const newTodo = {
      id: Date.now(),
      data: input,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if(savedTodos) setTodos(savedTodos);
  }, [])

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }, [todos]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <form className="input-container" onSubmit={addTodo}>
        <input
          value={input}
          type="text"
          placeholder="Add new To-Do List"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="items">
        {todos.map((todo) => (
          <Item
            key={todo.id}
            data={todo.data}
            id={todo.id}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
