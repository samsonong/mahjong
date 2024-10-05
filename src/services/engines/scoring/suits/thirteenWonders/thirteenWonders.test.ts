import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";
import thirteenWonders from "./thirteenWonders";

type TestDataType = {
  description: string;
  given: HAND;
  expected: boolean;
};

const validTestCases: TestDataType[] = [
  {
    description: "Thirteen wonders with white dragon pair",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_2"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: ["MYRIAD_NINE_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_2"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2", "DRAGON_WHITE_3"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Thirteen wonders with bamboo one pair",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_2"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: ["MYRIAD_NINE_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_2"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Thirteen wonders with north wind pair + bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
        {
          tile: BONUS_TILES.FLOWER_BAMBOO,
          id: ["FLOWER_BAMBOO_1"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_2"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: ["MYRIAD_NINE_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_2"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_2"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_2"],
        },
      ],
    },
    expected: true,
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

describe("Pure Green (绿一色)", () => {
  _.forEach(validTestCases, ({ description, given, expected }) =>
    test(description, () => expect(thirteenWonders(given)).toEqual(expected)),
  );
  _.forEach(invalidTestCases, ({ description, given, expected }) =>
    test(description, () => expect(thirteenWonders(given)).toEqual(expected)),
  );
});
