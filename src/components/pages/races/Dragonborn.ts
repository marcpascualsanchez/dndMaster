import { IRace } from '../races/Race';

export interface IDragonborn extends IRace {
    //extra race modifiers
    draconicAncestry: string; // TODO: enum of every draconic ancestry
}

export const baseParams: IDragonborn = {
    name: 'dragonborn',
    statMods: {
        Strength: 2,
        Charisma: 1,
    },
    size: 'medium',
    speed: 30,
    languages: ['common', 'draconic'],
    maxAge: 80,
    draconicAncestry: 'Black',
    description: {
        short: 'dragonborns are dragonborns',
        long: 'dragonborns are dragonborns dragonborns are dragonborns dragonborns are dragonborns',
    },
}