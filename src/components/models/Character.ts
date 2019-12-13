import { IClass } from "./classes/Class";
import { IRace } from "./races/Race";

export enum EAbility {
    strength = 'strength',
    dexterity = 'dexterity',
    constitution = 'constitution',
    intelligence = 'intelligence',
    wisdom = 'wisdom',
    charisma = 'charisma',
}

export interface ICharacterParams {
    _id: string;
    class?: IClass;
    race?: IRace;
    abilities?: { [key: string]: EAbility },
    background?: any; // TODO: create background
    personal?: any;
    state?: any; // TODO: design how to manage current state of char
}

export interface ISkills {
    strength: string[],
    dexterity: string[],
    constitution: string[],
    intelligence: string[],
    wisdom: string[],
    charisma: string[],
}

export interface ICharacter { }

export const skills: ISkills = {
    strength: ['athletics'],
    dexterity: ['acrobatics', 'sleight of hand', 'stealth'],
    constitution: [],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wisdom: ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
    charisma: ['deception', 'intimidation', 'performance', 'persuasion'],
};
