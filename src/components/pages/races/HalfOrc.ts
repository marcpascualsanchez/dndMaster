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
    skillMods: ['intimidation'], // TODO: it marks which skills have proficiency (depends on level)
    size: 'medium',
    speed: 30,
    languages: ['common', 'orc'],
    maxAge: 75,
    raceAbility: ['relentless endurance', 'savage attacks', 'darkvision'],
    description: {
        short: 'Strong and hardy, the perfect frontline',
        long: 'Harlf-orcs are hard to kill, nearly impossible to kill. Perfect as Barbarians, Fighters and Paladins',
    },
}