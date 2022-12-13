import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { TodoList } from "./components";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
