import { IRace } from "./Race";

export interface IHalfOrc extends IRace {
    //extra race modifiers
}

export const baseParams: IHalfOrc = {
    name: 'halfOrc',
    statMods: {
        strength: 2,
        constitution: 1,
    },
    proficiency: {
        savingThrows: [],
        armors: [],
        weapons: [],
        skillMods: ['intimidation'],
    },
    size: 'medium',
    speed: 30,
    languagesOptions: [],
    languages: ['common', 'orc'],
    maxAge: 75,
    specialAbilities: ['relentless endurance', 'savage attacks', 'darkvision'],
    description: {
        short: 'Strong and hardy, the perfect frontline',
        long: 'Harlf-orcs are hard to kill, nearly impossible to kill. Perfect as Barbarians, Fighters and Paladins',
    },
}