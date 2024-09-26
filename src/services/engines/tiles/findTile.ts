import { SORTED_TILES } from "./sortTiles";
import { TILES } from "./tiles";

export function findTile(sortedTiles: SORTED_TILES[], tile: TILES): string[] {
  const matchingTile: SORTED_TILES | undefined = sortedTiles.find(
    (v) => v.tile === tile
  );
  return matchingTile?.id ?? [];
}
