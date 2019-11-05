import { IRace } from "./Race";

export interface IHalfOrc extends IRace {
    //extra race modifiers
}

export const baseParams: IHalfOrc = {
    name: 'halfOrc',
    statMods: {
        Strength: 2,
        Constitution: 1,
    },
    skillMods: ['Intimidation'], // TODO: it marks which skills have proficiency (depends on level)
    size: 'medium',
    speed: 30,
    languages: ['common', 'orc'],
    maxAge: 75,
    raceAbility: ['relentlessEndurance', 'savageAttacks', 'darkvision'],
    description: {
        short: 'halfOrc are halfOrc',
        long: 'halfOrc are halfOrc halfOrc are halfOrc halfOrc are halfOrc',
    },
}