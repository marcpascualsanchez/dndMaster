import { IEquipment, IChoosableSkill, ICharacterProficiency } from "../Character";

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
    amount?: number;
    weight?: number;
    price?: number;
}

export interface IClass {
    name: string;
    baseHealth: number;
    hitDiceGrowth: number;
    armorClass: number;
    classTraits: string[];
    proficiency: ICharacterProficiency;
    skillsOptions: IChoosableSkill[];
    equipment?: IEquipment; // constant equipment
    equipmentOptions?: IChoosableEquipment[]; // equipment to choose
    description: {
        long: string;
        short: string;
    }
};
