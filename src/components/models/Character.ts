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
    abilities?: { [key: string]: number },
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

export function calculateAbilityModifier(score: number) {
    const modifiers = { // Oh God of Code, please forgive me for my sins
        '-5': [1],
        '-4': [2, 3],
        '-3': [4, 5],
        '-2': [6, 7],
        '-1': [8, 9],
        '+0': [10, 11],
        '+1': [12, 13],
        '+2': [14, 15],
        '+3': [16, 17],
        '+4': [18, 19],
        '+5': [20, 21],
        '+6': [22, 23],
        '+7': [24, 25],
        '+8': [26, 27],
        '+9': [28, 29],
        '+10': [30],
    };
    const resultModifier = Object.keys(modifiers).find(m => modifiers[m].indexOf(score) > -1);
    return resultModifier;
}