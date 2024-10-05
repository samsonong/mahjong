import { HAND } from "../../../player/player";
import getTileType from "../../../tiles/getTileType";
import { mergeSortedTilesArray } from "../../../tiles/sortTiles";
import { NUMBER_TILES, TILES } from "../../../tiles/tiles";

export type HonorsAndTerminalsResponse =
  | "allHonors"
  | "pureTerminals"
  | "mixedTerminals"
  | false;

/**
 * Criteria:
 *
 * 1. No 2-8 number tiles
 * 2. All triplets (tiles cannot form sequences)
 *
 * Early escapes
 *
 * - Any 2-8 number tiles
 */
export default function (hand: HAND): HonorsAndTerminalsResponse {
  const handToAnalyze = mergeSortedTilesArray(hand.open, hand.closed);

  const terminalTiles: TILES[] = [
    NUMBER_TILES.BAMBOO_ONE,
    NUMBER_TILES.BAMBOO_NINE,
    NUMBER_TILES.CIRCLE_ONE,
    NUMBER_TILES.CIRCLE_NINE,
    NUMBER_TILES.MYRIAD_ONE,
    NUMBER_TILES.MYRIAD_NINE,
  ];

  let hasPair: boolean = false;
  let pureTerminals: boolean = true;
  let pureHonors: boolean = true;
  for (let i = 0; i < handToAnalyze.length; i++) {
    const { id, tile } = handToAnalyze[i];

    const tileType = getTileType(tile);
    switch (tileType) {
      case "BONUS_TILES":
        continue;
      case "NUMBER_TILES":
        if (!terminalTiles.includes(tile)) return false;
        pureHonors = false;
        break;
      case "HONOR_TILES":
        pureTerminals = false;
        break;
    }

    if (id.length >= 3) continue;
    if (id.length === 2) {
      if (hasPair) return false;
      hasPair = true;
      continue;
    }

    return false;
  }

  if (pureHonors) return "allHonors";
  if (pureTerminals) return "pureTerminals";
  return "mixedTerminals";
}
