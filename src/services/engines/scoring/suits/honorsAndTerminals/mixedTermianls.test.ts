import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "../../../tiles/tiles";
import honorsAndTerminals from "./honorsAndTerminals";

type TestDataType = {
  description: string;
  given: HAND;
};

// Valid test cases for "All Honors"
const validTestCases: TestDataType[] = [
  {
    description: "Mixed terminals and honors with quadruplets (closed hand)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3", "BAMBOO_ONE_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2"],
        },
      ],
    },
  },
  {
    description: "Mixed terminals and honors (closed hand)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2"],
        },
      ],
    },
  },
  {
    description: "Mixed terminals and honors (semi-open hand)",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        { tile: HONOR_TILES.DRAGON_RED, id: ["DRAGON_RED_1", "DRAGON_RED_2"] },
      ],
    },
  },
  {
    description: "Mixed terminals and honors with bonus tile (closed hand)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: BONUS_TILES.ANIMAL_MOUSE, id: ["ANIMAL_MOUSE_1"] },
      ],
    },
  },
  {
    description: "Mixed terminals and honors with bonus tile (semi-open hand)",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        { tile: BONUS_TILES.ANIMAL_MOUSE, id: ["ANIMAL_MOUSE_1"] },
        { tile: HONOR_TILES.DRAGON_RED, id: ["DRAGON_RED_1", "DRAGON_RED_2"] },
      ],
    },
  },
];

describe("Mixed Terminals (混幺九/混老头)", () => {
  _.forEach(validTestCases, ({ description, given }) =>
    test(description, () =>
      expect(honorsAndTerminals(given)).toEqual("mixedTerminals"),
    ),
  );
});
