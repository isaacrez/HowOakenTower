
interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    hasKey(key: string): boolean;
    keys(): string[];
    values(): T[];
}

class Dictionary<T> {
    _keys: Array<string> = [];
    _values: Array<T> = [];

    constructor(init: { key: string; value: T; }[]) {
        // @ts-ignore: Necessary ambiguity in Dictionary structure
        init.map(entry => this[entry.key] = entry.value);
    }

    add(key: string, value: any) {
        // @ts-ignore: Necessary ambiguity in Dictionary structure
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        // @ts-ignore: Necessary ambiguity in Dictionary structure
        delete this[key]
    }

    keys(): string[] {
        return this._keys
    }

    values(): T[] {
        return this._values
    }
}

export { Dictionary }