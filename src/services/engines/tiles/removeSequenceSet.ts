import discardTiles from "./discardTiles";
import isAdjacentTile from "./isAdjacentTile";
import { SORTED_TILES } from "./sortTiles";
import { TILES } from "./tiles";

export default function (
  sortedTiles: SORTED_TILES[],
  tiles: TILES[],
): { updatedTiles: SORTED_TILES[]; discardedTilesId: SORTED_TILES[] } {
  // Check if `tiles` are in sequence
  const isAdjacent =
    isAdjacentTile(tiles[0], tiles[1]) && isAdjacentTile(tiles[1], tiles[2]);
  if (!isAdjacent) {
    throw new Error(
      `Non-adjacent tiles passed into removeSequenceSet(${JSON.stringify(sortedTiles)}, ${JSON.stringify(tiles)})`,
    );
  }

  let updatedTiles: SORTED_TILES[] = sortedTiles;
  const discardedTilesId: SORTED_TILES[] = [];
  tiles.forEach((tile) => {
    const result = discardTiles(updatedTiles, tile);
    updatedTiles = result.updatedTiles;
    discardedTilesId.push(...result.discardedTilesId);
  });

  return { updatedTiles, discardedTilesId };
}
