import { IItem } from "./itemList";

export interface IWeapon extends IItem {
    damage: string;
    type: string;
    range?: string;
    properties?: string; // TODO: standarize properties
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
                price: 10,
                damage: '1d4',
                type: 'bludgeoning',
                weight: 2,
                properties: 'light',
            },
            {
                name: 'dagger',
                price: 2000,
                damage: '1d4',
                type: 'piercing',
                weight: 1,
                range: '20/60',
                properties: 'finesse, light, thrown',
            },
            {
                name: 'greatclub',
                price: 20,
                damage: '1d8',
                type: 'bludgeoning',
                weight: 10,
                properties: 'two-handed',
            },
            {
                name: 'handaxe',
                price: 5000,
                damage: '1d6',
                type: 'slashing',
                weight: 2,
                range: '20/60',
                properties: 'light, thrown',
            },
            {
                name: 'javelin',
                price: 50,
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
                weight: 2,
                range: '20/60',
                properties: 'light, thrown',
            },
            {
                name: 'mace',
                price: 5000,
                damage: '1d6',
                type: 'bludgeoning',
                weight: 4,
            },
            {
                name: 'quarterstaff',
                price: 20,
                damage: '1d6',
                type: 'bludgeoning',
                weight: 4,
                properties: 'versatile (1d8)',
            },
            {
                name: 'sickle',
                price: 1000,
                damage: '1d4',
                type: 'slashing',
                weight: 2,
                properties: 'light',
            },
            {
                name: 'spear',
                price: 1000,
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
                range: '80/320',
                properties: 'ammunition, two-handed',
            },
            {
                name: 'dart',
                price: 5,
                damage: '1d4',
                type: 'piercing',
                range: '20/60',
                weight: 0.25,
                properties: 'finesse, thrown',
            },
            {
                name: 'sling',
                price: 1,
                damage: '1d4',
                type: 'bludgeoning',
                range: '30 / 120',
                weight: 0,
                properties: 'ammunition',
            },
            {
                name: 'light crossbow',
                price: 25,
                damage: '1d8',
                type: 'piercing',
                range: '80/320',
                weight: 5,
                properties: 'ammunition, loading, two-handed',
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
            },
            {
                name: 'war pick',
                price: 5,
                damage: '1d8',
                type: 'piercing',
                weight: 2,
            },
            {
                name: 'Greatsword',
                price: 50,
                damage: '2d6',
                type: 'slashing',
                weight: 6,
                properties: 'heavy, two-handed',
            },
            {
                name: 'Halberd',
                price: 20,
                damage: '1d10',
                type: 'slashing',
                weight: 6,
                properties: 'heavy, reach, two-handed',
            },
            {
                name: 'Lance',
                price: 10,
                damage: '1d12',
                type: 'piercing',
                weight: 6,
                properties: 'reach, special1',
            },
            {
                name: 'Longsword',
                price: 15,
                damage: '1d8',
                type: 'slashing',
                weight: 3,
                properties: 'versatile (1d10)',
            },
            {
                name: 'Maul',
                price: 10,
                damage: '2d6',
                type: 'bludgeoning',
                weight: 10,
                properties: 'heavy, two-handed',
            },
            {
                name: 'Morningstar',
                price: 15,
                damage: '1d8',
                type: 'piercing',
                weight: 4,
            },
            {
                name: 'Pike',
                price: 5,
                damage: '1d10',
                type: 'piercing',
                weight: 18,
                properties: 'heavy, reach, two-handed',
            },
            {
                name: 'Rapier',
                price: 25,
                damage: '1d8',
                type: 'piercing',
                weight: 2,
                properties: 'finesse',
            },
            {
                name: 'Scimitar',
                price: 25,
                damage: '1d6',
                type: 'slashing',
                weight: 3,
                properties: 'finesse, light',
            },
            {
                name: 'Shortsword',
                price: 10,
                damage: '1d6',
                type: 'piercing',
                weight: 2,
                properties: 'finesse, light',
            },
            {
                name: 'Trident',
                price: 5,
                damage: '1d6',
                type: 'piercing',
                weight: 4,
                range: '20/60',
                properties: 'thrown, versatile (1d8)',
            },
            {
                name: 'Warhammer',
                price: 15,
                damage: '1d8',
                type: 'bludgeoning',
                weight: 2,
                properties: 'versatile (1d10)',
            },
            {
                name: 'Whip',
                price: 2,
                damage: '1d4',
                type: 'slashing',
                weight: 3,
                properties: 'finesse, reach',
            },
        ],
        ranged: [
            {
                name: 'longbow',
                damage: '1d8',
                type: 'piercing',
                weight: 2,
                price: 50000,
            },
            {
                name: 'hand crossbow',
                price: 75,
                damage: '1d6',
                type: 'piercing',
                range: '30/120',
                weight: 3,
                properties: 'ammunition, light, loading',
            },
            {
                name: 'heavy crossbow',
                price: 50,
                damage: '1d10',
                type: 'piercing',
                range: '100/400',
                weight: 18,
                properties: 'ammunition, heavy, loading, two-handed',
            },
            {
                name: 'Blowgun',
                price: 10,
                damage: '1',
                type: 'piercing',
                weight: 1,
                range: '25/100',
                properties: 'ammunition, loading',
            },
            {
                name: 'Longbow',
                price: 50,
                damage: '1d8',
                type: 'piercing',
                weight: 2,
                range: '150/600',
                properties: 'ammunition, heavy, two-handed',
            },
            {
                name: 'Net',
                price: 1,
                damage: '0',
                type: '',
                weight: 3,
                range: '5/15',
                properties: 'thrown, special'
            },
        ]
    }
}