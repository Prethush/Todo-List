import React, { useState, useEffect } from "react";
import SingleList from "./SingleList";

export default function TodoList() {
  // states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilterTodos] = useState([]);

  //functions
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const filterHandler = () => {
    console.log("abc");
    switch (status) {
      case "completed":
        setFilterTodos(todos.filter((t) => t.completed));
        break;
      case "not completed":
        setFilterTodos(todos.filter((t) => !t.completed));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  };
  const handleInputText = (e) => {
    let text = e.target.value;
    setInputText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.length) {
      let obj = {
        todoName: inputText,
        completed: false,
        id: Date.now(),
      };
      setTodos([...todos, obj]);
      setInputText("");
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    filterHandler();
    saveTodos();
  }, [todos, status]);
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container-fluid py-5 h-100">
        <div className="row d-flex justify-content-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>

                <form
                  onSubmit={handleSubmit}
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                >
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form1"
                        className="form-control"
                        value={inputText}
                        onChange={handleInputText}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                  <div className="col-12">
                    <select
                      name=""
                      id=""
                      className="p-2"
                      onChange={statusHandler}
                    >
                      <option value="all">All</option>
                      <option value="completed">Completed</option>
                      <option value="not completed">Not Completed</option>
                    </select>
                  </div>
                </form>

                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTodos.map((t, i) => {
                      return (
                        <SingleList
                          todos={todos}
                          index={i}
                          todo={t.todoName}
                          key={t.id}
                          id={t.id}
                          completed={t.completed}
                          setTodos={setTodos}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
