import { IChoosableLanguage, ICharacterProficiency } from "../Character";

// export interface IAbilityScore {
//     Strength: number;
//     Dexterity: number;
//     Constitution: number;
//     Intelligence: number;
//     Wisdom: number;
//     Charisma: number;
// }

export interface IAbilityScoreModifier {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
}

export interface IRace {
    name: string;
    statMods: IAbilityScoreModifier;
    proficiency: ICharacterProficiency;
    specialAbilities?: string[];
    size: string;
    speed: number;
    languagesOptions: IChoosableLanguage[];
    languages: string[];
    maxAge?: number;
    description: {
        long: string;
        short: string;
    }
};