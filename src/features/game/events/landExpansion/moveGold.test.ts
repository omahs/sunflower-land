import { TEST_FARM } from "features/game/lib/constants";
import { MOVE_GOLD_ERRORS, moveGold } from "./moveGold";

describe("moveGold", () => {
  it("throws if player has no Bumpkin", () => {
    expect(() =>
      moveGold({
        state: {
          ...TEST_FARM,
          bumpkin: undefined,
        },
        action: {
          type: "gold.moved",
          id: "1",
          coordinates: { x: 2, y: 2 },
        },
      })
    ).toThrow(MOVE_GOLD_ERRORS.NO_BUMPKIN);
  });

  it("does not move gold with invalid id", () => {
    expect(() =>
      moveGold({
        state: {
          ...TEST_FARM,
          gold: {
            1: {
              height: 1,
              width: 1,
              x: 1,
              y: 1,
              stone: {
                amount: 1,
                minedAt: 0,
              },
            },
          },
        },
        action: {
          type: "gold.moved",
          id: "2",
          coordinates: { x: 2, y: 2 },
        },
      })
    ).toThrow(MOVE_GOLD_ERRORS.GOLD_NOT_PLACED);
  });

  it("moves a gold node", () => {
    const gameState = moveGold({
      state: {
        ...TEST_FARM,
        gold: {
          "123": {
            height: 1,
            width: 1,
            x: 1,
            y: 1,
            stone: {
              amount: 1,
              minedAt: 0,
            },
          },
          "456": {
            height: 1,
            width: 1,
            x: 4,
            y: 4,
            stone: {
              amount: 1,
              minedAt: 0,
            },
          },
          "789": {
            height: 1,
            width: 1,
            x: 8,
            y: 8,
            stone: {
              amount: 1,
              minedAt: 0,
            },
          },
        },
      },
      action: {
        type: "gold.moved",
        id: "123",
        coordinates: { x: 2, y: 2 },
      },
    });

    expect(gameState.gold).toEqual({
      "123": {
        height: 1,
        width: 1,
        x: 2,
        y: 2,
        stone: {
          amount: 1,
          minedAt: 0,
        },
      },
      "456": {
        height: 1,
        width: 1,
        x: 4,
        y: 4,
        stone: {
          amount: 1,
          minedAt: 0,
        },
      },
      "789": {
        height: 1,
        width: 1,
        x: 8,
        y: 8,
        stone: {
          amount: 1,
          minedAt: 0,
        },
      },
    });
  });
});
