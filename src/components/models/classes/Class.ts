import { IEquipment } from "../Character";

export interface IChoosableItemList {
    name: string;
    amount: number;
    equipmentType: string;
}

export interface IChoosableEquipment {
    list: IChoosableItemList[][];
}

export interface IItem {
    name: string;
    amount: number;
}

export interface IClass {
    name: string;
    baseHealth: number;
    hitDiceGrowth: number;
    armorClass: number;
    classTraits: string[];
    proficiency: { // TODO: define proficiency interface
        skillModsAble: number; //TODO: choose n skillMods
        skillMods: string[];
        savingThrows: string[];
        armors: string[];
        weapons: string[];
    };
    equipment?: IEquipment; // constant equipment
    equipmentOptions?: IChoosableEquipment[]; // equipment to choose
    description: {
        long: string;
        short: string;
    }
};
