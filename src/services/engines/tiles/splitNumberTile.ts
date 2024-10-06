import {
  NUMBER_TILE_NUMBERS,
  NUMBER_TILE_SUITS,
  NUMBER_TILES,
  TILES,
} from "./tiles";

export default function (tile: TILES): {
  suit: NUMBER_TILE_SUITS;
  number: NUMBER_TILE_NUMBERS;
} {
  if (!Object.values(NUMBER_TILES).includes(tile as NUMBER_TILES)) {
    throw new Error(`Passed non-number tile into splitNumberTile(${tile})`);
  }

  const [suit, engNumber] = tile.split("_") as [
    suit: NUMBER_TILE_SUITS,
    engNumber: string,
  ];
  const number: NUMBER_TILE_NUMBERS = (ENGLISH_NUMBER_ARRAY.findIndex(
    (v) => v === engNumber,
  ) + 1) as NUMBER_TILE_NUMBERS;

  return { suit, number };
}

export const ENGLISH_NUMBER_ARRAY: string[] = [
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
