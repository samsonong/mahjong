import { BONUS_TILES, HONOR_TILES, TILE_TYPE, TILES } from "./tiles";

export type SORTED_TILES = {
  id: string[]; // count(id) to determine how mnay tiles there are
  tile: TILES | HONOR_TILES | BONUS_TILES;
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
