import { IPlateau } from "../interfaces/IPlateau";
import { IRover } from "../interfaces/IRover";

class Rover {
  checkFirstCoordinates(first_coordinates: Array<string>): boolean {
    if (
      (first_coordinates[2] === "N" ||
        first_coordinates[2] === "E" ||
        first_coordinates[2] === "S" ||
        first_coordinates[2] === "W") &&
      parseInt(first_coordinates[0], 10) &&
      parseInt(first_coordinates[0], 10)
    ) {
      return true;
    } else return false;
  }

  checkInstructions(instructions: string): boolean {
    let matches = 0;

    matches += (instructions.match(/L/g) || []).length;
    matches += (instructions.match(/R/g) || []).length;
    matches += (instructions.match(/M/g) || []).length;

    if (matches !== instructions.length) {
      return false;
    }
    return true;
  }

  cardinalToDegree(direction: string): number {
    if (direction === "N") {
      return 0;
    }

    if (direction === "E") {
      return 90;
    }

    if (direction === "S") {
      return 180;
    }

    if (direction === "W") {
      return 270;
    }

    throw new Error(
      `"${direction}" is not a valid cardinal direction, the rover will not move`
    );
  }

  degreeToCardinal(degree: number): string {
    if (degree === 0) {
      return "N";
    }

    if (degree === 90) {
      return "E";
    }

    if (degree === 180) {
      return "S";
    }

    if (degree === 270) {
      return "W";
    }

    throw new Error(
      `"${degree}" is not a possible degree, the rover will not move`
    );
  }

  execute(plateau: IPlateau, rovers: Array<IRover>): string {
    let result = "";
    if (rovers.length === 0) {
      throw new Error("The input file have to contain at leat one rover");
    }
    for (let index = 0; index < rovers.length; index += 1) {
      const rover = rovers[index];
      const first_coordinates = rover.first_coordinates
        .toUpperCase()
        .split(" ");
      let x_coordinate = 0;
      let y_coordinate = 0;
      let cardinal_direction = "";
      let instructions = "";

      if (
        this.checkFirstCoordinates(first_coordinates) &&
        this.checkInstructions(rover.instructions.toUpperCase())
      ) {
        x_coordinate = parseInt(first_coordinates[0], 10);
        y_coordinate = parseInt(first_coordinates[1], 10);
        cardinal_direction = first_coordinates[2];
        instructions = rover.instructions.toUpperCase();
      } else {
        throw new Error(
          "The rover instructions or coordinates weren't specified correctly on the input file," +
            "the rover will not move"
        );
      }

      if (
        x_coordinate > plateau.x_coordinate ||
        y_coordinate > plateau.y_coordinate ||
        y_coordinate < 0 ||
        x_coordinate < 0
      ) {
        throw new Error(
          "The rover cannot start on this position because its out of the plateau"
        );
      }

      let rover_degree = this.cardinalToDegree(cardinal_direction);
      const moves = instructions.toString().toUpperCase().split("");
      for (let index_move = 0; index_move < moves.length; index_move += 1) {
        const move = moves[index_move];
        if (move === "L") {
          rover_degree -= 90;
          if (rover_degree < 0) {
            rover_degree += 360;
          }

          continue;
        }

        if (move === "R") {
          rover_degree += 90;

          if (rover_degree >= 360) {
            rover_degree -= 360;
          }

          continue;
        }

        if (move === "M") {
          if (rover_degree === 0) {
            if (y_coordinate + 1 > plateau.y_coordinate) {
              console.log(
                `The rover cannot exit the Plateau, review the input code for it to move`
              );
              break;
            }
            y_coordinate += 1;
            continue;
          }

          if (rover_degree === 90) {
            if (x_coordinate + 1 > plateau.x_coordinate) {
              console.log(
                `The rover cannot exit the Plateau, review the input code for it to move`
              );
              break;
            }
            x_coordinate += 1;
            continue;
          }

          if (rover_degree === 180) {
            if (y_coordinate - 1 < 0) {
              console.log(
                `The rover cannot exit the Plateau, review the input code for it to move`
              );
              break;
            }
            y_coordinate -= 1;
            continue;
          }

          if (rover_degree === 270) {
            if (x_coordinate - 1 < 0) {
              console.log(
                `The rover cannot exit the Plateau, review the input code for it to move`
              );
              break;
            }
            x_coordinate -= 1;
            continue;
          }
        }
      }

      cardinal_direction = this.degreeToCardinal(rover_degree);

      result += `${x_coordinate} ${y_coordinate} ${cardinal_direction}`;
      if (index < rovers.length - 1) {
        result += `\n`;
      }
    }
    return result;
  }
}

export { Rover };
