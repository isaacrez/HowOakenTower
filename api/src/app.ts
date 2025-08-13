'use strict';

import { ItemAccessor, ItemProperty, Request } from './item_accessor';
import express from 'express';
import 'dotenv/config'
import cors from 'cors';

const app = express();
app.use(cors())

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

app.get('/item', (req, res) => {
  // Valid queries: COST / NAME / TAG / RARITY
  // Example: /item?tag=Spear&tag=Elven -> tag: ['Spear', 'Elven']
  // Example: /item?tag=Spear&cost=30 -> tag: 'Spear', Cost: '30'
  try {
    if (!ItemAccessor.isLoaded()) {
      return res.status(503).json({ error: 'Service is still loading data. Please try again in a moment.' });
    }

    const validQueryKeys: Array<ItemProperty> = [
      ItemProperty.Cost,
      ItemProperty.Name,
      ItemProperty.Rarity,
      ItemProperty.Tag
    ];
    
    // Strip routing information to access pure tags
    const parsedUrl = req.url.split("?")[1].toLowerCase();
    const queries = new URLSearchParams(parsedUrl);
  
    const requests: Array<Request> = [];
  
    for (const key of validQueryKeys) {
      if (queries.has(key)) {
        for (const currentRequest of queries.getAll(key)) {
          requests.push({
            property: key,
            value: currentRequest
          });
        }
      }
    }
  
    const items = ItemAccessor.getOf(requests);
    if (!items || items.values().length === 0) {
      res.status(404).json({ error: 'No items found' });
    } else {
      res.json(items);
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})