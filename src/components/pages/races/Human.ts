import { IRace } from '../races/Race';

export interface IHuman extends IRace {
    //extra race modifiers
}

export const baseParams: IHuman = {
    name: 'human',
    statMods: {
        Strength: 1,
        Dexterity: 1,
        Constitution: 1,
        Intelligence: 1,
        Wisdom: 1,
        Charisma: 1,
    },
    size: 'medium',
    speed: 30,
    languages: ['common'],
    maxAge: 100,
    description: {
        short: 'human are human',
        long: 'human are human human are human human are human',
    },
};