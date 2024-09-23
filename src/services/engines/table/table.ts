import { TILE_TYPE } from "../tiles/tiles";

export type TABLE = {
  wall: TILE_TYPE[]; // Keeping this simple. We can implement four walls later
  discardPile: TILE_TYPE[];
  round: 1 | 2 | 3 | 4;
  wind: "E" | "S" | "W" | "N"; // This is in order of wind sequence
};
