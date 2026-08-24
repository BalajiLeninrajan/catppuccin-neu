import { render } from "preact";
import "../../css/index.css";
import "./showcase.css";
import { App } from "./app";

render(<App />, document.getElementById("app")!);
