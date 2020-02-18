import { armorList, IArmorList } from './armorList';

export class ArmorManager {
    private armors: IArmorList;

    constructor() {
        this.armors = armorList;
    }
    
    public getAll() {
        return [...this.getLight(), ...this.getMedium(), ...this.getHeavy()];
    }

    public getByName(name: string) {
        return this.getAll().find(a => a.name === name);
    }

    public getLight() {
        return this.armors.light;
    }

    public getMedium() {
        return this.armors.medium;
    }

    public getHeavy() {
        return this.armors.heavy;
    }
}