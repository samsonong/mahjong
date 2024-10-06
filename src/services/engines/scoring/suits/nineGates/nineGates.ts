import { HAND } from "../../../player/player";
import getTileType from "../../../tiles/getTileType";
import { mergeSortedTilesArray } from "../../../tiles/sortTiles";
import splitNumberTile from "../../../tiles/splitNumberTile";
import { NUMBER_TILE_SUITS } from "../../../tiles/tiles";

/**
 * Criterias
 * - 111-2345678-999 of a single number suit
 * - +1 of any tiles from the same suit
 *
 * Early escapes
 * - Tiles from two suits
 * - Honor tiles
 */
export default function (hand: HAND): boolean {
  const handToAnalyze = mergeSortedTilesArray(hand.open, hand.closed);

  // fourteenthTile to track exactly 1 extra 1~9 tile
  let fourteenthTile: boolean = false;
  let thisSuit: NUMBER_TILE_SUITS | undefined = undefined;
  let numberCheck: string = "123456789";
  for (let i = 0; i < handToAnalyze.length; i++) {
    const thisGroup = handToAnalyze[i];

    // Escape honor tiles, skip bonus tiles
    const tileType = getTileType(thisGroup.tile);
    if (tileType === "HONOR_TILES") return false;
    if (tileType === "BONUS_TILES") continue;

    // Check consistent suit type
    const { suit, number } = splitNumberTile(thisGroup.tile);
    if (!thisSuit) thisSuit = suit;
    else if (thisSuit !== suit) return false;

    // Remove this tile number from check
    numberCheck = numberCheck.replace(number.toString(), "");

    // Handle according to number of tiles
    const numberOfTiles = thisGroup.id.length;
    if (number === 1 || number === 9) {
      if (numberOfTiles === 3) continue;
      if (numberOfTiles <= 2) return false;
    } else {
      if (numberOfTiles === 1) continue;
      if (numberOfTiles >= 3) return false;
    }
    // Handle 4 x 1/9 or 2 x 2~8
    if (fourteenthTile) return false;
    fourteenthTile = true;
  }

  if (numberCheck.length === 0) return true;
  return false;
}
