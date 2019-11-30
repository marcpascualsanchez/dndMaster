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
        short: 'Charismatic and intelligent and resistant to fire',
        long: 'Tieflings come from humans but with an infernal legacy. Thanks to this they have fire resistance and know the infernal language. Perfect as Sorcerers and Warloks but also good as Bards, Paladins and Wizards',
    },
}