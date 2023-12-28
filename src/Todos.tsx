import React from "react";

type Todo = {
    id: string;
    text: string;
    status: "TODO" | "INPROGRESS" | "DONE";
};

type TodosProps = {
    todos: Todo[];
    updateStatus: (id: string, status: "TODO" | "INPROGRESS" | "DONE") => void;
    deleteTodo: (id: string) => void;
};

export const Todos: React.FC<TodosProps> = (props) => {
    const { todos, updateStatus, deleteTodo } = props;
    return (
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
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};