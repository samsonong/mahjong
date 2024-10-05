import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";
import threeScholars, { ThreeScholarResponse } from "./threeScholars";

type TestDataType = {
  description: string;
  given: HAND;
  expected: ThreeScholarResponse;
};

const validTestCases: TestDataType[] = [
  {
    description: "Three scholars pure honors",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2", "WIND_WEST_3", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2", "DRAGON_WHITE_3", "DRAGON_WHITE_4"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Three scholars with number tiles",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2", "DRAGON_WHITE_3", "DRAGON_WHITE_4"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Three scholars semi open",
    given: {
      open: [
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2", "WIND_WEST_3", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2", "DRAGON_WHITE_3", "DRAGON_WHITE_4"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Three scholars semi open with bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.SEASON_SPRING,
          id: ["SEASON_SPRING_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_WORM,
          id: ["ANIMAL_WORM_1"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2", "WIND_WEST_3", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2", "DRAGON_WHITE_3", "DRAGON_WHITE_4"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Small three scholars semi open with bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.SEASON_SPRING,
          id: ["SEASON_SPRING_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_WORM,
          id: ["ANIMAL_WORM_1"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2", "WIND_WEST_3", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_4", "WIND_SOUTH_2", "WIND_SOUTH_1"],
        },
      ],
    },
    expected: "small",
  },
];

const invalidTestCases = [
  {
    description: "Invalid case",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2", "MYRIAD_ONE_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_TWO,
          id: ["MYRIAD_TWO_1", "MYRIAD_TWO_2", "MYRIAD_TWO_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_THREE,
          id: ["MYRIAD_THREE_1", "MYRIAD_THREE_2", "MYRIAD_THREE_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2"],
        },
      ],
    },
    expected: false,
  },
];

describe("Thirteen wonders (十三幺)", () => {
  _.forEach(validTestCases, ({ description, given, expected }) =>
    test(description, () => expect(threeScholars(given)).toEqual(expected)),
  );
  _.forEach(invalidTestCases, ({ description, given, expected }) =>
    test(description, () => expect(threeScholars(given)).toEqual(expected)),
  );
});
