import _ from "lodash";
import { describe, expect, test } from "vitest";
import { HAND } from "../../../player/player";
import { BONUS_TILES, HONOR_TILES, NUMBER_TILES } from "../../../tiles/tiles";
import honorsAndTerminals from "./honorsAndTerminals";

type TestDataType = {
  description: string;
  given: HAND;
};

const invalidTestCases: TestDataType[] = [
  {
    description: "Hand with non-terminal number tile (Bamboo 5 included)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_FIVE,
          id: ["BAMBOO_FIVE_1", "BAMBOO_FIVE_2", "BAMBOO_FIVE_3"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: HONOR_TILES.WIND_SOUTH, id: ["WIND_SOUTH_1", "WIND_SOUTH_2"] },
        { tile: BONUS_TILES.FLOWER_PLUM, id: ["FLOWER_PLUM_1"] },
      ],
    },
  },
  {
    description:
      "Hand with mixed non-terminal number tiles (Circle 3 included)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_THREE,
          id: ["CIRCLE_THREE_1", "CIRCLE_THREE_2", "CIRCLE_THREE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: HONOR_TILES.WIND_WEST, id: ["WIND_WEST_1", "WIND_WEST_2"] },
        { tile: BONUS_TILES.FLOWER_ORCHID, id: ["FLOWER_ORCHID_1"] },
      ],
    },
  },
  {
    description:
      "Hand with valid triplets but contains a non-terminal number tile (Circle 6)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_NINE,
          id: ["BAMBOO_NINE_1", "BAMBOO_NINE_2", "BAMBOO_NINE_3"],
        },
        {
          tile: NUMBER_TILES.CIRCLE_SIX,
          id: ["CIRCLE_SIX_1", "CIRCLE_SIX_2", "CIRCLE_SIX_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_WHITE,
          id: ["DRAGON_WHITE_1", "DRAGON_WHITE_2", "DRAGON_WHITE_3"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2"],
        },
        {
          tile: BONUS_TILES.FLOWER_CHRYSANTHEMUM,
          id: ["FLOWER_CHRYSANTHEMUM_1"],
        },
      ],
    },
  },
  {
    description:
      "Hand with a quadruplet and a non-terminal number tile (Bamboo 8)",
    given: {
      open: [],
      closed: [
        {
          tile: NUMBER_TILES.BAMBOO_ONE,
          id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2", "BAMBOO_ONE_3"],
        },
        {
          tile: NUMBER_TILES.BAMBOO_EIGHT,
          id: [
            "BAMBOO_EIGHT_1",
            "BAMBOO_EIGHT_2",
            "BAMBOO_EIGHT_3",
            "BAMBOO_EIGHT_4",
          ],
        },
        {
          tile: HONOR_TILES.WIND_WEST,
          id: ["WIND_WEST_1", "WIND_WEST_2", "WIND_WEST_3"],
        },
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3"],
        },
        { tile: HONOR_TILES.WIND_SOUTH, id: ["WIND_SOUTH_1", "WIND_SOUTH_2"] },
        { tile: BONUS_TILES.FLOWER_BAMBOO, id: ["FLOWER_BAMBOO_1"] },
      ],
    },
  },
  {
    description:
      "Hand with a valid honor quadruplet but contains non-terminal number tile (Myriad 5)",
    given: {
      open: [],
      closed: [
        {
          tile: HONOR_TILES.DRAGON_RED,
          id: ["DRAGON_RED_1", "DRAGON_RED_2", "DRAGON_RED_3", "DRAGON_RED_4"],
        },
        {
          tile: NUMBER_TILES.MYRIAD_FIVE,
          id: ["MYRIAD_FIVE_1", "MYRIAD_FIVE_2", "MYRIAD_FIVE_3"],
        },
        {
          tile: HONOR_TILES.WIND_NORTH,
          id: ["WIND_NORTH_1", "WIND_NORTH_2", "WIND_NORTH_3"],
        },
        {
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        { tile: NUMBER_TILES.BAMBOO_ONE, id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2"] },
        { tile: BONUS_TILES.FLOWER_ORCHID, id: ["FLOWER_ORCHID_1"] },
      ],
    },
  },
  {
    description:
      "Semi-open hand with non-terminal number tile (Circle 7 included)",
    given: {
      open: [
        {
          tile: NUMBER_TILES.CIRCLE_SEVEN,
          id: ["CIRCLE_SEVEN_1", "CIRCLE_SEVEN_2", "CIRCLE_SEVEN_3"],
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
          tile: HONOR_TILES.WIND_EAST,
          id: ["WIND_EAST_1", "WIND_EAST_2", "WIND_EAST_3"],
        },
        { tile: HONOR_TILES.DRAGON_RED, id: ["DRAGON_RED_1", "DRAGON_RED_2"] },
      ],
    },
  },
  {
    description:
      "Semi-open hand with mixed terminal and non-terminal tiles (Bamboo 2 included)",
    given: {
      open: [
        {
          tile: NUMBER_TILES.BAMBOO_TWO,
          id: ["BAMBOO_TWO_1", "BAMBOO_TWO_2", "BAMBOO_TWO_3"],
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
          tile: HONOR_TILES.DRAGON_GREEN,
          id: ["DRAGON_GREEN_1", "DRAGON_GREEN_2", "DRAGON_GREEN_3"],
        },
        { tile: HONOR_TILES.WIND_SOUTH, id: ["WIND_SOUTH_1", "WIND_SOUTH_2"] },
        { tile: BONUS_TILES.FLOWER_BAMBOO, id: ["FLOWER_BAMBOO_1"] },
      ],
    },
  },
  {
    description:
      "Semi-open hand with incomplete pair and non-terminal number tiles",
    given: {
      open: [
        {
          tile: NUMBER_TILES.MYRIAD_FOUR,
          id: ["MYRIAD_FOUR_1", "MYRIAD_FOUR_2", "MYRIAD_FOUR_3"],
        },
      ],
      closed: [
        {
          tile: NUMBER_TILES.MYRIAD_ONE,
          id: ["MYRIAD_ONE_1", "MYRIAD_ONE_2", "MYRIAD_ONE_3"],
        },
        {
          tile: HONOR_TILES.WIND_SOUTH,
          id: ["WIND_SOUTH_1", "WIND_SOUTH_2", "WIND_SOUTH_3"],
        },
        { tile: NUMBER_TILES.BAMBOO_ONE, id: ["BAMBOO_ONE_1", "BAMBOO_ONE_2"] },
      ],
    },
  },
];

describe("Invalid cases (honors and terminals)", () => {
  _.forEach(invalidTestCases, ({ description, given }) =>
    test(description, () => expect(honorsAndTerminals(given)).toEqual(false)),
  );
});
