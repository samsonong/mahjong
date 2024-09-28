import { SORTED_TILES } from "../../tiles/sortTiles";
import { TILES } from "../../tiles/tiles";

type PossibleCombinations = {
  pair: SORTED_TILES["tile"];
  remaining: SORTED_TILES[];
}[];

export default function (tiles: SORTED_TILES[]): PossibleCombinations {
  const output: PossibleCombinations = [];
  for (let i = 0; i < tiles.length; i++) {
    const thisTile = tiles[i];
    if (thisTile.id.length < 2) continue; // No pairs

    const pair: TILES = thisTile.tile;
    const remaining: SORTED_TILES[] = [];

    remaining.push(...tiles.slice(0, i)); // Push previous elements
    if (thisTile.id.length >= 3) {
      remaining.push({ id: thisTile.id.slice(2), tile: thisTile.tile });
    }
    remaining.push(...tiles.slice(i + 1));

    output.push({ pair, remaining });
  }

  return output;
}
