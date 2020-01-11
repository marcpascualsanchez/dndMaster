import { IBackground } from "./Background";

export const Acolyte: IBackground = {
    name: "acolyte",
    equipmentOptions: [],
    languagesOptions: [
        {
            list: 'all',
        },
        {
            list: 'all',
        }
    ],
    proficiency: {
        savingThrows: [],
        armors: [],
        weapons: [],
        skillMods: ['insight', 'religion'],
    },
    skillsOptions: [],
    description: {
        short: 'acolytes are acolytes',
        long: 'acolytes are acolytes acolytes are acolytes acolytes are acolytes',
    },
}