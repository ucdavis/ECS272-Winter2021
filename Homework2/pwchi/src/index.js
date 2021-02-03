import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./css/index.css";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//
// const div = document.createElement("div");
// div.innerText("Hello"); // slightly different with textContent
// div.textContent("Hello");
// div.innerHTML("<strong>Hello</ strong>");
// div.remove();
// div.getAttribute();
// div.setAttribute();
// div.removeAttribute();
// div.classList.add();
// div.classList.remove();
// div.classList.toggle();
// div.style;

// document.body.append;
// document.body.appendChild;
// document.querySelector("body");
