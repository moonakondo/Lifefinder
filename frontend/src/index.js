import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Provider from "./utils/provider";

ReactDom.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
