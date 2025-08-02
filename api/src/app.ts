'use strict';

import { ItemAccessor } from './item_accessor';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

// Preload the ItemAccessor data when the server starts
console.log('Initializing ItemAccessor...');
ItemAccessor.getInstance(); // This triggers the data loading

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  
  // Check if data is loaded after a short delay
  setTimeout(() => {
    if (ItemAccessor.isLoaded()) {
      console.log('ItemAccessor data loaded successfully');
    } else {
      console.log('ItemAccessor data is still loading...');
    }
  }, 1000);
});

app.get('/rarity/:rarity', (req, res) => {
  try {
    if (!ItemAccessor.isLoaded()) {
      return res.status(503).json({ error: 'Service is still loading data. Please try again in a moment.' });
    }

    const rarity = req.params.rarity;
    const items = ItemAccessor.getOfRarity(rarity);

    if (!items || items.values().length === 0) {
      res.status(404).json({ error: 'No items found' });
    } else {
      res.json(items);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tags/:tag', (req, res) => {
  try {
    if (!ItemAccessor.isLoaded()) {
      return res.status(503).json({ error: 'Service is still loading data. Please try again in a moment.' });
    }

    const tag = req.params.tag;
    const items = ItemAccessor.getOfTags(tag);

    if (!items || items.values().length === 0) {
      res.status(404).json({ error: 'No items found' });
    } else {
      res.json(items);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/name/:name', (req, res) => {
  try {
    if (!ItemAccessor.isLoaded()) {
      return res.status(503).json({ error: 'Service is still loading data. Please try again in a moment.' });
    }

    const name = req.params.name;
    const items = ItemAccessor.getOfName(name);

    if (!items || items.values().length === 0) {
      res.status(404).json({ error: 'No items found' });
    } else {
      res.json(items);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/cost/:cost', (req, res) => {
  try {
    if (!ItemAccessor.isLoaded()) {
      return res.status(503).json({ error: 'Service is still loading data. Please try again in a moment.' });
    }

    const cost: number = parseInt(req.params.cost);
    const items = ItemAccessor.getOfCost(cost);

    if (!items || items.values().length === 0) {
      res.status(404).json({ error: 'No items found' });
    } else {
      res.json(items);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});