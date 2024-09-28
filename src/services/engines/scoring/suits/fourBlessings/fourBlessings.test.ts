import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "./../../../tiles/tiles";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import fourBlessings, { FourBlessingResponse } from "./fourBlessings";
import _ from "lodash";

type TestDataType = {
  description: string;
  given: HAND;
  expected: FourBlessingResponse;
};

const fourGreatBlessings: TestDataType[] = [
  {
    description: "Four great blessings - closed, all winds",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_3"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Four great blessings - closed, all winds, bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Four great blessings - semi-open, all winds",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Four great blessings - semi-open, all winds, quadruplets",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "great",
  },
  {
    description:
      "Four great blessings - semi-open, all winds, quadruplets, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: BONUS_TILES.FLOWER_BAMBOO,
          id: ["FLOWER_BAMBOO_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_MOUSE,
          id: ["ANIMAL_MOUSE_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "great",
  },
  {
    description: "Four great blessings - semi-open, all winds, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "great",
  },
];

const fourSmallBlessings: TestDataType[] = [
  {
    description: "Four small blessings - closed, honor eyes",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.MYRIAD_SEVEN,
          id: ["MYRIAD_SEVEN_4", "MYRIAD_SEVEN_3", "MYRIAD_SEVEN_1"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - closed, honor eyes, bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FIVE,
          id: ["BAMBOO_FIVE_3", "BAMBOO_FIVE_2", "BAMBOO_FIVE_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_2", "DRAGON_RED_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - closed, number eyes",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.MYRIAD_SEVEN,
          id: ["MYRIAD_SEVEN_4", "MYRIAD_SEVEN_3", "MYRIAD_SEVEN_1"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_4", "BAMBOO_TWO_2"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - closed, number eyes, bonus tiles",
    given: {
      open: [
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FIVE,
          id: ["BAMBOO_FIVE_3", "BAMBOO_FIVE_2", "BAMBOO_FIVE_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_1", "MYRIAD_ONE_4"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, honor eyes",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_TWO,
          id: ["CIRCLE_TWO_4", "CIRCLE_TWO_2", "CIRCLE_TWO_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, honor eyes, quadruplets",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_SIX,
          id: ["MYRIAD_SIX_4", "MYRIAD_SIX_1", "MYRIAD_SIX_2", "MYRIAD_SIX_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description:
      "Four small blessings - semi-open, honor eyes, quadruplets, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: BONUS_TILES.FLOWER_BAMBOO,
          id: ["FLOWER_BAMBOO_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_MOUSE,
          id: ["ANIMAL_MOUSE_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_3", "CIRCLE_NINE_2"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_4"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, honor eyes, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_SEVEN,
          id: ["MYRIAD_SEVEN_4", "MYRIAD_SEVEN_3", "MYRIAD_SEVEN_1"],
        },
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, number eyes",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_TWO,
          id: ["CIRCLE_TWO_4", "CIRCLE_TWO_2", "CIRCLE_TWO_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_TWO,
          id: ["MYRIAD_TWO_4", "MYRIAD_TWO_1"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, number eyes, quadruplets",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3", "WIND_SOUTH_4"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_SIX,
          id: ["MYRIAD_SIX_4", "MYRIAD_SIX_1", "MYRIAD_SIX_2", "MYRIAD_SIX_3"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_THREE,
          id: ["MYRIAD_THREE_1", "MYRIAD_THREE_4"],
        },
      ],
    },
    expected: "small",
  },
  {
    description:
      "Four small blessings - semi-open, honor eyes, quadruplets, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: BONUS_TILES.FLOWER_BAMBOO,
          id: ["FLOWER_BAMBOO_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_MOUSE,
          id: ["ANIMAL_MOUSE_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_NINE,
          id: ["CIRCLE_NINE_1", "CIRCLE_NINE_3", "CIRCLE_NINE_2"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_4"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_SIX,
          id: ["BAMBOO_SIX_4", "BAMBOO_SIX_1"],
        },
      ],
    },
    expected: "small",
  },
  {
    description: "Four small blessings - semi-open, honor eyes, bonus tiles",
    given: {
      open: [
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_2", "WIND_NORTH_3", "WIND_NORTH_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_SEVEN,
          id: ["MYRIAD_SEVEN_4", "MYRIAD_SEVEN_3", "MYRIAD_SEVEN_1"],
        },
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
        {
          tile: BONUS_TILES.ANIMAL_CHICKEN,
          id: ["ANIMAL_CHICKEN_1"],
        },
      ],
      closed: [
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_4"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FIVE,
          id: ["BAMBOO_FIVE_3", "BAMBOO_FIVE_4"],
        },
      ],
    },
    expected: "small",
  },
];

const invalidCases: TestDataType[] = [
  {
    description: "Invalid - all three winds, five random tiles",
    given: { open: [], closed: [] },
    expected: false,
  },
  {
    description: "Invalid - 14 random tiles",
    given: { open: [], closed: [] },
    expected: false,
  },
];

describe("Four Blessings (大小四喜)", () => {
  _.forEach(fourGreatBlessings, ({ description, given, expected }) =>
    test(description, () => expect(fourBlessings(given)).toEqual(expected)),
  );
  _.forEach(fourSmallBlessings, ({ description, given, expected }) =>
    test(description, () => expect(fourBlessings(given)).toEqual(expected)),
  );
  _.forEach(invalidCases, ({ description, given, expected }) =>
    test(description, () => expect(fourBlessings(given)).toEqual(expected)),
  );
});
