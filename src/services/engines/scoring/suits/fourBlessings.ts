import { findTile } from "../../tiles/findTile";
import { SORTED_TILES } from "../../tiles/sortTiles";
import { TILES, HONOR_TILES } from "../../tiles/tiles";

export default function (hand: SORTED_TILES[]): "great" | "small" | false {
  /**
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

    const matchingTiles = findTile(hand, thisTile);
    if (matchingTiles.length >= 3) numberOfWinds++;
  }

  if (numberOfWinds === 3) return "small";
  if (numberOfWinds === 4) return "great";
  return false;
}
