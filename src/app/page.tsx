import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Item from "./item";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <Item item={{
          name: "Blazing Bull",
          cooldown: 3.2,
          cost: 45,
          tags: ["Elven"],
          rarity: "Epic",
          effects: [
            "Gain 10 armor",
            "Apply 4 Burn",
            "Has bonus shield equal to burn on enemy"
          ],
        }} />

        <Item item={{
          name: "Solaris",
          cooldown: 3.0,
          effects: [
            "Multicast 2",
            "Deal 15 >> 30 Damage",
            "Apply 10 >> 20 Heal"
          ],
          tags: ["Axe", "Holy"],
          rarity:	"Epic",
          cost: 45,
        }} />

      </main>
    </div>
  );
}

