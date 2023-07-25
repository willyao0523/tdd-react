import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toHaveClass = (received, expectText) => {
  const pass = received.className.includes(expectText);

  const sourceHint = () =>
    matcherHint("toHaveClass", "element", printExpected(expectText), {
      isNot: pass,
    });

  const actualTextHint = () =>
    "Actual text: " + printReceived(received.className);

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return {
    pass,
    message,
  };
};
