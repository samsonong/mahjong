import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, HONOR_TILES } from "../../../tiles/tiles";
import honorsAndTerminals from "./honorsAndTerminals";

type TestDataType = {
  description: string;
  given: HAND;
};

// Valid test cases for "All Honors"
const validTestCases: TestDataType[] = [
  {
    description: "All honors with only winds and dragons (triplets)",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2"],
        },
      ],
    },
  },
  {
    description:
      "All honors with only winds and dragons (triplets + 1 quadruplet)",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3", "WIND_EAST_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2"],
        },
      ],
    },
  },
  {
    description: "All honors with mixed triplets and quads",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3", "WIND_EAST_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3", "DRAGON_RED_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2"],
        },
      ],
    },
  },
  {
    description: "Semi-open all honors with a pair and triplets",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
  },
  {
    description:
      "All honors with triplets and pair (closed hand with bonus tile)",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: HONOR_TILES.WIND_NORTH, id: ["WIND_NORTH_1", "WIND_NORTH_2"] }, // Pair
        { tile: BONUS_TILES.FLOWER_BAMBOO, id: ["FLOWER_BAMBOO_1"] }, // Bonus tile
      ],
    },
  },
  {
    description:
      "All honors with triplets and pair (semi-open hand with bonus tile)",
    given: {
      open: [
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2", "DRAGON_WHITE_3"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: HONOR_TILES.WIND_WEST, id: ["WIND_WEST_1", "WIND_WEST_2"] }, // Pair
        { tile: BONUS_TILES.FLOWER_ORCHID, id: ["FLOWER_ORCHID_1"] }, // Bonus tile
      ],
    },
  },
];

describe("All Honors (字一色)", () => {
  _.forEach(validTestCases, ({ description, given }) =>
    test(description, () =>
      expect(honorsAndTerminals(given)).toEqual("allHonors"),
    ),
  );
});
