'use client'
import Item from "./item";
import { useState, useEffect } from 'react';

export default function Home() {

  // TODO - Update to use Item interface
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/item?cost=30')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data._values);
      })
  }, []);

  useEffect(() => {
    console.log("In the ITEMS useEffect");
  }, [items])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {
          items.map(itemData => {
            return (
              <Item item={{
                name: itemData.name,
                cooldown: itemData.cooldown,
                cost: itemData.cost,
                rarity: itemData.rarity,
                tags: itemData.tags,
                effects: itemData.effects
              }} />
          )})
        }

      </main>
    </div>
  );
}

