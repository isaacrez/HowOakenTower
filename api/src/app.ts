'use strict';

import { ItemAccessor } from './item_accessor';
import { Dictionary } from "./dictionary";
import express from 'express';

import { createServer } from 'node:http';

const app = express();
const item_accessor = new ItemAccessor();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/rarity/:rarity', (req, res) => {
  const rarity = req.params.rarity;
  const items = item_accessor.getOfRarity(rarity);

  if (!items) {
    res.status(404).json({ error: 'No items found' });
  } else {
    res.json(items);
  }
});
