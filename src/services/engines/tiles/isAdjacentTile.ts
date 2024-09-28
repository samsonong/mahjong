import { SORTED_TILES } from "./sortTiles";

export default function (
  tileOne: SORTED_TILES,
  tileTwo: SORTED_TILES
): boolean {
  const [xSuit, xNumber] = tileOne.tile.split("_");
  const [ySuit, yNumber] = tileTwo.tile.split("_");

  if (xSuit !== ySuit) return false;
  return isAdjacent(xNumber, yNumber);
}

const ENGLISH_NUMBER_ARRAY: string[] = [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
];

function isAdjacent(x: string, y: string): boolean {
  return (
    ENGLISH_NUMBER_ARRAY[ENGLISH_NUMBER_ARRAY.findIndex((v) => v === x) + 1] ===
    y
  );
}
