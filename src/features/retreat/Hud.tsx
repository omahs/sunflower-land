import React, { useContext, useState } from "react";
import * as AuthProvider from "features/auth/lib/Provider";

import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GoblinProvider";
import { BumpkinAvatar } from "features/island/hud/components/BumpkinProfile";
import { LandId } from "features/island/hud/components/LandId";
import { GameState } from "features/game/types/game";
import { GoblinInventory } from "./components/hud/GoblinInventory";
import { Settings } from "features/island/hud/components/Settings";
import { DepositArgs } from "lib/blockchain/Deposit";
import Modal from "react-bootstrap/esm/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Deposit } from "features/goblins/bank/components/Deposit";

/**
 * Heads up display - a concept used in games for the small overlaid display of information.
 * Balances, Inventory, actions etc.
 */
export const Hud: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const { goblinService } = useContext(Context);
  const [goblinState] = useActor(goblinService);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositDataLoaded, setDepositDataLoaded] = useState(false);

  const { state } = goblinState.context;
  const landId = state.id;

  const handleDeposit = (
    args: Pick<DepositArgs, "sfl" | "itemIds" | "itemAmounts">
  ) => {
    goblinService.send("DEPOSIT", args);
  };

  const user = authService.state.context.user;
  const isFullUser = user.type === "FULL";
  const farmAddress = isFullUser ? user.farmAddress : undefined;

  const handleDepositClose = () => {
    if (!farmAddress) return;
    setShowDepositModal(false);
  };

  const handleDepositOpen = () => {
    if (!farmAddress) return;
    setShowDepositModal(true);
  };

  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <>
        <Balance
          onBalanceClick={handleDepositOpen}
          balance={goblinState.context.state.balance}
        />
        <GoblinInventory
          state={goblinState.context.state as GameState}
          onDepositClick={handleDepositOpen}
        />
        {landId && <LandId landId={landId} />}
        <BumpkinAvatar bumpkin={state.bumpkin} />
        <Settings isFarming={false} />
        {farmAddress && (
          <Modal show={showDepositModal} centered>
            <CloseButtonPanel
              title={depositDataLoaded ? "Deposit" : undefined}
              onClose={depositDataLoaded ? handleDepositClose : undefined}
            >
              <Deposit
                farmAddress={farmAddress}
                onDeposit={handleDeposit}
                onLoaded={(loaded) => setDepositDataLoaded(loaded)}
                onClose={handleDepositClose}
              />
            </CloseButtonPanel>
          </Modal>
        )}
      </>
    </div>
  );
};
