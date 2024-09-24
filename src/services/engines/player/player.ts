import { TILE_TYPE } from "../tiles/tiles";

export class Player {
  hand: {
    open: TILE_TYPE[];
    close: TILE_TYPE[];
  } = { open: [], close: [] };

  bank: number;
  wallet: number;

  constructor(bank: number, wallet: number) {
    this.bank = bank;
    this.wallet = wallet;
  }
}
