import { useQuery, UseQueryOptions } from "react-query";
import { convertToQueryParams } from "../../utils";
import { getJson, URL } from "../base";
import { Todo } from "../types";

type ListParams = {
  completed?: boolean;
};

type ListResponse = Todo[];

const listTodo = async (requestParams?: ListParams) =>
  getJson<object, ListResponse>(
    `${URL}/todos${
      requestParams ? `?${convertToQueryParams(requestParams || {})}` : ""
    }`
  );

export default function useListTodo<R = ListResponse>(
  requestParams?: ListParams,
  options?: UseQueryOptions<ListResponse, unknown, R>
) {
  return useQuery(
    ["list-todo", requestParams],
    () => listTodo(requestParams),
    options
  );
}
