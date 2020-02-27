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
        savingThrows: ['strength', 'constitution'],
        armors: ['light', 'medium', 'heavy', 'shield'],
        weapons: ['simple', 'martial'],
        skillMods: [],
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
                        name: 'leather',
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
    skillsOptions: [
        {
            list: ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        },
        {
            list: ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        },
    ],
    description: {
        long: 'Fighters are fighters',
        short: 'Fighters are fighters Fighters are fighters Fighters are fighters',
    }
}
