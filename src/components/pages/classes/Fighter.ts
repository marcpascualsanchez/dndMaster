export interface IItem {
    name: string;
    amount: number;
}

export interface IFighter {
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
            secondary?: IItem;
            tertiary?: IItem;
        },
        items: {
            names: string[],
            amount: number,
        }
    }
}

export const baseParams: IFighter = {
    healthGrowth: 10, // plus Constitution modifier
    hitDiceGrowth: 10, // dice faces
    armorClass: 10, // plus dexterity modifier
    classTraits: ['fightingStyle', 'secondWind',],
    proficiency: {
        skillModsAble: 2, //TODO: choose n skillMods
        skillMods: ['acrobatics', 'animalhandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        savingThrows: ['strength', 'constitution'],
        armors: ['light', 'medium', 'heavy', 'shield'],
        weapons: ['simple', 'martial'],
    },
    equipment: {
        weapon: {
            primary: {
                name: 'primary', // TODO: choose between; chain mail or leather armor with longbow and 20 arrows
                amount: 1,
            },
            secondary: {
                name: 'secondary', //TODO: choose between; any martial weapon and a shield or two martialweapon
                amount: 1, //TODO: one if its the first option, two if it’s the second option
            },
            tertiary: {
                name: 'lightcrossbow', //TODO: in case lightcrosbow is choosen add 20 bolts at the item list
                amount: 1, //TODO: one if its the first option, two if it’s the second option
            }
        },
        items: {
            names: ['explorer pack', 'dungeoneer pack'], //TODO: chose only one
            amount: 1,
        },
    }
}
