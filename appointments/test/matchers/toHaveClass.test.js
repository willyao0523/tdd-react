import { toHaveClass } from "./toHaveClass";

describe("toHaveClass matcher", () => {
  const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");

  it("returns pass is true when class is found in the given DOM element", () => {
    const domElement = {
      className: "class1",
    };
    const result = toHaveClass(domElement, "class1");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when class is not found in the given DOM element", () => {
    const domElement = {
      className: "",
    };
    const result = toHaveClass(domElement, "class1");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toHaveClass("class1")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = { className: "class1" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toHaveClass("class1")`
    );
  });

  "returns a message that contains the source line if negated match",
    () => {
      const domElement = {
        className: "class1",
      };
      const result = toHaveClass(domElement, "class1");
      expect(stripTerminalColor(result.message())).toContain(
        `expect(element).not.toContainText("class1")`
      );
    };

  it("returns a message that contains the actual text", () => {
    const domElement = {
      className: "class1",
    };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual text: "class1"`
    );
  });
});
