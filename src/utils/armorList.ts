import { IItem } from "./itemList";

export interface IArmor extends IItem {
    armorClass: number;
    stealthDisadvange: boolean;
    strengthNeeded: number;
}

export interface IArmorList {
    light: IArmor[];
    medium: IArmor[];
    heavy: IArmor[];
}

// https://roll20.net/compendium/dnd5e/Armor#content
export const armorList: IArmorList = {
    light: [
        {
            name: 'padded',
            armorClass: 11,
            strengthNeeded: 0,
            stealthDisadvange: true,
            weight: 8,
            price: 500,
        },
        {
            name: 'leather',
            armorClass: 11,
            strengthNeeded: 0,
            stealthDisadvange: false,
            weight: 10,
            price: 1000,
        },
        {
            name: 'studded leather',
            armorClass: 12,
            strengthNeeded: 0,
            stealthDisadvange: false,
            weight: 13,
            price: 4500,
        },
    ],
    medium: [
        {
            name: 'hide',
            armorClass: 12,
            strengthNeeded: 0,
            stealthDisadvange: false,
            weight: 12,
            price: 1000,
        },
        {
            name: 'chain shirt',
            armorClass: 13,
            strengthNeeded: 0,
            stealthDisadvange: false,
            weight: 20,
            price: 5000,
        },
        {
            name: 'scale mail',
            armorClass: 14,
            strengthNeeded: 0,
            stealthDisadvange: true,
            weight: 45,
            price: 5000,
        },
        {
            name: 'breastplate',
            armorClass: 14,
            strengthNeeded: 0,
            stealthDisadvange: false,
            weight: 20,
            price: 40000,
        },
        {
            name: 'half plate',
            armorClass: 15,
            strengthNeeded: 0,
            stealthDisadvange: true,
            weight: 40,
            price: 75000,
        },
    ],
    heavy: [
        {
            name: 'ring mail',
            armorClass: 14,
            strengthNeeded: 0,
            stealthDisadvange: true,
            weight: 40,
            price: 3000,
        },
        {
            name: 'chain mail',
            armorClass: 16,
            strengthNeeded: 13,
            stealthDisadvange: true,
            weight: 55,
            price: 7500,
        },
        {
            name: 'splint',
            armorClass: 17,
            strengthNeeded: 15,
            stealthDisadvange: true,
            weight: 60,
            price: 7500,
        },
        {
            name: 'plate',
            armorClass: 18,
            strengthNeeded: 15,
            stealthDisadvange: true,
            weight: 65,
            price: 15000,
        },
    ],
}
