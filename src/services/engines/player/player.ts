import { SORTED_TILES } from "../tiles/sortTiles";

export type HAND = {
  open: SORTED_TILES[];
  closed: SORTED_TILES[];
};

export class Player {
  hand: HAND = {
    open: [],
    closed: [],
  };
  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
