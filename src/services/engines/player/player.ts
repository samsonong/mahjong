import { TILE_TYPE } from "../tiles/tiles";

export class Player {
  hand: {
    open: TILE_TYPE[];
    close: TILE_TYPE[];
  } = { open: [], close: [] };

  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
