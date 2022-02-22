import { IPlateau } from "../interfaces/IPlateau";

class Plateau {
  x_coordinate: number;
  y_coordinate: number;

  constructor(plateau: IPlateau) {
    this.x_coordinate = plateau.x_coordinate;
    this.y_coordinate = plateau.y_coordinate;
  }
}

export { Plateau };
