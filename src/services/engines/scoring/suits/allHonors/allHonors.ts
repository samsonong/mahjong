import { HAND } from "../../../player/player";
import getTileType from "../../../tiles/getTileType";
import { mergeSortedTilesArray } from "../../../tiles/sortTiles";

/**
 * ! THIS DOES NOT CHECK FOR HAND COMPLETENESS TO AVOID DOUBLE-PROCESSING
 *
 * Criteria:
 *
 * 1. Does not have number tiles, including the pair
 *
 * Early escapes
 *
 * - Any number tiles (non-honor, non-bonus)
 */
export default function (hand: HAND): boolean {
  const handToAnalyze = mergeSortedTilesArray(hand.open, hand.closed);

  for (let i = 0; i < handToAnalyze.length; i++) {
    if (getTileType(handToAnalyze[i].tile) === "NUMBER_TILES") return false;
  }

  return true;
}
