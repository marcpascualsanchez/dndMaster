export enum EAbility {
    strength = 'strength',
    dexterity = 'dexterity',
    constitution = 'constitution',
    intelligence = 'intelligence',
    wisdom = 'wisdom',
    charisma = 'charisma',
}

export interface ISkills {
    strength: string[],
    dexterity: string[],
    constitution: string[],
    intelligence: string[],
    wisdom: string[],
    charisma: string[],
}

export interface ICharacter {}

export const skills: ISkills = {
    strength: ['athletics'],
    dexterity: ['acrobatics', 'sleight of hand', 'stealth'],
    constitution: [],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wisdom: ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
    charisma: ['deception', 'intimidation', 'performance', 'persuasion'],
};
