'use strict';

const fs = require('fs');
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// Read file asynchronously
interface Dictionary<T> {
  [Key: string]: T;
}

interface Item {
  name: string;
  cooldown: number;
  cost: number;
  tags: Array<string>;
  effects: Array<string>;
  rarity: string;
}

const NAME_INDEX = 0;
const COOLDOWN_INDEX = 1;
const COST_INDEX = 2;
const RARITY_INDEX = 3;
const TAGS_INDEX = 4;
const EFFECTS_INDEX = 5;

var item_dictionary: Dictionary<Item> = {}

const filename = 'data/items_data.tsv'
fs.readFile(filename, 'utf8', (err: string, data: string) => {
  if (err) {
    console.error('Error reading file: ' + err);
    return;
  }

  data.split("\n").map((line: string) => {
    const entries: Array<string> = line.split("\t");
    const item: Item = {
      name: entries[NAME_INDEX],
      cooldown: parseFloat(entries[COOLDOWN_INDEX]),
      cost: parseInt(entries[COST_INDEX]),
      rarity: entries[RARITY_INDEX],
      // Commas are common in descriptions, so we use ';' as delimiter
      tags: entries[TAGS_INDEX].split(";"),
      effects: entries[EFFECTS_INDEX].split(";"),
    }

    item_dictionary[item.name] = item;
  })

  console.log(item_dictionary["Ruby knife"]);
});
