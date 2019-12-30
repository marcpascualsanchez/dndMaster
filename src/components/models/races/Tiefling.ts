import { IRace } from "./Race";

export interface ITiefling extends IRace {
    //extra race modifiers
}

//Tiefling race model
export const baseParams: ITiefling = {
    name: 'tiefling',
    statMods: {
        charisma: 2,
        intelligence: 1,
    },
    proficiency: {
        skillMods: [],
    },
    size: 'medium',
    speed: 30,
    languagesOptions: [],
    languages: ['common', 'infernal'],
    maxAge: 100,
    specialAbilities: ['darkvision', 'hellishResistence', 'infernalLegacy'],
    description: {
        short: 'Charismatic and intelligent and resistant to fire',
        long: 'Tieflings come from humans but with an infernal legacy. Thanks to this they have fire resistance and know the infernal language. Perfect as Sorcerers and Warloks but also good as Bards, Paladins and Wizards',
    },
}