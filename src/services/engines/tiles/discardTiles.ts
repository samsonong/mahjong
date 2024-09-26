import { SORTED_TILES } from "./sortTiles";
import { TILES } from "./tiles";

export default function (
  sortedTiles: SORTED_TILES[],
  tile: TILES,
  count: number = 1
): { updatedTiles: SORTED_TILES[]; discardedTilesId: string[] } {
  const discardedTilesId: string[] = [];

  const updatedTiles = sortedTiles
    .map((group) => {
      if (group.tile === tile) {
        // Check how many tiles are available
        const availableCount = group.id.length;

        // Throw an error if trying to discard more tiles than available
        if (count > availableCount) {
          throw new Error(
            `Cannot discard ${count} tiles. Only ${availableCount} available.`
          );
        }

        // Get the IDs of the tiles to discard
        const tilesToDiscard = group.id.slice(0, count);
        discardedTilesId.push(...tilesToDiscard);

        // Return the updated group with the remaining tiles
        return { ...group, id: group.id.slice(count) };
      }
      return group;
    })
    .filter((group) => group.id.length > 0); // Remove empty groups

  return { updatedTiles, discardedTilesId };
}
