import { useState } from "react";
import "./styles.css";
import Button from "./components/Button/Button";
import Checkbox from "./components/Checkbox/Checkbox";
import Todo from "./components/Todo/Todo";

const generateId = () => Math.random();

export default function ToDoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedAll, setCompletedAll] = useState(false);

  const sort = () => {
    sortTodo = [...todos].sort((a, b) => b.isDone - a.isDone);
    setTodos(sortTodo);
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: generateId(), text: todo, isDone: false }]);
      setTodo("");
    }
  };

  const toggleTodo = (id) => {
    const todoCompleted = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(todoCompleted);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const completeAll = () => {
    const allCompleted = todos.every((todo) => todo.isDone);
    const newTodos = todos.map((todo) => ({
      ...todo,
      isDone: !allCompleted,
    }));
    setTodos(newTodos);
    setCompletedAll(!allCompleted); 
  };

  const countCompleted = todos.filter((todo) => todo.isDone).length;
  const countIncompleted = todos.length - countCompleted;

  return (
    <>
      <h1>Todo list</h1>
      <input
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Input your text"
      />
      <Button onClick={addTodo}>Add</Button>
      <div className="filter-btns">
        <Button onClick={sort}>Sort by completed</Button>
        <Button
          checked={completedAll} 
          onClick={completeAll} 
        >
          Complete all
        </Button>
      </div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={(newText) => editTodo(todo.id, newText)}
        />
      ))}
      <div className="footer">
        <span>Count: {todos.length}</span>
        <span>Completed: {countCompleted}</span>
        <span>Incompleted: {countIncompleted}</span>
      </div>
    </>
  );
}
