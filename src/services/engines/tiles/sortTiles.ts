import { TILE_TYPE, TILES } from "./tiles";

export type SORTED_TILES = {
  id: string[]; // count(id) to determine how mnay tiles there are
  tile: TILES;
};

export default function (tiles: TILE_TYPE[]): SORTED_TILES[] {
  const groupedTiles: { [key: string]: SORTED_TILES } = {};

  tiles.forEach(({ tile, id }) => {
    if (groupedTiles[tile]) {
      groupedTiles[tile].id.push(id);
    } else {
      groupedTiles[tile] = {
        tile,
        id: [id],
      };
    }
  });

  return Object.values(groupedTiles);
}

export function mergeSortedTilesArray(
  tilesA: SORTED_TILES[],
  tilesB: SORTED_TILES[]
): SORTED_TILES[] {
  const combinedTilesMap = new Map<string, SORTED_TILES>();

  const mergeTiles = (tiles: SORTED_TILES[]) => {
    tiles.forEach(({ tile, id }) => {
      const tileKey = tile.toString();

      if (combinedTilesMap.has(tileKey)) {
        combinedTilesMap.get(tileKey)!.id.push(...id);
      } else {
        combinedTilesMap.set(tileKey, { tile, id: [...id] });
      }
    });
  };

  // Merge both arrays
  mergeTiles(tilesA);
  mergeTiles(tilesB);

  // Return the combined values as an array
  return Array.from(combinedTilesMap.values());
}
