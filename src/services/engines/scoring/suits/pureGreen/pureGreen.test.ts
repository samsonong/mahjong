import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import fourBlessings from "../fourBlessings/fourBlessings";
import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";

type TestDataType = {
  description: string;
  given: HAND;
  expected: boolean;
};
const pureGreen: TestDataType[] = [
  {
    description: "4 triplets with number pair",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2", "BAMBOO_TWO_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_1", "BAMBOO_THREE_3", "BAMBOO_THREE_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_2", "BAMBOO_FOUR_3", "BAMBOO_FOUR_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2", "BAMBOO_EIGHT_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_1", "BAMBOO_SIX_2"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Mixed with number pair",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_1", "BAMBOO_THREE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_2", "BAMBOO_FOUR_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_1", "BAMBOO_SIX_2", "BAMBOO_SIX_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2", "BAMBOO_EIGHT_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_4"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Semi-open 4 triplets with number pair",
    given: {
      open: [
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_1", "BAMBOO_FOUR_2", "BAMBOO_FOUR_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2", "BAMBOO_EIGHT_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2", "BAMBOO_TWO_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_1", "BAMBOO_THREE_2", "BAMBOO_THREE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_1", "BAMBOO_SIX_2"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Semi-open mixed with number pair",
    given: {
      open: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_2"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_1", "BAMBOO_SIX_2", "BAMBOO_SIX_4"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_2"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2", "BAMBOO_EIGHT_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_4"],
        },
      ],
    },
    expected: true,
  },
  {
    description: "Semi-open mixed with number pair and bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.ANIMAL_CAT,
          id: ["ANIMAL_CAT_1"],
        },
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_1"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_2"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_1", "BAMBOO_SIX_2", "BAMBOO_SIX_4"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_2"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_THREE,
          id: ["BAMBOO_THREE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FOUR,
          id: ["BAMBOO_FOUR_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: ["BAMBOO_EIGHT_1", "BAMBOO_EIGHT_2", "BAMBOO_EIGHT_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_4"],
        },
      ],
    },
    expected: true,
  },
];

const invalidCases = [
  {
    description: "Non-green tiles",
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
  _.forEach(pureGreen, ({ description, given, expected }) =>
    test(description, () => expect(fourBlessings(given)).toEqual(expected)),
  );
  _.forEach(invalidCases, ({ description, given, expected }) =>
    test(description, () => expect(fourBlessings(given)).toEqual(expected)),
  );
});
