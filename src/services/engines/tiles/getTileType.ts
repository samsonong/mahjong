import { TILES, NUMBER_TILES, HONOR_TILES, BONUS_TILES } from "./tiles";

export default function (
  tile: TILES,
): "NUMBER_TILES" | "HONOR_TILES" | "BONUS_TILES" {
  if (Object.values(NUMBER_TILES).includes(tile as NUMBER_TILES)) {
    return "NUMBER_TILES";
  }
  if (Object.values(HONOR_TILES).includes(tile as HONOR_TILES)) {
    return "HONOR_TILES";
  }
  if (Object.values(BONUS_TILES).includes(tile as BONUS_TILES)) {
    return "BONUS_TILES";
  }

  throw new Error("Phantom tile?");
}
