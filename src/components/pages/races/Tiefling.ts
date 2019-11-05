import { IRace } from "./Race";

export interface ITiefling extends IRace {
    //extra race modifiers
}

//Tiefling race model
export const baseParams: ITiefling = {
    name: 'tiefling',
    statMods: {
        Charisma: 2,
        Intelligence: 1,
    },
    size: 'medium',
    speed: 30,
    languages: ['common', 'infernal'],
    maxAge: 100,
    raceAbility: ['darkvision', 'hellishResistence', 'infernalLegacy'],
    description: {
        short: 'tiefling are tiefling',
        long: 'tiefling are tiefling tiefling are tiefling tiefling are tiefling',
    },
}