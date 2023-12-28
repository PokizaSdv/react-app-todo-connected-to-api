import React, { useEffect, useState } from "react";
import { todoApi } from "./api/todo";
import { Form } from "./Form";
import { Todos } from "./Todos";
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

    const handleTodoInputChange = (value: string) => {
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

    const updateStatus = (id: string, status: TodoStatus) => {
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

    const deleteTodo = (id: string)=> {
        todoApi
            .deleteOne(id)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== id)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isSubmitButtonDisabled = !todoInputValue.length;

    return (
        <main>
            <h1>Todo App</h1>

            <Form
                isSubmitDisabled={isSubmitButtonDisabled}
                todoValue={todoInputValue}
                handleTodoValue={handleTodoInputChange}
                createTodo={createTodo}
            />

            <Todos
                todos={todos}
                updateStatus={updateStatus}
                deleteTodo={deleteTodo}
            />
        </main>
    );
};

export default App;
