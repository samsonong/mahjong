import { TILE_TYPE } from "./tiles";

// Linear Congruential Generator (LCG) algorithm for randomizing with a seed
const lcg_multiplier = 9301;
const lcg_increment = 49297;
const lcg_modulus = 233280;

// Function to shuffle tiles
export function shuffleTiles(tiles: TILE_TYPE[]): {
  seed: number;
  tiles: TILE_TYPE[];
} {
  const seed = Date.now(); // Use current timestamp as seed
  let rand = seed; // Initialize rand with the seed

  for (let i = tiles.length - 1; i > 0; i--) {
    // Update random number based on the current seed
    rand = (rand * lcg_multiplier + lcg_increment) % lcg_modulus;
    const j = Math.floor((rand / lcg_modulus) * (i + 1));

    // Swap elements
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  return { seed, tiles };
}
