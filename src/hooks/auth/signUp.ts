import { useMutation, UseMutationOptions } from "react-query";
import { getJson, URL } from "../base";
import { User } from "../types";

type SignUpBody = {
  name: string;
  email: string;
  password?: string;
};

type SignUpResponse = User;

const signUp = async (body: SignUpBody) =>
  getJson<object, SignUpResponse>(`${URL}/signup`, {
    method: "POST",
    body: body,
  });

export default function useSignUp(
  options?: UseMutationOptions<SignUpResponse, unknown, SignUpBody, unknown>
) {
  return useMutation<SignUpResponse, unknown, SignUpBody, unknown>(
    ["sign-up"],
    (body) => signUp(body),
    options
  );
}
