import { IClass } from "./Class";

export interface IBarbarian extends IClass {
    // TODO: add custom props
}

export const baseParams: IBarbarian = {
    name: 'barbarian',
    baseHealth: 12,
    hitDiceGrowth: 12,
    armorClass: 10,
    classTraits: ['unarmored defense', 'rage'],
    proficiency: {
        skillModsAble: 2, //TODO: choose n skillMods
        skillMods: ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
        savingThrows: ['strenght', 'constitution'],
        armors: ['light armor', 'medium armor', 'shield'],
        weapons: ['simple weapon', 'martial weapon'],
    },
    equipmentOptions: [
        {
            list: [
                [
                    {
                        name: 'greataxe',
                        amount: 1,
                        equipmentType: 'weapons',
                    },
                ],
                [
                    {
                        name: 'handaxe',
                        amount: 2,
                        equipmentType: 'weapons',
                    }
                ],
            ]
        },
        {
            list: [
                [
                    {
                        name: 'explorer pack',
                        amount: 1,
                        equipmentType: 'items',
                    }
                ],
                [
                    {
                        name: 'javelin',
                        amount: 4,
                        equipmentType: 'weapons',
                    }
                ],
            ],
        },
    ],
    description: {
        long: 'Barbarians are barbarians',
        short: 'Barbarians are barbarians Barbarians are barbarians Barbarians are barbarians',
    }
};
