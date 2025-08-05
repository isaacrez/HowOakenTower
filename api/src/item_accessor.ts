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

export interface Request {
    property: ItemProperty,
    value: string,
}

export enum ItemProperty {
    Name = "name",
    Tag = "tag",
    Cost = "cost",
    Rarity = "rarity",
}

const NAME_INDEX = 0;
const COOLDOWN_INDEX = 1;
const COST_INDEX = 2;
const RARITY_INDEX = 3;
const TAGS_INDEX = 4;
const EFFECTS_INDEX = 5;

const PATH = 'data/items_data.tsv'


class ItemAccessor {
    
    private static _instance: ItemAccessor;
    private _dictionary: Dictionary<Item> = new Dictionary([]);
    private _isLoaded: boolean = false;

    constructor() {
        this.loadData();
    }

    private loadData(): void {
        fs.readFile(PATH, 'utf8', (err: string, data: string) => {
            if (err) {
                console.error('Error reading file: ' + err);
                return;
            }
        
            data.split("\n").forEach((line: string) => {
                if (line.trim()) {
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
                }
            });
            this._isLoaded = true;
        });
    }

    static getInstance(): ItemAccessor {
        if (!ItemAccessor._instance) {
            ItemAccessor._instance = new ItemAccessor();
        }
        return ItemAccessor._instance;
    }

    static getItemDictionary(): Dictionary<Item> {
        const instance = ItemAccessor.getInstance();
        if (!instance._isLoaded) {
            throw new Error('ItemAccessor data is not yet loaded. Please wait for initialization to complete.');
        }
        return instance._dictionary;
    }

    static getOf(filter: Array<Request>): Dictionary<Item> {
        var output = ItemAccessor.getItemDictionary();

        for (const request of filter) {
            switch (request.property) {
                case ItemProperty.Cost:
                    output = ItemAccessor.getOfCost(request.value, output);
                    break;

                case ItemProperty.Name:
                    output = ItemAccessor.getOfName(request.value, output);
                    break;

                case ItemProperty.Rarity:
                    output = ItemAccessor.getOfRarity(request.value, output);
                    break;

                case ItemProperty.Tag:
                    output = ItemAccessor.getOfTags(request.value, output);
                    break;
            }
        }
        return output;
    }

    static getOfRarity(rarity: string, dictionary: Dictionary<Item> = ItemAccessor.getItemDictionary()): Dictionary<Item> {
        const searchTerm = rarity.toLowerCase();
        const matchingTerms: Array<Item> = dictionary.values().filter((item: Item) => item.rarity.toLowerCase().includes(searchTerm));

        return new Dictionary<Item>(matchingTerms.map((item: Item) => {
            return {
                key: item.name,
                value: item,
            }
        }));
    }

    static getOfTags(tag: string, dictionary: Dictionary<Item> = ItemAccessor.getItemDictionary()): Dictionary<Item> {
        const hasTags = dictionary.values().filter((item: Item) => {
            return item.tags.includes(tag);
        });

        const output: Dictionary<Item> = new Dictionary([]);
        hasTags.forEach((item: Item) => {
            output.add(item.name, item);
        });

        return output;
    }

    static getOfName(name: string, dictionary: Dictionary<Item> = ItemAccessor.getItemDictionary()): Dictionary<Item> {
        const searchTerm = name.toLowerCase();
        const matchingItems: Array<Item> = dictionary.values().filter((item: Item) => {
            return item.name.toLowerCase().includes(searchTerm);
        });

        const output: Dictionary<Item> = new Dictionary([]);
        matchingItems.forEach((item: Item) => {
            output.add(item.name, item);
        });

        return output;
    }

    static getOfCost(cost: string, dictionary: Dictionary<Item> = ItemAccessor.getItemDictionary()): Dictionary<Item> {
        return dictionary.filterFor<number>('cost', parseInt(cost));
    }

    static isLoaded(): boolean {
        return ItemAccessor.getInstance()._isLoaded;
    }
}

export { ItemAccessor }