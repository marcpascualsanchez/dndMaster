import { IClass } from "./Class";

export interface IBarbarian extends IClass {
    // TODO: add custom props
}

export const baseParams: IBarbarian = {
    name: 'barbarian',
    healthGrowth: 12,
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
    equipment: {
        weapon: {
            primary: {
                name: 'greataxe', // TODO: choose between a type of weapon
                amount: 1,
            },
            secondary: {
                name: 'handaxe', // TODO: choose between a type of weapon
                amount: 2,
            },
        },
        items: [
            {
                name: 'explorer pack',
                amount: 1,
            },
            {
                name: 'javelin',
                amount: 4,
            },
        ],
    },
    description: {
        long: 'Barbarians are barbarians',
        short: 'Barbarians are barbarians Barbarians are barbarians Barbarians are barbarians',
    }
};
