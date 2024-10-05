import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, NUMBER_TILES } from "../../../tiles/tiles";
import honorsAndTerminals from "./honorsAndTerminals";

type TestDataType = {
  description: string;
  given: HAND;
};

// Valid test cases for "All Honors"
const validTestCases: TestDataType[] = [
  {
    description:
      "Pure terminals with triplets, 1 quadruplets, and pair (closed hand with bonus tile)",
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
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2", "CIRCLE_NINE_3"],
        },
        { tile: NUMBER_TILES.MYRIAD_ONE, id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2"] }, // Pair
        { tile: BONUS_TILES.FLOWER_PLUM, id: ["FLOWER_PLUM_1"] }, // Bonus tile
      ],
    },
  },
  {
    description:
      "Pure terminals with triplets and pair (closed hand with bonus tile)",
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
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2", "CIRCLE_NINE_3"],
        },
        { tile: NUMBER_TILES.MYRIAD_ONE, id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2"] }, // Pair
        { tile: BONUS_TILES.FLOWER_PLUM, id: ["FLOWER_PLUM_1"] }, // Bonus tile
      ],
    },
  },
  {
    description:
      "Pure terminals with triplets and pair (semi-open hand with bonus tile)",
    given: {
      open: [
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: ["MYRIAD_NINE_1", "MYRIAD_NINE_2", "MYRIAD_NINE_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2"],
        }, // Pair
        { tile: BONUS_TILES.FLOWER_PLUM, id: ["FLOWER_PLUM_1"] }, // Bonus tile
      ],
    },
  },
  {
    description: "Pure terminals with triplets and pair (closed hand)",
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
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2", "CIRCLE_NINE_3"],
        },
        { tile: NUMBER_TILES.MYRIAD_ONE, id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2"] }, // Pair
      ],
    },
  },
  {
    description: "Pure terminals with triplets and pair (semi-open hand)",
    given: {
      open: [
        {
          tile: NUMBER_TILES.MYRIAD_NINE,
          id: ["MYRIAD_NINE_1", "MYRIAD_NINE_2", "MYRIAD_NINE_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_ONE,
          id: ["CIRCLE_ONE_1", "CIRCLE_ONE_2", "CIRCLE_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_2"],
        }, // Pair
      ],
    },
  },
];

describe("Pure Terminals (清幺九/清老头)", () => {
  _.forEach(validTestCases, ({ description, given }) =>
    test(description, () =>
      expect(honorsAndTerminals(given)).toEqual("pureTerminals"),
    ),
  );
});
