import { weaponList, IWeaponList } from './weaponList';

export class WeaponManager {
    private weapons: IWeaponList;

    constructor() {
        this.weapons = weaponList;
    }
    
    public getAll() {
        return [...this.getMelee(), ...this.getRanged()];
    }

    public getByName(name: string) {
        return this.getAll().find(w => w.name === name);
    }

    public getSimple() {
        return [...this.weapons.simple.melee, ...this.weapons.simple.ranged];
    }

    public getMartial() {
        return [...this.weapons.martial.melee, ...this.weapons.martial.ranged];
    }

    public getMelee() {
        return [...this.weapons.martial.melee, ...this.weapons.simple.melee];
    }

    public getRanged() {
        return [...this.weapons.martial.ranged, ...this.weapons.simple.ranged];
    }
}