import { useMutation, UseMutationOptions } from "react-query";
import { getJson, URL } from "../base";
import { Todo } from "../types";

type DeleteParams = {
  todoId: number;
};

type DeleteResponse = Todo;

const deleteTodo = async (params: DeleteParams) =>
  getJson<object, DeleteResponse>(`${URL}/todos/${params.todoId}`, {
    method: "DELETE",
  });

export default function useDeleteTodo(
  options?: UseMutationOptions<DeleteResponse, unknown, DeleteParams, unknown>
) {
  return useMutation<DeleteResponse, unknown, DeleteParams, unknown>(
    ["delete-todo"],
    (params) => deleteTodo(params),
    options
  );
}
