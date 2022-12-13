import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Login, TodoList } from "./components";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const onLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {isAuthenticated ? (
          <TodoList onLogout={onLogout} />
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
