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

app.get('/rarity', (req, res) => {
  res.send(item_accessor.getOfRarity('Epic'));
});
