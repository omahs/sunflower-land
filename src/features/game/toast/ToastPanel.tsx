import React, { useContext, useState, useEffect, useRef } from "react";
import { ToastContext, ToastItem } from "./ToastProvider";
import { Context } from "../GameProvider";
import { PIXEL_SCALE } from "../lib/constants";
import { InnerPanel } from "components/ui/Panel";
import { InventoryItemName } from "../types/game";
import Decimal from "decimal.js-light";
import { setPrecision } from "lib/utils/formatNumber";
import token from "assets/icons/token_2.png";
import levelup from "assets/icons/level_up.png";
import { ITEM_DETAILS } from "../types/images";
import { createPortal } from "react-dom";

const MAX_TOAST = 6;

const getToastIcon = (item: ToastItem) => {
  if (item === "SFL") return token;

  if (item === "XP") return levelup;

  return ITEM_DETAILS[item]?.image;
};

/**
 * The panel that shows temporary inventory/balance/experience state changes.
 */
export const ToastPanel: React.FC = () => {
  const { gameService } = useContext(Context);
  const { toastsList, setInventory, setBalance, setExperience } =
    useContext(ToastContext);
  const [showToasts, setShowToasts] = useState<boolean>(false);

  const oldInventory = useRef<Partial<Record<InventoryItemName, Decimal>>>();
  const newInventory = useRef<Partial<Record<InventoryItemName, Decimal>>>();
  const oldBalance = useRef<Decimal>();
  const newBalance = useRef<Decimal>();
  const oldExperience = useRef<Decimal>();
  const newExperience = useRef<Decimal>();

  /**
   * Listens to game state transitions.
   */
  gameService.onTransition((state) => {
    // does nothing if no state changes
    if (!state.changed) return;

    // set old and new states
    oldInventory.current = newInventory.current;
    newInventory.current = state.context?.state?.inventory;
    oldBalance.current = newBalance.current;
    newBalance.current = state.context?.state?.balance;
    oldExperience.current = newExperience.current;
    const experience = state.context.state.bumpkin?.experience;
    newExperience.current = experience ? new Decimal(experience) : undefined;

    // inventory is set and changed
    if (
      !!newInventory.current &&
      oldInventory.current !== newInventory.current
    ) {
      setInventory(newInventory.current);
    }

    // balance is set and changed
    if (
      !!newBalance.current &&
      !(oldBalance.current ?? new Decimal(0)).equals(
        newBalance.current ?? new Decimal(0)
      )
    ) {
      setBalance(newBalance.current ?? new Decimal(0));
    }

    // experience is set and changed
    if (
      !!newExperience.current &&
      !(oldExperience.current ?? new Decimal(0)).equals(
        newExperience.current ?? new Decimal(0)
      )
    ) {
      setExperience(newExperience.current ?? new Decimal(0));
    }
  });

  // show toast only if there are toasts in the toast list
  useEffect(() => {
    setShowToasts(toastsList.length >= 1);
  }, [toastsList]);

  return (
    <>
      {showToasts &&
        createPortal(
          <InnerPanel
            className="flex flex-col items-start fixed z-[99999] pointer-events-none"
            style={{
              top: `${PIXEL_SCALE * 54}px`,
              left: `${PIXEL_SCALE * 3}px`,
            }}
          >
            {/* show visible toasts only */}
            {toastsList
              .slice(0, MAX_TOAST)
              .filter((toast) => !toast.hidden)
              .map(({ item, difference, id }) => (
                <div className="flex items-center justify-center" key={id}>
                  <img className="h-6" src={getToastIcon(item)} />
                  <span className="text-sm mx-1 mb-0.5">{`${
                    difference.greaterThanOrEqualTo(0) ? "+" : ""
                  }${setPrecision(difference)}`}</span>
                </div>
              ))}
          </InnerPanel>,
          document.body
        )}
    </>
  );
};
