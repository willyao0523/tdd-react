import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) =>
  act(() => ReactDOM.createRoot(container).render(component));

export const click = (element) => act(() => element.click());
