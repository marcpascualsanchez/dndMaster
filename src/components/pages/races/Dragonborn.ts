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
        short: 'Strong and charismatic, you can also breath fire and get some cool resistances',
        long: 'Dragonborn are a race with certain advantages thanks to their ancestors, dragons. they are resistant to the element from which they come and also can breath fire. Perfect as Barbarians, Fighters Paladins but algo good as Bards, Sorcerers and Warloks',
    },
}