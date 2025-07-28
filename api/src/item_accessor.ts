'use strict';

import { Dictionary } from "./dictionary";
// TypeScript couldn't recognize the ES6 module syntax
// Context: https://stackoverflow.com/questions/50661510/why-doesnt-fs-work-when-imported-as-an-es6-module
const fs = require('fs')

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

const PATH = 'data/items_data.tsv'


class ItemAccessor {
    
    _dictionary: Dictionary<Item> = new Dictionary([]);

    constructor() {
        fs.readFile(PATH, 'utf8', (err: string, data: string) => {
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
        
                this._dictionary.add(item.name, item);
            });
        });
    }

    getOfRarity(rarity: string): Dictionary<string> {
        return this._dictionary.filterFor<string>('rarity', 'Epic');
    }
}

export { ItemAccessor }