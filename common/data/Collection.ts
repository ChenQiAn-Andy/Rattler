export default class Collection {

    private arr: any[];
    private dic: { [key: string]: any };

    constructor() {
        this.arr = new Array();
        this.dic = {};
    }

    public add(key: string, value: any) {
        this.arr.push(value);
        this.dic[key] = value;
    }

    public findByIndex(index: number): any {
        return this.arr[index];
    }

    public findByKey(key: string): any {
        return this.dic[key];
    }

    public length(): number {
        return this.arr.length;
    }
}