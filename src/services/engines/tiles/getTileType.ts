import { TILES } from "./tiles";

type TILE_TYPE = {
  number?: true;
  circle?: true;
  bamboo?: true;
  myriad?: true;
  honor?: true;
  wind?: true;
  dragon?: true;
  bonus?: true;
  flower?: true;
  season?: true;
  animal?: true;
};

export default function (tile: TILES): TILE_TYPE {
  const type = tile.split("_")[0];

  switch (type) {
    case "CIRCLE":
      return {
        number: true,
        circle: true,
      };
    case "BAMBOO":
      return {
        number: true,
        bamboo: true,
      };
    case "MYRIAD":
      return {
        number: true,
        myriad: true,
      };
    case "WIND":
      return {
        honor: true,
        wind: true,
      };
    case "DRAGON":
      return {
        honor: true,
        dragon: true,
      };
    case "SEASON":
      return {
        bonus: true,
        season: true,
      };
    case "FLOWER":
      return {
        bonus: true,
        flower: true,
      };
    case "ANIMAL":
      return {
        bonus: true,
        animal: true,
      };
    default:
      throw new Error(
        "What tile did you pass into `getTileType`? Floor tiles?",
      );
  }
}
