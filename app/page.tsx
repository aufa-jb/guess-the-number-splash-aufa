'use client';
import StoreProvider from "./StoreProvider";
import { initialState } from "./lib/features/appStateSlice";
import { ChatBox } from "./ui/chat-box";
import { InfoBox } from "./ui/info-box";
import { MultiplierCurve } from "./ui/multiplier-curve";
import { Ranking } from "./ui/ranking";
import { SidePanel } from "./ui/side-panel/side-panel";

export default function Home() {

  return (
    <StoreProvider appState={initialState}>
      <main className="lg:p-16 md:p-8 p-2">
        <div className="block md:grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 mb-3 md:mb-0">
            <SidePanel />
          </div>
          <div className="col-span-2">
            <InfoBox />
            <MultiplierCurve />
          </div>
        </div>
        <div className="md:flex gap-4">
          <Ranking />
          <div className="block md:hidden h-3" />
          <ChatBox />
        </div>
      </main>
    </StoreProvider >
  );
}
