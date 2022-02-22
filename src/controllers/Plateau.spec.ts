import { Plateau } from "./Plateau";

describe("testing the Plateau controller", () => {
  test("should be able to read the input file", () => {
    const plateau = new Plateau({
      x_coordinate: 5,
      y_coordinate: 5,
    });

    expect(plateau).toEqual({ x_coordinate: 5, y_coordinate: 5 });
  });
});
