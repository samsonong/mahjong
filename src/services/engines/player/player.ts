import { TILE_TYPE } from "../tiles/tiles";

export type HAND = {
  open: TILE_TYPE[];
  close: TILE_TYPE[];
};

export class Player {
  hand: HAND = { open: [], close: [] };

  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
