import { IItem } from './itemList';
import { IEquipment } from '../models/Character';

const defaultCustomEquipment = {
    items: [],
    weapons: [],
    armors: [],
}

export class ItemManager {
    // private items: IItem[];
    public localStorageName: string;

    constructor() {
        // this.items = [];
        this.localStorageName = 'customEquipment';
    }
    
    public getAll() {
        return [...this.getCustomItems()];
    }

    public getByName(name: string) {
        return this.getAll().find(a => a.name === name);
    }

    public getCustomEquipment(): IEquipment {
        let customEquipment = JSON.parse(localStorage.getItem(this.localStorageName));
        if (!customEquipment) {
            localStorage.setItem(this.localStorageName, JSON.stringify(defaultCustomEquipment));
            customEquipment = JSON.parse(localStorage.getItem(this.localStorageName));
        }
        return customEquipment;
    }

    public getCustomItems(): IItem[] {
        const customEquipment = this.getCustomEquipment();
        return customEquipment.items;
    }

    public addCustomItem(item: IItem) {
        const items: IItem[] = this.getCustomItems();
        items.unshift(item);
        this.saveCustomItems(items);
    }

    public saveCustomItems(items: IItem[]) {
        const customEquipment = this.getCustomEquipment();
        customEquipment.items = items;
        localStorage.setItem(this.localStorageName, JSON.stringify(customEquipment));
    }
}