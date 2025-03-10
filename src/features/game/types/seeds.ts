import Decimal from "decimal.js-light";
import { marketRate } from "../lib/halvening";
import { CropName, CropSeedName } from "./crops";
import { FruitName, FruitSeedName, FRUIT_SEEDS } from "./fruits";

export type SeedName = CropSeedName | FruitSeedName;

export type Seed = {
  sfl: Decimal;
  description: string;
  plantSeconds: number;
  bumpkinLevel: number;
  yield: CropName | FruitName;
};

export const SEEDS: () => Record<SeedName, Seed> = () => ({
  "Sunflower Seed": {
    sfl: marketRate(0.01),
    description: "A sunny flower",
    plantSeconds: 60,
    bumpkinLevel: 1,
    yield: "Sunflower",
  },
  "Potato Seed": {
    sfl: marketRate(0.1),
    description: "Healthier than you might think.",
    plantSeconds: 5 * 60,
    bumpkinLevel: 1,
    yield: "Potato",
  },
  "Pumpkin Seed": {
    description: "There's more to pumpkin than pie.",
    sfl: marketRate(0.2),
    plantSeconds: 30 * 60,
    bumpkinLevel: 2,
    yield: "Pumpkin",
  },
  "Carrot Seed": {
    description: "They're good for your eyes!",
    sfl: marketRate(0.5),
    plantSeconds: 60 * 60,
    bumpkinLevel: 2,
    yield: "Carrot",
  },
  "Cabbage Seed": {
    description: "Once a luxury, now a food for many.",
    sfl: marketRate(1),
    bumpkinLevel: 3,
    plantSeconds: 2 * 60 * 60,
    yield: "Cabbage",
  },
  "Beetroot Seed": {
    description: "Good for hangovers!",
    sfl: marketRate(2),
    bumpkinLevel: 3,
    plantSeconds: 4 * 60 * 60,
    yield: "Beetroot",
  },
  "Cauliflower Seed": {
    description: "Excellent rice substitute!",
    sfl: marketRate(3),
    bumpkinLevel: 4,
    plantSeconds: 8 * 60 * 60,
    yield: "Cauliflower",
  },
  "Parsnip Seed": {
    description: "Not to be mistaken for carrots.",
    sfl: marketRate(5),
    bumpkinLevel: 4,
    plantSeconds: 12 * 60 * 60,
    yield: "Parsnip",
  },
  "Radish Seed": {
    description: "Takes time but is worth the wait!",
    sfl: marketRate(7),
    bumpkinLevel: 5,
    plantSeconds: 24 * 60 * 60,
    yield: "Radish",
  },
  "Wheat Seed": {
    description: "The most harvested crop in the world.",
    sfl: marketRate(5),
    bumpkinLevel: 5,
    plantSeconds: 24 * 60 * 60,
    yield: "Wheat",
  },
  "Kale Seed": {
    sfl: marketRate(7),
    description: "A Bumpkin Power Food!",
    bumpkinLevel: 7,
    plantSeconds: 36 * 60 * 60,
    yield: "Kale",
  },
  ...FRUIT_SEEDS(),
});
