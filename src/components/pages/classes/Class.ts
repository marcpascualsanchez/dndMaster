export interface IItem {
    name: string;
    amount: number;
}

export interface IClass {
    name: string;
    healthGrowth: number;
    hitDiceGrowth: number;
    armorClass: number;
    classTraits: string[],
    proficiency: { // TODO: define proficiency interface
        skillModsAble: number; //TODO: choose n skillMods
        skillMods: string[];
        savingThrows: string[];
        armors: string[];
        weapons: string[];
    },
    equipment: {// TODO: define equipment interface
        weapon: {
            primary: IItem;
            secondary?: IItem;
            tertiary?: IItem;
        },
        items: IItem[],
    },
    description: {
        long: string;
        short: string;
    }
};
