import React from "react";

export default function SingleList({
  todos,
  index,
  todo,
  id,
  completed,
  setTodos,
}) {
  const deleteHandler = () => {
    setTodos(
      todos.filter((t) => {
        console.log(t.id === id);
        return t.id !== id;
      })
    );
  };
  const changeHandler = () => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !completed,
          };
        }
        return t;
      })
    );
  };
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td className={completed ? "text-decoration-line-through" : ""}>
        {todo}
      </td>
      <td>{completed ? "Completed" : "Not Completed"}</td>
      <td>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={deleteHandler}
        >
          Delete
        </button>
        {!completed ? (
          <button
            type="submit"
            className="btn btn-success ms-1"
            onClick={changeHandler}
          >
            Click Completed
          </button>
        ) : (
          <button type="submit" className="btn btn-success ms-1">
            Completed
          </button>
        )}
      </td>
    </tr>
  );
}
