import { SORTED_TILES } from "../../tiles/sortTiles";
import checkTripletsAndSequences from "./checkTripletsAndSequences";
import findPairs from "./findPairs";

type Response = "triplets" | "sequences" | "mixed" | false;

export default function (closedHand: SORTED_TILES[]): Response {
  const pairs = findPairs(closedHand);
  if (pairs.length === 0) return false;

  for (let i = 0; i < pairs.length; i++) {
    const result = checkTripletsAndSequences(pairs[i].remaining);
    if (result) return result;
  }

  return false;
}
