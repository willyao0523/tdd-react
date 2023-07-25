import { matcherHint, printExpected } from "jest-matcher-utils";

export const toBeInputFieldOfType = (element, expectType) => {
  const pass = element?.tagName === "INPUT" && element.type === expectType;

  const sourceHint = () =>
    matcherHint("toBeInputFieldOfType", "element", printExpected(expectType), {
      isNot: pass,
    });

  const receivedText = () => {
    if (!element) {
      return "element was not found";
    }
    if (element?.tagName !== "INPUT") {
      return `<${element?.tagName.toLowerCase()}>`;
    }
    return `<input type=${element.type}>`;
  };

  const actualTextHint = () => `Actual: ${receivedText()}`;

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return {
    pass,
    message,
  };
};
