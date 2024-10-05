import { HAND } from "../../../player/player";
import { findTile } from "../../../tiles/findTile";
import { HONOR_TILES, NUMBER_TILES, TILES } from "../../../tiles/tiles";

/**
 * Criteria:
 *
 * 1. Have 1 of all honor tiles & terminal number tiles (1/9 of bamboo/circle/myriad)
 * 2. Exactly one pair
 *
 * Early escape:
 *
 * a. One of (1) has >2 tiles
 * b. More than one pair
 */
export default function (hand: HAND): boolean {
  const handToAnalyze = hand.closed;

  const tiles: TILES[] = [
    NUMBER_TILES.BAMBOO_ONE,
    NUMBER_TILES.BAMBOO_NINE,
    NUMBER_TILES.CIRCLE_ONE,
    NUMBER_TILES.CIRCLE_NINE,
    NUMBER_TILES.MYRIAD_ONE,
    NUMBER_TILES.MYRIAD_NINE,
    HONOR_TILES.WIND_NORTH,
    HONOR_TILES.WIND_SOUTH,
    HONOR_TILES.WIND_EAST,
    HONOR_TILES.WIND_WEST,
    HONOR_TILES.DRAGON_RED,
    HONOR_TILES.DRAGON_GREEN,
    HONOR_TILES.DRAGON_WHITE,
  ];
  let hasPair: boolean = false;
  for (let i = 0; i < tiles.length; i++) {
    const thisTile = tiles[i];

    const matchingTiles = findTile(handToAnalyze, thisTile);
    if (matchingTiles.length === 1) continue;
    if (matchingTiles.length === 2) {
      if (hasPair) return false;

      hasPair = true;
      continue;
    }

    return false;
  }
  return hasPair;
}
