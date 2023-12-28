import React, { useState, useEffect } from "react";
import { todoApi } from "./api/todo";
import "./App.css";

const App: React.FC = () => {

    interface Todo {
        id: number;
        text: string;
        status: string
    }
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInputValue, setTodoInputValue] = useState("");

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

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        todoApi
            .addTodo({ text: todoInputValue })
            .then((response) => {
                setTodoInputValue("");
                setTodos((prevTodos) => {
                    return [...prevTodos, ...response.data];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInputValue(e.target.value);
    };

    return (
        <main>
            <h1>Todo App</h1>
            <form onSubmit={addTodo}>
                <input
                    placeholder="What is in your mind?"
                    value={todoInputValue}
                    onChange={handleTodoInputChange}
                />
                <button type="submit">Add Todo</button>
            </form>

            <ul>
            {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <span>{todo.text}</span>
                            
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default App;
