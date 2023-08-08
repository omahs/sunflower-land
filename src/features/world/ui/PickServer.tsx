import React, { useContext, useState } from "react";

import * as Auth from "features/auth/lib/Provider";
import { OuterPanel } from "components/ui/Panel";
import { Label } from "components/ui/Label";
import classNames from "classnames";
import {
  MAX_PLAYERS,
  isServerFull,
  serverCurrentPopulation,
} from "../lib/availableRooms";
import { MachineInterpreter } from "../mmoMachine";
import { ResizableBar } from "components/ui/ProgressBar";
import { SUNNYSIDE } from "assets/sunnyside";
import { CROP_LIFECYCLE } from "features/island/plots/lib/plant";
import brazilFlag from "assets/sfts/flags/brazil_flag.gif";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { COMMUNITY_ISLANDS } from "./community/CommunityIslands";
import { useNavigate } from "react-router-dom";
import { hasFeatureAccess } from "lib/flags";
import { Context } from "features/game/GameProvider";
import { useActor, useSelector } from "@xstate/react";
import { AuthMachineState } from "features/auth/lib/authMachine";

interface Props {
  mmoService: MachineInterpreter;
}

// If colyseus does not return one of the servers, it means its empty
const ICONS = [
  CROP_LIFECYCLE.Sunflower.crop,
  SUNNYSIDE.icons.heart,
  SUNNYSIDE.icons.water,
  brazilFlag,
  CROP_LIFECYCLE.Pumpkin.crop,
];

const farmIdSelector = (state: AuthMachineState) => state.context.user.farmId;
export const PickServer: React.FC<Props> = ({ mmoService }) => {
  const [tab, setTab] = useState(0);
  const { authService } = useContext(Auth.Context);

  const farmId = useSelector(authService, farmIdSelector);

  const navigate = useNavigate();
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const serverMaxCapacity = MAX_PLAYERS;

  const servers = mmoService.state.context.availableServers;

  const progressBar = (progress: number, max: number, server: number) => {
    let percentage = (progress / max) * 100;

    if (percentage < 10) {
      percentage = 10;
    } else if (percentage < 30) {
      percentage = 30;
    } else if (percentage < 60) {
      percentage = 60;
    }

    return (
      <div className="flex relative" style={{ width: "fit-content" }}>
        <ResizableBar
          percentage={percentage}
          type="progress"
          outerDimensions={{
            width: 30,
            height: 8,
          }}
        />
      </div>
    );
  };

  return (
    <CloseButtonPanel
      currentTab={tab}
      setCurrentTab={setTab}
      onClose={() => {
        navigate(`/land/${farmId}`);
      }}
      tabs={[
        {
          icon: SUNNYSIDE.icons.player,
          name: "Town",
        },
        {
          icon: SUNNYSIDE.icons.heart,
          name: "Explore",
        },
      ]}
    >
      {tab === 0 && (
        <div className="p-2">
          <p className="text-xs mb-2">Choose a server to join</p>
          <>
            {servers.map((server, index) => {
              return (
                <OuterPanel
                  className={classNames(
                    "flex relative items-center justify-between p-2 mb-1 cursor-pointer hover:bg-brown-200",
                    {
                      "cursor-not-allowed": isServerFull(servers, server.id),
                    }
                  )}
                  key={server.id}
                  onClick={() =>
                    mmoService.send("PICK_SERVER", { serverId: server.id })
                  }
                >
                  <div className="flex items-center">
                    <img src={ICONS[index]} className="w-5 mr-2" />
                    <div>
                      <p className="text-sm break-words">{server.name}</p>
                      {isServerFull(servers, server.id) && (
                        <Label
                          type="danger"
                          className="flex gap-2 items-center"
                        >
                          FULL
                        </Label>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-end">
                    {progressBar(
                      serverCurrentPopulation(servers, server.id),
                      serverMaxCapacity,
                      servers.findIndex((s) => s.id === server.id) + 1
                    )}

                    <img
                      src={SUNNYSIDE.icons.chevron_right}
                      className="h-5 ml-2"
                    />
                  </div>
                </OuterPanel>
              );
            })}
          </>
        </div>
      )}
      {tab === 1 && (
        <div className="p-2">
          <p className="text-xs mb-2">Explore custom project islands.</p>
          {hasFeatureAccess(
            gameState.context.state.inventory,
            "UNICORN_ISLAND"
          ) ? (
            <>
              {COMMUNITY_ISLANDS.map((island) => {
                return (
                  <OuterPanel
                    className={classNames(
                      "flex relative items-center justify-between p-2 mb-1 cursor-pointer hover:bg-brown-200"
                    )}
                    key={island.id}
                    onClick={() => {
                      // Default to first server
                      mmoService.send("PICK_SERVER", { serverId: "bliss" });

                      // Set IslandID in route
                      navigate(`/community/${island.id}`);
                    }}
                  >
                    <div className="flex items-center">
                      <img src={island.icon} className="w-7 mr-2" />
                      <div>
                        <p className="text-sm break-words -mb-2">
                          {island.name}
                        </p>
                        <Label type="info" className="-mt-2">
                          Special Event
                        </Label>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                      <img
                        src={SUNNYSIDE.icons.chevron_right}
                        className="h-5 ml-2"
                      />
                    </div>
                  </OuterPanel>
                );
              })}
            </>
          ) : (
            <p className="text-sm">Coming soon...</p>
          )}

          <a
            href="https://docs.sunflower-land.com/contributing/community-islands"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white text-xs"
          >
            Do you want to build your own island?
          </a>
        </div>
      )}
    </CloseButtonPanel>
  );
};