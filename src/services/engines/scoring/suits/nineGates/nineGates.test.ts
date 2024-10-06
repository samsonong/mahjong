import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";
import nineGates from "./nineGates";

type TestDataType = {
  description: string;
  given: HAND;
  expected: boolean;
};

const validTestCases: TestDataType[] = [
  {
    description: "Valid Nine Gates hand with 1 suit (Bamboo)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        { tile: NUMBER_TILES.BAMBOO_TWO, id: ["BAMBOO_TWO_1"] },
        { tile: NUMBER_TILES.BAMBOO_THREE, id: ["BAMBOO_THREE_1"] },
        { tile: NUMBER_TILES.BAMBOO_FOUR, id: ["BAMBOO_FOUR_1"] },
        { tile: NUMBER_TILES.BAMBOO_FIVE, id: ["BAMBOO_FIVE_1"] },
        { tile: NUMBER_TILES.BAMBOO_SIX, id: ["BAMBOO_SIX_1"] },
        { tile: NUMBER_TILES.BAMBOO_SEVEN, id: ["BAMBOO_SEVEN_1"] },
        { tile: NUMBER_TILES.BAMBOO_EIGHT, id: ["BAMBOO_EIGHT_1"] },
        { tile: NUMBER_TILES.BAMBOO_ONE, id: ["BAMBOO_ONE_4"] }, // 14th tile, extra 1
      ],
    },
    expected: true,
  },
  {
    description: "Valid Nine Gates hand with quadruplets",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3", "BAMBOO_ONE_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        { tile: NUMBER_TILES.BAMBOO_TWO, id: ["BAMBOO_TWO_1"] },
        { tile: NUMBER_TILES.BAMBOO_THREE, id: ["BAMBOO_THREE_1"] },
        { tile: NUMBER_TILES.BAMBOO_FOUR, id: ["BAMBOO_FOUR_1"] },
        { tile: NUMBER_TILES.BAMBOO_FIVE, id: ["BAMBOO_FIVE_1"] },
        { tile: NUMBER_TILES.BAMBOO_SIX, id: ["BAMBOO_SIX_1"] },
        { tile: NUMBER_TILES.BAMBOO_SEVEN, id: ["BAMBOO_SEVEN_1"] },
        { tile: NUMBER_TILES.BAMBOO_EIGHT, id: ["BAMBOO_EIGHT_1"] },
      ],
    },
    expected: true,
  },
  {
    description: "Valid Nine Gates hand with a pair",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        { tile: NUMBER_TILES.BAMBOO_TWO, id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2"] },
        { tile: NUMBER_TILES.BAMBOO_THREE, id: ["BAMBOO_THREE_1"] },
        { tile: NUMBER_TILES.BAMBOO_FOUR, id: ["BAMBOO_FOUR_1"] },
        { tile: NUMBER_TILES.BAMBOO_FIVE, id: ["BAMBOO_FIVE_1"] },
        { tile: NUMBER_TILES.BAMBOO_SIX, id: ["BAMBOO_SIX_1"] },
        { tile: NUMBER_TILES.BAMBOO_SEVEN, id: ["BAMBOO_SEVEN_1"] },
        { tile: NUMBER_TILES.BAMBOO_EIGHT, id: ["BAMBOO_EIGHT_1"] },
      ],
    },
    expected: true,
  },
  {
    description: "Valid Nine Gates hand with quadruplet of 9 (Myriad)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2", "MYRIAD_ONE_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: [
            "MYRIAD_NINE_1",
            "MYRIAD_NINE_2",
            "MYRIAD_NINE_3",
            "MYRIAD_NINE_4",
          ],
        }, // Quadruplet
        { tile: NUMBER_TILES.MYRIAD_TWO, id: ["MYRIAD_TWO_1"] },
        { tile: NUMBER_TILES.MYRIAD_THREE, id: ["MYRIAD_THREE_1"] },
        { tile: NUMBER_TILES.MYRIAD_FOUR, id: ["MYRIAD_FOUR_1"] },
        { tile: NUMBER_TILES.MYRIAD_FIVE, id: ["MYRIAD_FIVE_1"] },
        { tile: NUMBER_TILES.MYRIAD_SIX, id: ["MYRIAD_SIX_1"] },
        { tile: NUMBER_TILES.MYRIAD_SEVEN, id: ["MYRIAD_SEVEN_1"] },
        { tile: NUMBER_TILES.MYRIAD_EIGHT, id: ["MYRIAD_EIGHT_1"] },
      ],
    },
    expected: true,
  },
];

const invalidTestCases = [
  {
    description: "Invalid hand with honor tiles",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2", "CIRCLE_NINE_3"],
        },
        { tile: NUMBER_TILES.CIRCLE_TWO, id: ["CIRCLE_TWO_1"] },
        { tile: NUMBER_TILES.CIRCLE_THREE, id: ["CIRCLE_THREE_1"] },
        { tile: HONOR_TILES.DRAGON_RED, id: ["DRAGON_RED_1"] }, // Honor tile (invalid)
        { tile: NUMBER_TILES.CIRCLE_FOUR, id: ["CIRCLE_FOUR_1"] },
        { tile: NUMBER_TILES.CIRCLE_FIVE, id: ["CIRCLE_FIVE_1"] },
        { tile: NUMBER_TILES.CIRCLE_SIX, id: ["CIRCLE_SIX_1"] },
        { tile: NUMBER_TILES.CIRCLE_SEVEN, id: ["CIRCLE_SEVEN_1"] },
        { tile: NUMBER_TILES.CIRCLE_EIGHT, id: ["CIRCLE_EIGHT_1"] },
      ],
    },
    expected: false,
  },
  {
    description: "Invalid hand with two suits (Circle and Bamboo)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        }, // Bamboo suit
        { tile: NUMBER_TILES.CIRCLE_TWO, id: ["CIRCLE_TWO_1"] },
        { tile: NUMBER_TILES.CIRCLE_THREE, id: ["CIRCLE_THREE_1"] },
        { tile: NUMBER_TILES.CIRCLE_FOUR, id: ["CIRCLE_FOUR_1"] },
        { tile: NUMBER_TILES.CIRCLE_FIVE, id: ["CIRCLE_FIVE_1"] },
        { tile: NUMBER_TILES.CIRCLE_SIX, id: ["CIRCLE_SIX_1"] },
        { tile: NUMBER_TILES.CIRCLE_SEVEN, id: ["CIRCLE_SEVEN_1"] },
        { tile: NUMBER_TILES.CIRCLE_EIGHT, id: ["CIRCLE_EIGHT_1"] },
        { tile: NUMBER_TILES.CIRCLE_ONE, id: ["CIRCLE_ONE_4"] }, // 14th tile, extra 1
      ],
    },
    expected: false,
  },

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

describe("Nine Gates (九连宝登)", () => {
  _.forEach(validTestCases, ({ description, given, expected }) =>
    test(description, () => expect(nineGates(given)).toEqual(expected)),
  );
  _.forEach(invalidTestCases, ({ description, given, expected }) =>
    test(description, () => expect(nineGates(given)).toEqual(expected)),
  );
});
