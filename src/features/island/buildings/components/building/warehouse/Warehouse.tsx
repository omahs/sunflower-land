import React from "react";

import warehouse from "assets/buildings/warehouse.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { BuildingImageWrapper } from "../BuildingImageWrapper";
import { BuildingProps } from "../Building";

export const Warehouse: React.FC<BuildingProps> = ({ onRemove, isBuilt }) => {
  const handleClick = () => {
    if (onRemove) {
      onRemove();
      return;
    }

    if (isBuilt) {
      // Add future on click actions here
      return;
    }
  };

  return (
    <BuildingImageWrapper onClick={handleClick} nonInteractible={!onRemove}>
      <img
        src={warehouse}
        style={{
          width: `${PIXEL_SCALE * 50}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute pointer-events-none"
      />
    </BuildingImageWrapper>
  );
};
