import { SUITS } from "../scoring/scoring";
import { SORTED_TILES } from "../tiles/sortTiles";
import { TILE_TYPE } from "../tiles/tiles";

export type HAND = {
  open: SORTED_TILES[];
  closed: SORTED_TILES[];
  possibleActions: POSSIBLE_ACTIONS;
};

type POSSIBLE_ACTIONS = {
  chi: POSSIBLE_ACTION_NODE[];
  pon: POSSIBLE_ACTION_NODE[];
  kan: POSSIBLE_ACTION_NODE[];
  ron: {
    target: TILE_TYPE["tile"][];
    type: SUITS;
  }[];
};
type POSSIBLE_ACTION_NODE = {
  id: string;
  targets: TILE_TYPE["tile"][];
  base: TILE_TYPE[];
};

export class Player {
  hand: HAND = {
    open: [],
    closed: [],
    possibleActions: {
      chi: [],
      pon: [],
      kan: [],
      ron: [],
    },
  };
  wallet: number;

  constructor(wallet: number) {
    this.wallet = wallet;
  }
}
