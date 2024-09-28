import discardTiles from "../../tiles/discardTiles";
import isAdjacentTile from "../../tiles/isAdjacentTile";
import { SORTED_TILES } from "../../tiles/sortTiles";

type Response = "triplets" | "sequences" | "mixed" | "pair" | false;

/**
 *
 * Caveats
 * - This function is meant to be used on the CLOSED HAND
 * - Since you need 2+3n in order to ron, the fourth tile is treated as a non-triplet
 */
export default function (closedHand: SORTED_TILES[]): Response {
  return handler(closedHand);
}

function handler(input: SORTED_TILES[]): Response {
  const firstTile = input[0];

  // * Attmept triplets
  const triplets =
    firstTile.tile === input[1].tile && firstTile.tile === input[2].tile;
  if (triplets) {
    if (input.length === 3) return "triplets"; // ! END recursive if end of array

    const recursive = handler(input.slice(3));
    return recursive === "sequences" ? "mixed" : recursive;
  }

  // * Attempt sequence
  const isAdjacent = isAdjacentTile(firstTile, input[1]);
  if (!isAdjacent) return false;
  const isSequence = isAdjacentTile(input[1], input[2]);
  if (!isSequence) return false;

  if (input.length === 3) return "sequences"; // ! END recursive if end of array

  // * Remove melded sequence tiles from array
  const { updatedTiles: firstTileRemoved } = discardTiles(
    input,
    firstTile.tile
  );
  const { updatedTiles: nextTileRemoved } = discardTiles(
    firstTileRemoved,
    input[1].tile
  );
  const { updatedTiles: lastTileRemoved } = discardTiles(
    nextTileRemoved,
    input[2].tile
  );
  const recursive = handler(lastTileRemoved);
  return recursive === "triplets" ? "mixed" : recursive;
}
