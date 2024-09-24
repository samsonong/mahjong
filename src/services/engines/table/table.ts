import { initTiles, TILE_TYPE } from "../tiles/tiles";

export class Table {
  seed: number;
  wall: TILE_TYPE[]; // Keeping this simple. We can implement four walls later

  round: 1 | 2 | 3 | 4 = 1;
  wind: "E" | "S" | "W" | "N" = "E"; // In order of wind sequence
  discardPile: TILE_TYPE[] = [];

  constructor() {
    const { seed, tiles } = initTiles();
    this.wall = tiles;
    this.seed = seed;
  }
}
