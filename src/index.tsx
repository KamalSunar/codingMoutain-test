import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));
// From React 18, ReactDOM.render has been deprecated
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
