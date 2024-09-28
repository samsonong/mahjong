import { findTile } from "../../tiles/findTile";
import { SORTED_TILES } from "../../tiles/sortTiles";
import { TILES, HONOR_TILES } from "../../tiles/tiles";

export default function (hand: SORTED_TILES[]): "great" | "small" | false {
  /**
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
  const tiles: TILES[] = [
    HONOR_TILES.DRAGON_RED,
    HONOR_TILES.DRAGON_GREEN,
    HONOR_TILES.DRAGON_WHITE,
  ];
  let numberOfWinds: number = 0;
  for (let i = 0; i < tiles.length; i++) {
    const thisTile = tiles[i];

    const matchingTiles = findTile(hand, thisTile);
    if (matchingTiles.length >= 3) numberOfWinds++;
  }

  if (numberOfWinds === 2) return "small";
  if (numberOfWinds === 3) return "great";
  return false;
}
