/* eslint-disable @typescript-eslint/no-unused-vars */
import { HAND } from "../player/player";
import { findTile } from "../tiles/findTile";
import { mergeSortedTilesArray, SORTED_TILES } from "../tiles/sortTiles";
import { HONOR_TILES, NUMBER_TILES, TILES } from "../tiles/tiles";

export default function (hand: HAND) {
  // Combine open and closed hand for calculation
  const { open, closed } = hand;
  const fullHand: SORTED_TILES[] = mergeSortedTilesArray(open, closed);
}
