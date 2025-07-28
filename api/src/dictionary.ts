
interface Dictionary<T> {
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

    hasKey(key: string): boolean {
        return this._keys.includes(key);
    }

    keys(): string[] {
        return this._keys
    }

    values(): T[] {
        return this._values
    }

    filterFor<P>(property: string, value: P): Dictionary<P> {
        const output: Dictionary<P> = new Dictionary([])

        if (this.values().length == 0) return output;
        // Shortcircuit if the property does not exist
        if (this.values()[0][property] == undefined) return output;

        this.keys().forEach((key: string, index: number) => {
            const current_entry = this.values()[index]
            if (current_entry[property] == value) {
                output.add(key, current_entry);
            }
        });

        return output
    }

    toString(): string {
        const output: string[] = [];
        this.keys().forEach((key: string, index: number) => {
            output.push(key + ": " + this.values[index])
        })

        return output.join("\n");
    }
}

export { Dictionary }