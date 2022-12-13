import React, { FormEvent, ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { login, signUp, User } from "../../hooks";
import { ReactComponent as Logo } from "../../assets/todo.svg";

import "../../index.css";
import "./Login.css";

interface LoginProps {
  onLogin: () => void;
}

function TodoList({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const saveLogin = (data: User) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("accessToken", data.accessToken);

    onLogin();
  };

  const signUpMutation = signUp({
    onSuccess: saveLogin,
  });
  const loginMutation = login({
    onSuccess: saveLogin,
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: password,
      });
    } else {
      signUpMutation.mutate({
        name: name,
        email: email,
        password: password,
      });
    }
  };

  return (
    <div className="card">
      <div className="header">
        <Logo />
        <h2 className="title">{isLogin ? "Welcome Back!" : "Welcome!"}</h2>
        <p className="subtitle">
          {isLogin
            ? "Log in to continue."
            : "Sign up to start using Simpledo today."}
        </p>
      </div>
      <form className="login-form" onSubmit={onSubmit}>
        {isLogin ? null : (
          <input
            className="input"
            value={name}
            placeholder="Full name"
            onChange={(event) =>
              setName((event.target as HTMLInputElement).value)
            }
          />
        )}
        <input
          className="input"
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) =>
            setEmail((event.target as HTMLInputElement).value)
          }
        />
        <input
          className="input"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setPassword((event.target as HTMLInputElement).value)
          }
        />
        <a className="form-switcher" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Do have an account? Sign in."}
        </a>
        <button className="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
    </div>
  );
}

export default TodoList;
