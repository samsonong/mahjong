import { SORTED_TILES } from "../tiles/sortTiles";

export type HAND = {
  open: SORTED_TILES[];
  close: SORTED_TILES[];
};

export class Player {
  hand: HAND = { open: [], close: [] };

  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
