import { useMutation, UseMutationOptions } from "react-query";
import { getJson, URL } from "../base";
import { Todo } from "../types";

type CreateBody = {
  text: string;
  userEmail?: string;
};

type CreateResponse = Todo;

const createTodo = async (body: CreateBody) =>
  getJson<object, CreateResponse>(`${URL}/todos`, {
    method: "POST",
    body: body,
  });

export default function useCreateTodo(
  options?: UseMutationOptions<CreateResponse, unknown, CreateBody, unknown>
) {
  return useMutation<CreateResponse, unknown, CreateBody, unknown>(
    ["create-todo"],
    (body) => createTodo(body),
    options
  );
}
