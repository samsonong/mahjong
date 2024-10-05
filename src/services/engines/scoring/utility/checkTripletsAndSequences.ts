import isAdjacentTile from "../../tiles/isAdjacentTile";
import removeSequenceSet from "../../tiles/removeSequenceSet";
import { SORTED_TILES } from "../../tiles/sortTiles";

type Response = "triplets" | "sequences" | "mixed" | "pair" | false;

/**
 * ! This function is meant to be used on CLOSED HAND WITHOUT PAIRS
 *
 * Since you need 2+3n in order to ron, the fourth tile is treated as a non-triplet
 */
export default function (closedHand: SORTED_TILES[]): Response {
  return handler(closedHand);
}

function handler(input: SORTED_TILES[]): Response {
  const firstTile = input[0];

  // * Attmept triplets
  const triplets = firstTile.id.length >= 3;
  if (triplets) {
    if (input.length === 1) return "triplets"; // ! END recursive if end of array

    const recursive = handler(input.slice(1));
    return recursive === "sequences" ? "mixed" : recursive;
  }

  // * Attempt sequence
  const isAdjacent = isAdjacentTile(firstTile.tile, input[1].tile);
  if (!isAdjacent) return false;
  const isSequence = isAdjacentTile(input[1].tile, input[2].tile);
  if (!isSequence) return false;

  // * Remove melded sequence tiles from array
  const { updatedTiles: sequenceTilesRemoved } = removeSequenceSet(input, [
    firstTile.tile,
    input[1].tile,
    input[2].tile,
  ]);
  if (sequenceTilesRemoved.length === 0) return "sequences";

  const recursive = handler(sequenceTilesRemoved);
  return recursive === "triplets" ? "mixed" : recursive;
}
