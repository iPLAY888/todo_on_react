import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";

export default function Todo({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== "") {
      onEdit(editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={isEditing ? "todo editing" : "todo not-editing"}>
      <span className="text-field">
        {isEditing ? (
          <input
            className="editing"
            checked={todo.checked}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span
            className={todo.isDone ? "checked" : "unchecked"}
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </span>
      <Button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</Button>
      <Checkbox checked={todo.isDone} onClick={onToggle}>
        Done
      </Checkbox>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
//onChange={() => toggleTodo(todo.id)}
