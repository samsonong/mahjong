import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import allHonors from "../allHonors/allHonors";
import { HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";

type TestDataType = {
  description: string;
  given: HAND;
  expected: boolean;
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
    expected: true,
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
    expected: true,
  },
  {
    description: "All honors with a pair and triplets",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2"],
        },
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
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: true,
  },
];

// Invalid test cases for "All Honors"
const invalidTestCases: TestDataType[] = [
  {
    description: "All honors with non-honor tiles (bamboo tile included)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2", "BAMBOO_TWO_3"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
      ],
    },
    expected: false,
  },
  {
    description: "All honors with an invalid honor pair and other tiles",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2"], // Invalid non-honor tile
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
      ],
    },
    expected: false,
  },
];

describe("All Honors (字一色)", () => {
  _.forEach(validTestCases, ({ description, given, expected }) =>
    test(description, () => expect(allHonors(given)).toEqual(expected)),
  );

  _.forEach(invalidTestCases, ({ description, given, expected }) =>
    test(description, () => expect(allHonors(given)).toEqual(expected)),
  );
});
