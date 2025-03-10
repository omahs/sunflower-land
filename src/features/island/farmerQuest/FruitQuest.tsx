import React, { useState } from "react";

import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";

import island from "assets/land/islands/farmer_island.webp";
import { Modal } from "react-bootstrap";
import { Quest } from "features/game/expansion/components/Quest";
import appleTree from "assets/fruit/apple/apple_tree.png";
import orangeTree from "assets/fruit/orange/orange_tree.png";
import blueberryBush from "assets/fruit/blueberry/blueberry_bush.png";
import { NPC } from "../bumpkin/components/NPC";

export const FruitQuest: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const ModalDescription = () => {
    return (
      <>
        <p className="mb-4">
          {`I've been designing limited edition wearables that can enhance your fruit picking abilities`}
        </p>
        <p className="mb-4">
          {`I am looking for dedicated fruit pickers to trial this clothing....for FREE!`}
        </p>
        <div className="flex justify-center mb-4">
          <img
            src={appleTree}
            className="mr-2 img-highlight"
            style={{
              height: `${PIXEL_SCALE * 20}px`,
            }}
          />
          <img
            src={orangeTree}
            className="img-highlight mr-2"
            style={{
              height: `${PIXEL_SCALE * 20}px`,
            }}
          />
          <img
            src={blueberryBush}
            className="img-highlight self-end"
            style={{
              height: `${PIXEL_SCALE * 15}px`,
            }}
          />
        </div>
      </>
    );
  };

  const QuestCompletion = () => {
    return (
      <div className="pr-4 pl-2 py-2">
        <p className="mb-3">Wow, you really do love Fruits as much as I do!</p>
        <p>
          {`I have no more gifts for you. Don't forget to wear your new
            items!`}
        </p>
      </div>
    );
  };
  return (
    <>
      <img
        src={island}
        className="absolute"
        style={{
          left: `${GRID_WIDTH_PX * -4}px`,
          top: `${GRID_WIDTH_PX * -4}px`,
          width: `${PIXEL_SCALE * 94}px`,
        }}
      />
      <div
        className="absolute"
        style={{
          left: `${GRID_WIDTH_PX * -1.5}px`,
          top: `${GRID_WIDTH_PX * -3.2}px`,
          width: `${PIXEL_SCALE * 15}px`,
        }}
      >
        <NPC
          onClick={() => setShowModal(true)}
          pants="Blue Suspenders"
          body="Beige Farmer Potion"
          hair="Sun Spots"
          shirt="Fruit Picker Shirt"
          hat="Fruit Bowl"
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Quest
          quests={["Fruit Quest 1", "Fruit Quest 2", "Fruit Quest 3"]}
          questTitle="Hey there friend!"
          onClose={() => setShowModal(false)}
          questDescription={ModalDescription()}
          bumpkinParts={{
            pants: "Farmer Pants",
            body: "Beige Farmer Potion",
            coat: "Fruit Picker Apron",
            tool: "Farmer Pitchfork",
            hair: "Parlour Hair",
            shirt: "Fruit Picker Shirt",
            hat: "Fruit Bowl",
          }}
          questCompletionScreen={QuestCompletion()}
        />
      </Modal>
    </>
  );
};
