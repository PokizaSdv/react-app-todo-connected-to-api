import React, { useEffect, useState } from "react";
import { todoApi } from "./api/todo"
import "./App.css";

type TodoStatus = "TODO" | "INPROGRESS" | "DONE";

type Todo = {
    id: string;
    text: string;
    status: TodoStatus;
};

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInputValue, setTodoInputValue] = useState<string>("");

    useEffect(() => {
        todoApi
            .getAll()
            .then((response) => {
                setTodos(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleTodoInputChange = (value: string): void => {
        setTodoInputValue(value);
    };

    const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoInputValue.length < 3) {
            return;
        }

        todoApi
            .create(todoInputValue)
            .then((response) => {
                setTodoInputValue("");
                setTodos((prevTodos) => {
                    return [...prevTodos, response.data];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateStatus = (id: string, status: TodoStatus): void => {
        todoApi
            .updateStatus(id, status)
            .then((_) => {
                setTodos((prevTodos) => {
                    const copyTodos = prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, status } : todo
                    );
                    return copyTodos;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    

    return (
        <main>
            <h1>Todo App</h1>

            <form onSubmit={createTodo}>
                <label>
                    Todo:
                    <input
                        type="text"
                        value={todoInputValue}
                        onChange={(e) => handleTodoInputChange(e.target.value)}
                    />
                </label>
                <button type="submit">
                    Add Todo
                </button>
            </form>

            <ul>
            {todos.map((todo) => {
                return (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                        <select
                            value={todo.status}
                            onChange={(e) =>
                                updateStatus(
                                    todo.id,
                                    e.target.value as
                                        | "TODO"
                                        | "INPROGRESS"
                                        | "DONE"
                                )
                            }
                        >
                            <option value={"TODO"}>Todo</option>
                            <option value={"INPROGRESS"}>In Progress</option>
                            <option value={"DONE"}>Done</option>
                        </select>
                    </li>
                );
            })}
        </ul>
        </main>
    );
};

export default App;
