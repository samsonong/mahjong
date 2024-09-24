import { SORTED_TILES } from "./sortTiles";
import { TILE_TYPE } from "./tiles";

export default function (
  sortedTiles: SORTED_TILES[],
  newTiles: TILE_TYPE[]
): SORTED_TILES[] {
  const updatedTiles = [...sortedTiles];

  newTiles.forEach(({ tile, id }) => {
    const existingGroup = updatedTiles.find((group) => group.tile === tile);
    if (existingGroup) {
      existingGroup.id.push(id); // Add the tile id to the existing group
    } else {
      updatedTiles.push({
        tile,
        id: [id], // Create a new group for the new tile
      });
    }
  });

  return updatedTiles;
}
