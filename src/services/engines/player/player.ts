import { TILE_TYPE } from "../tiles/tiles";

export type PLAYER = {
  hand: {
    open: TILE_TYPE[];
    close: TILE_TYPE[];
  };
  bank: number;
  wallet: number;
};
