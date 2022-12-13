import { useMutation, UseMutationOptions } from "react-query";
import { getJson, URL } from "../base";
import { User } from "../types";

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = User;

const login = async (body: LoginBody) =>
  getJson<object, LoginResponse>(`${URL}/login`, {
    method: "POST",
    body: body,
  });

export default function useLogin(
  options?: UseMutationOptions<LoginResponse, unknown, LoginBody, unknown>
) {
  return useMutation<LoginResponse, unknown, LoginBody, unknown>(
    ["login"],
    (body) => login(body),
    options
  );
}
