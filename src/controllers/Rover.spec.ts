import { Rover } from "./Rover";

describe("testing the Rover controller", () => {
  test("should be able convert degree to cardinal", () => {
    const rover = new Rover();

    expect(rover.degreeToCardinal(0)).toEqual("N");
    expect(rover.degreeToCardinal(90)).toEqual("E");
    expect(rover.degreeToCardinal(180)).toEqual("S");
    expect(rover.degreeToCardinal(270)).toEqual("W");
  });

  test("should be able convert cardinal to degree", () => {
    const rover = new Rover();

    expect(rover.cardinalToDegree("N")).toEqual(0);
    expect(rover.cardinalToDegree("E")).toEqual(90);
    expect(rover.cardinalToDegree("S")).toEqual(180);
    expect(rover.cardinalToDegree("W")).toEqual(270);
  });

  test("should be able validate the rover first coordinates", () => {
    const rover = new Rover();
    expect(rover.checkFirstCoordinates(["5", "5", "N"])).toEqual(true);
    expect(rover.checkFirstCoordinates(["N", "5", "5"])).toEqual(false);
  });

  test("should be able validate the rover instructions", () => {
    const rover = new Rover();
    expect(rover.checkInstructions("LMLMLMLMM")).toBe(true);
    expect(rover.checkInstructions("LMLMLMLMMRP")).toBe(false);
  });

  test("should return the final rovers positions", () => {
    const rover = new Rover();
    expect(
      rover.execute({ x_coordinate: 5, y_coordinate: 5 }, [
        { first_coordinates: "1 2 N", instructions: "LMLMLMLMM" },
        { first_coordinates: "3 3 E", instructions: "MMRMMRMRRM" },
      ])
    ).toEqual("1 3 N\n5 1 E");
  });
});
