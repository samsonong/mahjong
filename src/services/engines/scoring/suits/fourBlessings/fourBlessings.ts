import { HAND } from "../../../player/player";
import { findTile } from "../../../tiles/findTile";
import { mergeSortedTilesArray } from "../../../tiles/sortTiles";
import { HONOR_TILES, TILES } from "../../../tiles/tiles";

export type FourBlessingResponse = "great" | "small" | false;

/**
 * ! THIS DOES NOT CHECK FOR HAND COMPLETENESS TO AVOID DOUBLE-PROCESSING
 *
 * Criteria:
 *
 * 1. Have >=3 of wind tiles
 *    - All 4 wind tiles = great blessing
 *    - 3 of any wind tiles = small blessing
 *
 * Early escapes
 *
 * a. When i = 2 and numberOfWind === 0 (can't reach criteria)
 */
export default function (hand: HAND): FourBlessingResponse {
  const handToAnalyze = mergeSortedTilesArray(hand.open, hand.closed);

  // Check for honor tiles first (less computationally intensive)
  const tiles: TILES[] = [
    HONOR_TILES.WIND_NORTH,
    HONOR_TILES.WIND_SOUTH,
    HONOR_TILES.WIND_EAST,
    HONOR_TILES.WIND_WEST,
  ];
  let numberOfWinds: number = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (i === 2 && numberOfWinds === 0) return false;

    const thisTile = tiles[i];

    const matchingTiles = findTile(handToAnalyze, thisTile);
    if (matchingTiles.length >= 3) numberOfWinds++;
  }

  // Early escape if insufficent wind triplets
  if (numberOfWinds === 4) return "great";
  if (numberOfWinds === 3) return "small";
  return false;
}
