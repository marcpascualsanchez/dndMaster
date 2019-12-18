import { IRace } from './Race';

export interface IHuman extends IRace {
    //extra race modifiers
}

export const baseParams: IHuman = {
    name: 'human',
    statMods: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
    },
    proficiency: {
        skillMods: [],
    },
    size: 'medium',
    speed: 30,
    languages: ['common'],
    maxAge: 100,
    description: {
        short: 'The most versatile race of all',
        long: 'Humans are one the most versatile races, it’s equally  good for all classes',
    },
};