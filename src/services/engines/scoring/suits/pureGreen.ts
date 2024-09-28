import { HAND } from "../../player/player";
import { SORTED_TILES } from "../../tiles/sortTiles";
import { HONOR_TILES, NUMBER_TILES, TILES } from "../../tiles/tiles";
import checkTripletsAndSequences from "../utility/checkTripletsAndSequences";
import findPairs from "../utility/findPairs";

/**
 * Criteria:
 *
 * 1. Form a legal winning hand comprising of only green tiles
 *
 * Early escapes
 *
 * a. Dand has non-green tiles
 * b. BAMBOO_SIX, BAMBOO_EIGHT, and DRAGON_GREEN are not triplets (tolerance of 1 pair)
 * c. Remaining tiles cannot be melded
 */
export default function (hand: HAND): boolean {
  const legalTiles: TILES[] = [
    NUMBER_TILES.BAMBOO_TWO,
    NUMBER_TILES.BAMBOO_THREE,
    NUMBER_TILES.BAMBOO_FOUR,
    NUMBER_TILES.BAMBOO_SIX,
    NUMBER_TILES.BAMBOO_EIGHT,
    HONOR_TILES.DRAGON_GREEN,
  ];

  const { open, closed } = hand;
  // Check open hand for non-green tiles
  for (let i = 0; i < open.length; i++) {
    const { tile } = open[i];
    if (!legalTiles.includes(tile)) return false;
  }

  // Continue processing closed hand
  const twoThreeFours: SORTED_TILES[] = [];
  let hasSixEightDragonPair: boolean = false;
  for (let i = 0; i < closed.length; i++) {
    const { id, tile } = closed[i];

    // Early escape if illegal tile
    if (!legalTiles.includes(tile)) return false;

    // These can only be triplets
    if (
      tile === NUMBER_TILES.BAMBOO_SIX ||
      tile === NUMBER_TILES.BAMBOO_EIGHT ||
      tile === HONOR_TILES.DRAGON_GREEN
    ) {
      if (id.length <= 1) return false;
      if (id.length === 2) {
        if (hasSixEightDragonPair) return false;
        hasSixEightDragonPair = true;
      }
      continue;
    }

    // Push two/three/four into array for further processing
    twoThreeFours.push({ id, tile });
  }

  // If hasSixEightDragonPair, checkTripletsAndSequences(twoThreeFours)
  if (hasSixEightDragonPair) {
    return !(checkTripletsAndSequences(twoThreeFours) === false);
  }

  // Else, detect { pair, remainder } and checkTripletsAndSequences(remainder)
  const pairs = findPairs(twoThreeFours);
  if (pairs.length === 0) return false;
  for (let i = 0; i < pairs.length; i++) {
    if (checkTripletsAndSequences(pairs[i].remaining)) return true;
  }
  return false;
}
