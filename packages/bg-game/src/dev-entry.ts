import { main } from "./main";
import "./dev-entry.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing root");
}

main(root);
