import path from "path";
import { Plateau } from "./controllers/Plateau";
import { Rover } from "./controllers/Rover";
import { ReadFile } from "./services/readFile";

//Retrieve data from the input file
const directoryPath = path.join(__dirname.replace("src", "src/input"));
const input = ReadFile(directoryPath);

//Separates plateau limits from rover commands
const plateau_limits = input
  .splice(0, 1)
  .toString()
  .split(" ")
  .map((item) => {
    return item;
  });

//Organizes the all the rovers and it's inputs
const rovers = [];
for (let index = 0; index < input.length; index += 2) {
  rovers.push({
    first_coordinates: input[index].toString(),
    instructions: input[index + 1].toString(),
  });
}

//Checks if all the limits are given and creates the Plateau object
let plateau;
if (
  plateau_limits &&
  plateau_limits[0] &&
  plateau_limits[1] &&
  plateau_limits.length === 2
) {
  plateau = new Plateau({
    x_coordinate: parseInt(plateau_limits[0], 10),
    y_coordinate: parseInt(plateau_limits[1], 10),
  });
} else {
  throw new Error(
    "The Plateau limits were not defined correctly, check the instructions"
  );
}

//Place the rovers on the Plateau
const rover = new Rover();
const response = rover.execute(plateau, rovers);
console.log(response);
