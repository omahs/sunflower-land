import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "components/ui/Button";

import npc from "assets/npcs/community_garden_npc.gif";
import boats from "assets/npcs/paperboats.gif";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityGardenModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <CloseButtonPanel onClose={onClose} title="Visit the Community Garden?">
        <div className="flex justify-center items-center gap-6 mb-3">
          <img
            src={boats}
            style={{
              width: `${PIXEL_SCALE * 21}px`,
              height: `${PIXEL_SCALE * 19}px`,
            }}
          />
          <img
            src={npc}
            style={{
              width: `${PIXEL_SCALE * 16}px`,
              height: `${PIXEL_SCALE * 16}px`,
            }}
          />
        </div>

        <div className="space-y-3 mb-3 px-2 text-sm">
          <p>Community Garden offers NFTs built entirely by the community.</p>
          <p>
            You can only use SFL that is in your personal wallet, not your
            farm&apos;s wallet.
          </p>
          <p>
            The Sunflower Land team does not maintain or support these features.
          </p>
          <p>Proceed at your own risk.</p>
        </div>

        <Button onClick={() => navigate(`/community-garden/${id}`)}>
          Continue
        </Button>
      </CloseButtonPanel>
    </Modal>
  );
};
