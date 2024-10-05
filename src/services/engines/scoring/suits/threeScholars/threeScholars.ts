import { HAND } from "../../../player/player";
import { findTile } from "../../../tiles/findTile";
import { mergeSortedTilesArray } from "../../../tiles/sortTiles";
import { HONOR_TILES, TILES } from "../../../tiles/tiles";

export type ThreeScholarResponse = "great" | "small" | false;

/**
 * ! THIS DOES NOT CHECK FOR HAND COMPLETENESS TO AVOID DOUBLE-PROCESSING
 *
 * Criteria:
 *
 * 1. Have >=2 of dragon tiles
 *    - All 3 dragon tiles = great scholars
 *    - 2 of any dragon tiles = small scholars
 *
 * Early escapes
 *
 * - None
 */
export default function (hand: HAND): ThreeScholarResponse {
  const handToAnalyze = mergeSortedTilesArray(hand.open, hand.closed);

  const tiles: TILES[] = [
    HONOR_TILES.DRAGON_RED,
    HONOR_TILES.DRAGON_GREEN,
    HONOR_TILES.DRAGON_WHITE,
  ];
  let numberOfDragons: number = 0;
  for (let i = 0; i < tiles.length; i++) {
    const thisTile = tiles[i];

    const matchingTiles = findTile(handToAnalyze, thisTile);
    if (matchingTiles.length >= 3) numberOfDragons++;

    if (numberOfDragons === 3) return "great"; // We can insert this to exit early
  }

  if (numberOfDragons === 2) return "small";
  return false;
}
