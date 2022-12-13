import React, { FormEvent, ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";
import {
  createTodo,
  deleteTodo,
  listTodo,
  updateTodo,
  Todo,
} from "../../hooks";
import { ReactComponent as Logo } from "../../assets/todo.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

import "./TodoList.css";

enum Filters {
  All = "all",
  Completed = "completed",
  Incompleted = "incompleted",
}

function TodoList() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<Filters>(Filters.All);

  const { data, isLoading } = listTodo({
    completed:
      filter === Filters.All ? undefined : filter === Filters.Completed,
  });
  const createMutation = createTodo({
    onMutate: async () => {
      await queryClient.cancelQueries("list-todo");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("list-todo");
    },
  });
  const updateMutation = updateTodo({
    onMutate: async () => {
      await queryClient.cancelQueries("list-todo");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("list-todo");
    },
  });
  const deleteMutation = deleteTodo({
    onSuccess: async () => {
      console.log("here");

      await queryClient.invalidateQueries("list-todo");
    },
  });

  const onChangeInput = (event: ChangeEvent) => {
    setNewTodo((event.target as HTMLInputElement).value);
  };

  const onSubmitTodo = (event: FormEvent) => {
    event.preventDefault();
    setNewTodo("");
    createMutation.mutate({
      text: newTodo,
      userEmail: "test@test.com",
    });
  };

  const onUpdateTodo = (todo: Todo, checked: boolean) => {
    updateMutation.mutate({
      todoId: todo.id,
      completed: checked,
    });
  };

  const onDeleteTodo = (todo: Todo) => {
    deleteMutation.mutate({ todoId: todo.id });
  };

  const renderTodo = (todo: Todo) => {
    return (
      <div className="todo" key={todo.id}>
        <div className="todo-info">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(event) =>
              onUpdateTodo(todo, (event.target as HTMLInputElement).checked)
            }
          />
          <p className="todo-text">{todo.text}</p>
        </div>
        <button className="todo-action" onClick={() => onDeleteTodo(todo)}>
          <Close />
        </button>
      </div>
    );
  };

  return (
    <div className="todo-list">
      <div className="header">
        <Logo />
        <h2 className="title">Todo List</h2>
      </div>
      <form className="input-wrapper" onSubmit={onSubmitTodo}>
        <input
          className="input"
          value={newTodo}
          placeholder="Add a new todo"
          onChange={onChangeInput}
        />
      </form>
      <div className="todos">
        {isLoading ? "Loading..." : (data ?? []).map(renderTodo)}
      </div>
      <div className="filters">
        <p className="filters-label">Show:</p>
        <button
          className={`filter ${filter === Filters.All ? "selected" : ""}`}
          onClick={() => setFilter(Filters.All)}
        >
          All
        </button>
        <button
          className={`filter ${filter === Filters.Completed ? "selected" : ""}`}
          onClick={() => setFilter(Filters.Completed)}
        >
          Completed
        </button>
        <button
          className={`filter ${
            filter === Filters.Incompleted ? "selected" : ""
          }`}
          onClick={() => setFilter(Filters.Incompleted)}
        >
          Incompleted
        </button>
      </div>
    </div>
  );
}

export default TodoList;
