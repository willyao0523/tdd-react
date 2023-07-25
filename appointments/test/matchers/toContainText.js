import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (received, expectText) => {
  const pass = received.textContent.includes(expectText);

  const sourceHint = () =>
    matcherHint("toContainText", "element", printExpected(expectText), {
      isNot: pass,
    });

  const actualTextHint = () =>
    "Actual text: " + printReceived(received.textContent);

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return {
    pass,
    message,
  };
};
