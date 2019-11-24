export interface IItem {
    name: string;
    amount: number;
}

export interface IBarbarian {
    healthGrowth: number; // plus Constitution modifier
    hitDiceGrowth: number; // dice faces
    armorClass: number; // plus dexterity modifier
    classTraits: string[],
    proficiency: {
        skillModsAble: number, //TODO: choose n skillMods
        skillMods: string[],
        savingThrows: string[],
        armors: string[],
        weapons: string[],
    },
    equipment: {
        weapon: {
            primary: IItem;
            secondary: IItem;
        },
        items: IItem[],
    }
}

export const baseParams: IBarbarian = {
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
    }
};
