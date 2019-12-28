import { IClass } from "./Class";

export interface IFighter extends IClass {
    // TODO: add custom props
}

export const baseParams: IFighter = {
    name: 'fighter',
    baseHealth: 10, // plus Constitution modifier
    hitDiceGrowth: 10, // dice faces
    armorClass: 10, // plus dexterity modifier
    classTraits: ['fighting style', 'second wind',],
    proficiency: {
        skillModsAble: 2, //TODO: choose n skillMods
        skillMods: ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        savingThrows: ['strength', 'constitution'],
        armors: ['light', 'medium', 'heavy', 'shield'],
        weapons: ['simple', 'martial'],
    },
    equipmentOptions: [
        {
            list: [
                [
                    {
                        name: 'chain mail',
                        amount: 1,
                        equipmentType: 'armors',
                    }],
                [
                    {
                        name: 'leather armor',
                        amount: 1,
                        equipmentType: 'armors',
                    },
                    {
                        name: 'longbow',
                        amount: 1,
                        equipmentType: 'weapons',
                    },
                    {
                        name: 'arrow',
                        amount: 20,
                        equipmentType: 'items',
                    },
                ],
            ],
        },
        {
            list: [
                [{
                    name: 'explorer pack',
                    amount: 1,
                    equipmentType: 'items',
                }],
                [{
                    name: 'javelin',
                    amount: 4,
                    equipmentType: 'weapons',
                }],
            ],
        }
    ],
    // equipment: {
    //     weapon: {
    //         primary: {
    //             name: 'primary', // TODO: choose between; chain mail or leather armor with longbow and 20 arrows
    //             amount: 1,
    //         },
    //         secondary: {
    //             name: 'secondary', //TODO: choose between; any martial weapon and a shield or two martialweapon
    //             amount: 1, //TODO: one if its the first option, two if it’s the second option
    //         },
    //         tertiary: {
    //             name: 'light crossbow', //TODO: in case lightcrosbow is choosen and 20 bolts at the item list
    //             amount: 1, //TODO: one if its the first option, two if it’s the second option
    //         }
    //     },
    //     items: [{
    //         name: 'explorer pack',// ['explorer pack', 'dungeoneer pack'], //TODO: chose only one
    //         amount: 1,
    //     }],
    // },
    description: {
        long: 'Fighters are fighters',
        short: 'Fighters are fighters Fighters are fighters Fighters are fighters',
    }
}
