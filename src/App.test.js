import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Pay from "./payment/payPage";
import React from "react";
import ReactDOM from "react-dom";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Pay />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
