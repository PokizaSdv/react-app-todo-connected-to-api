import React from "react";

type FormProps = {
    isSubmitDisabled: boolean;
    todoValue: string;
    handleTodoValue: (value: string) => void;
    createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const Form: React.FC<FormProps> = (props) => {
    const { isSubmitDisabled, todoValue, handleTodoValue, createTodo } = props;

    return (
        <form onSubmit={createTodo}>
            <input
                type="text"
                value={todoValue}
                onChange={(e) => handleTodoValue(e.target.value)}
            />

            <button type="submit" disabled={isSubmitDisabled}>
                Add Todo
            </button>
        </form>
    );
};
