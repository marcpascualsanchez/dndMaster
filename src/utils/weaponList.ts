import { IItem } from '../models/classes/Class';

export interface IWeapon extends IItem {
    damage: string;
    type: string;
    range?: string;
    properties?: string;
}

export interface IWeaponType {
    melee: IWeapon[];
    ranged: IWeapon[];
}

export interface IWeaponList {
    simple: IWeaponType;
    martial: IWeaponType;
}
// https://www.5esrd.com/equipment/weapons/
export const weaponList: IWeaponList = {
    simple: {
        melee: [
            {
                name: 'club',
                price:	10,
                damage: '1d4',
                type: 'bludgeoning',
                weight: 2,
                properties: 'light',
                },
            {
                name: 'dagger',
                price:	2000,
                damage: '1d4',
                type: 'piercing',
                weight: 1,
                range: '20/60',
                properties: 'finesse, light, thrown',
                },
            {
                name: 'greatclub',
                price:	20,
                damage: '1d8',
                type: 'bludgeoning',
                weight: 10,
                properties: 'two-handed',
                },
            {
                name: 'handaxe',
                price:	5000,
                damage: '1d6',
                type: 'slashing',
                weight: 2,
                range: '20/60',
                properties: 'light, thrown',
                },
            {
                name: 'javelin',
                price:	50,
                damage: '1d6',
                type: 'piercing',
                weight: 2,
                range: '30/120',
                properties: 'thrown',
                },
            {
                name: 'light hammer',
                price: 2,
                damage: '1d4',
                type: 'bludgeoning',
                weight:  2,
                range: '20/60',
                properties: 'light, thrown',
                },
            {
                name: 'mace',
                price:	5000,
                damage: '1d6',
                type: 'bludgeoning',
                weight: 4,
                },
            {
                name: 'quarterstaff',
                price:	20,
                damage: '1d6',
                type: 'bludgeoning',
                weight: 4,
                properties: 'versatile (1d8)',
                },
            {
                name: 'sickle',
                price:	1000,
                damage: '1d4',
                type: 'slashing',
                weight: 2,
                properties: 'light',
                },
            {
                name: 'spear',
                price:	1000,
                damage: '1d6',
                type: 'piercing',
                weight: 3,
                range: '20/60',
                properties: 'thrown, versatile (1d8)',
                },
        ],
        ranged: [
            {
                name: 'shortbow',
                damage: '1d6',
                type: 'piercing',
                weight: 2,
                price: 25000,
            }
        ]
    },
    martial: {
        melee: [
            {
                name: 'battleaxe',
                damage: '1d8',
                type: 'slashing',
                weight: 4,
                price: 10000,
            },
            {
                name: 'greataxe',
                damage: '1d12',
                type: 'slashing',
                weight: 7,
                price: 30000,
            }
        ],
        ranged: [
            {
                name: 'longbow',
                damage: '1d8',
                type: 'piercing',
                weight: 2,
                price: 50000,
            }
        ]
    }
}