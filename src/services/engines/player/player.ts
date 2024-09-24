import { SORTED_TILES } from "../tiles/sortTiles";
import { TILE_TYPE } from "../tiles/tiles";

export type HAND = {
  open: OPEN_HAND;
  closed: CLOSED_HAND;
};

export type CLOSED_HAND = SORTED_TILES[];

export type OPEN_HAND = {
  tiles: TILE_TYPE[];
  score: number;
}[];

export class Player {
  hand: HAND = { open: [], closed: [] };

  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
