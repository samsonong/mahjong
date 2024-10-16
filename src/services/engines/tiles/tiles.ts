import shuffleTiles from "./shuffleTiles";

export type TILES =
  | NUMBER_TILES
  | HONOR_TILES
  | WIND_TILES
  | DRAGON_TILES
  | BONUS_TILES;
export type NUMBER_TILE_SUITS = "CIRCLE" | "MYRIAD" | "BAMBOO";
export type NUMBER_TILE_NUMBERS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum NUMBER_TILES {
  CIRCLE_ONE = "CIRCLE_ONE",
  CIRCLE_TWO = "CIRCLE_TWO",
  CIRCLE_THREE = "CIRCLE_THREE",
  CIRCLE_FOUR = "CIRCLE_FOUR",
  CIRCLE_FIVE = "CIRCLE_FIVE",
  CIRCLE_SIX = "CIRCLE_SIX",
  CIRCLE_SEVEN = "CIRCLE_SEVEN",
  CIRCLE_EIGHT = "CIRCLE_EIGHT",
  CIRCLE_NINE = "CIRCLE_NINE",
  BAMBOO_ONE = "BAMBOO_ONE",
  BAMBOO_TWO = "BAMBOO_TWO",
  BAMBOO_THREE = "BAMBOO_THREE",
  BAMBOO_FOUR = "BAMBOO_FOUR",
  BAMBOO_FIVE = "BAMBOO_FIVE",
  BAMBOO_SIX = "BAMBOO_SIX",
  BAMBOO_SEVEN = "BAMBOO_SEVEN",
  BAMBOO_EIGHT = "BAMBOO_EIGHT",
  BAMBOO_NINE = "BAMBOO_NINE",
  MYRIAD_ONE = "MYRIAD_ONE",
  MYRIAD_TWO = "MYRIAD_TWO",
  MYRIAD_THREE = "MYRIAD_THREE",
  MYRIAD_FOUR = "MYRIAD_FOUR",
  MYRIAD_FIVE = "MYRIAD_FIVE",
  MYRIAD_SIX = "MYRIAD_SIX",
  MYRIAD_SEVEN = "MYRIAD_SEVEN",
  MYRIAD_EIGHT = "MYRIAD_EIGHT",
  MYRIAD_NINE = "MYRIAD_NINE",
}

export enum WIND_TILES {
  WIND_NORTH = "WIND_NORTH",
  WIND_SOUTH = "WIND_SOUTH",
  WIND_EAST = "WIND_EAST",
  WIND_WEST = "WIND_WEST",
}

export enum DRAGON_TILES {
  DRAGON_RED = "DRAGON_RED",
  DRAGON_GREEN = "DRAGON_GREEN",
  DRAGON_WHITE = "DRAGON_WHITE",
}

export enum HONOR_TILES {
  WIND_NORTH = "WIND_NORTH",
  WIND_SOUTH = "WIND_SOUTH",
  WIND_EAST = "WIND_EAST",
  WIND_WEST = "WIND_WEST",
  DRAGON_RED = "DRAGON_RED",
  DRAGON_GREEN = "DRAGON_GREEN",
  DRAGON_WHITE = "DRAGON_WHITE",
}

export enum BONUS_TILES {
  SEASON_SPRING = "SEASON_SPRING",
  SEASON_SUMMER = "SEASON_SUMMER",
  SEASON_AUTUMN = "SEASON_AUTUMN",
  SEASON_WINTER = "SEASON_WINTER",
  FLOWER_PLUM = "FLOWER_PLUM",
  FLOWER_ORCHID = "FLOWER_ORCHID",
  FLOWER_CHRYSANTHEMUM = "FLOWER_CHRYSANTHEMUM",
  FLOWER_BAMBOO = "FLOWER_BAMBOO",
  ANIMAL_CAT = "ANIMAL_CAT",
  ANIMAL_MOUSE = "ANIMAL_MOUSE",
  ANIMAL_CHICKEN = "ANIMAL_CHICKEN",
  ANIMAL_WORM = "ANIMAL_WORM",
}

export type TILE_TYPE = {
  tile: TILES;
  id: string;
};

export function initTiles(): {
  seed: number;
  tiles: TILE_TYPE[];
} {
  const tiles: TILE_TYPE[] = [];

  // Most tiles have 4 copies
  for (let i = 1; i <= 4; i++) {
    tiles.push(
      ...Object.values(NUMBER_TILES).flatMap((v) => ({
        tile: v,
        id: `${v}_${i}`,
      })),
    );
    tiles.push(
      ...Object.values(HONOR_TILES).flatMap((v) => ({
        tile: v,
        id: `${v}_${i}`,
      })),
    );
  }

  // Bonus tiles only has 1 copy
  tiles.push(
    ...Object.values(BONUS_TILES).flatMap((v) => ({
      tile: v,
      id: `${v}_1`,
    })),
  );

  // Shuffle the tiles
  const shuffledTiles = shuffleTiles(tiles);

  return shuffledTiles;
}
