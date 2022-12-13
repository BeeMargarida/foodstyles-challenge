import { useMutation, UseMutationOptions } from "react-query";
import { getJson, URL } from "../base";
import { Todo } from "../types";

type UpdateParams = {
  todoId: number;
  completed: boolean;
};

type UpdateResponse = Todo;

const updateTodo = async (params: UpdateParams) =>
  getJson<object, UpdateResponse>(
    `${URL}/todos/${params.todoId}/${
      params.completed ? "complete" : "incomplete"
    }`,
    {
      method: "PUT",
      body: {},
    }
  );

export default function useCreateTodo(
  options?: UseMutationOptions<UpdateResponse, unknown, UpdateParams, unknown>
) {
  return useMutation<UpdateResponse, unknown, UpdateParams, unknown>(
    ["update-todo"],
    (params) => updateTodo(params),
    options
  );
}
