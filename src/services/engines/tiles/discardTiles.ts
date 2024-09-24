import { SORTED_TILES } from "./sortTiles";
import { BONUS_TILES, HONOR_TILES, TILES } from "./tiles";

export default function (
  sortedTiles: SORTED_TILES[],
  tile: TILES | HONOR_TILES | BONUS_TILES
): { updatedTiles: SORTED_TILES[]; discardedId: string | null } {
  let discardedId: string | null = null;

  const updatedTiles = sortedTiles
    .map((group) => {
      if (group.tile === tile && group.id.length > 0) {
        // Remove the first id and store it as the discarded ID
        discardedId = group.id[0];
        return { ...group, id: group.id.slice(1) };
      }
      return group;
    })
    .filter((group) => group.id.length > 0); // Remove empty groups

  return { updatedTiles, discardedId };
}
