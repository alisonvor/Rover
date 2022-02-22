import { ReadFile } from "./readFile";

describe("testing input functions", () => {
  test("should be able to read the input file", () => {
    const path = __dirname.replace("services", "input");
    const content = ReadFile(path);

    expect(Array.isArray(content)).toBe(true);
  });

  test("should not be able to read a not found file", () => {
    const path = __dirname.replace("services", "inputs");
    const content = ReadFile(path);

    expect(content).toContain("No such file or directory");
  });
});
