import { IBackground } from "./Background";

export const Soldier: IBackground = {
    name: "soldier",
    equipmentOptions: [
        {
            list: [
                [
                    {
                        name: 'gaming set',
                        amount: 1,
                        equipmentType: 'items',
                    }
                ],
            ]
        },
    ],
    languagesOptions: [],
    proficiency: {
        savingThrows: [],
        armors: [],
        weapons: [],
        skillMods: ['athletics', 'intimidation'],
    },
    skillsOptions: [],
    description: {
        short: 'soldiers are soldiers',
        long: 'soldiers are soldiers soldiers are soldiers soldiers are soldiers',
    },
}