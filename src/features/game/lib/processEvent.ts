import Decimal from "decimal.js-light";
import { EVENTS, GameEvent } from "../events";
import { FOODS, getKeys } from "../types/craftables";
import { GameState, Inventory, InventoryItemName } from "../types/game";
import { SKILL_TREE } from "../types/skills";

export const maxItems: Inventory = {
  // Seed limits + buffer of 20
  Sunflower: new Decimal("9000"),
  Potato: new Decimal("4500"),
  Pumpkin: new Decimal("2400"),
  Carrot: new Decimal("1000"),
  Cabbage: new Decimal("1000"),
  Beetroot: new Decimal("1000"),
  Cauliflower: new Decimal("1000"),
  Parsnip: new Decimal("500"),
  Radish: new Decimal("500"),
  Wheat: new Decimal("500"),
  Kale: new Decimal("500"),

  Apple: new Decimal("100"),
  Orange: new Decimal("100"),
  Blueberry: new Decimal("100"),

  Chicken: new Decimal("20"),
  Egg: new Decimal("200"),
  "Speed Chicken": new Decimal("5"),
  "Rich Chicken": new Decimal("5"),
  "Fat Chicken": new Decimal("5"),

  "Sunflower Seed": new Decimal(420),
  "Potato Seed": new Decimal(220),
  "Pumpkin Seed": new Decimal(170),
  "Carrot Seed": new Decimal(120),
  "Cabbage Seed": new Decimal(110),
  "Beetroot Seed": new Decimal(100),
  "Cauliflower Seed": new Decimal(100),
  "Parsnip Seed": new Decimal(80),
  "Radish Seed": new Decimal(60),
  "Wheat Seed": new Decimal(60),
  "Apple Seed": new Decimal(50),
  "Blueberry Seed": new Decimal(50),
  "Orange Seed": new Decimal(50),

  Gold: new Decimal("90"),
  Iron: new Decimal("400"),
  Stone: new Decimal("500"),
  Wood: new Decimal("1000"),

  "War Bond": new Decimal(500),
  "Human War Banner": new Decimal(1),
  "Goblin War Banner": new Decimal(1),
  "Chef Hat": new Decimal(1),
  "Rapid Growth": new Decimal(100),
  "Red Envelope": new Decimal(100),
  "Love Letter": new Decimal(400),

  // Stock limits
  Axe: new Decimal("900"),
  Pickaxe: new Decimal("300"),
  "Stone Pickaxe": new Decimal("150"),
  "Iron Pickaxe": new Decimal("50"),
  "Rusty Shovel": new Decimal("100"),
  "Sand Shovel": new Decimal(50),
  "Sand Drill": new Decimal(30),

  //Treasure Island Decorations
  "Abandoned Bear": new Decimal(50),

  "Turtle Bear": new Decimal(50),
  "T-Rex Skull": new Decimal(50),
  "Sunflower Coin": new Decimal(50),
  Foliant: new Decimal(50),
  "Skeleton King Staff": new Decimal(50),
  "Lifeguard Bear": new Decimal(50),
  "Snorkel Bear": new Decimal(50),
  "Parasaur Skull": new Decimal(50),
  "Golden Bear Head": new Decimal(50),
  "Pirate Bear": new Decimal(50),
  "Goblin Bear": new Decimal(50),
  Galleon: new Decimal(50),
  "Dinosaur Bone": new Decimal(50),
  "Human Bear": new Decimal(50),
  "Whale Bear": new Decimal(50),

  // Seasonal Tickets
  "Solar Flare Ticket": new Decimal(350),
  "Dawn Breaker Ticket": new Decimal(350),

  //Treasure Island Beach Bounty
  "Pirate Bounty": new Decimal(50),
  Pearl: new Decimal(50),
  Coral: new Decimal(50),
  "Clam Shell": new Decimal(50),
  Pipi: new Decimal(50),
  Starfish: new Decimal(50),
  Seaweed: new Decimal(50),
  "Sea Cucumber": new Decimal(50),
  Crab: new Decimal(50),

  // Max of 1000 food item
  ...(Object.keys(FOODS()) as InventoryItemName[]).reduce(
    (acc, name) => ({
      ...acc,
      [name]: new Decimal(1000),
    }),
    {}
  ),

  // Max of 1 skill badge
  ...(Object.keys(SKILL_TREE) as InventoryItemName[]).reduce(
    (acc, name) => ({
      ...acc,
      [name]: new Decimal(1),
    }),
    {}
  ),
};

/**
 * Humanly possible SFL in a single session
 */
const MAX_SESSION_SFL = 255;

type checkProgressArgs = ProcessEventArgs & { onChain: GameState };

export function checkProgress({ state, action, onChain }: checkProgressArgs): {
  valid: boolean;
  maxedItem?: InventoryItemName | "SFL";
} {
  let newState: GameState;

  try {
    newState = processEvent({ state, action });
  } catch {
    // Not our responsibility to catch events, pass on to the next handler
    return { valid: true };
  }

  const progress = newState.balance.sub(onChain.balance);

  /**
   * Contract enforced SFL caps
   * Just in case a player gets in a corrupt state and manages to earn extra SFL
   */
  if (progress.gt(MAX_SESSION_SFL)) {
    return { valid: false, maxedItem: "SFL" };
  }

  let maxedItem: InventoryItemName | undefined = undefined;

  // Check inventory amounts
  const validProgress = getKeys(newState.inventory).every((name) => {
    const onChainAmount = onChain.inventory[name] || new Decimal(0);

    const diff =
      newState.inventory[name]?.minus(onChainAmount) || new Decimal(0);

    const max = maxItems[name] || new Decimal(0);

    if (max.eq(0)) return true;

    if (diff.gt(max)) {
      maxedItem = name;

      return false;
    }

    return true;
  });

  return { valid: validProgress, maxedItem };
}

type ProcessEventArgs = {
  state: GameState;
  action: GameEvent;
};

export function processEvent({ state, action }: ProcessEventArgs): GameState {
  const handler = EVENTS[action.type];

  if (!handler) {
    throw new Error(`Unknown event type: ${action}`);
  }

  const newState = handler({
    state,
    // TODO - fix type error
    action: action as never,
  });

  return newState;
}
