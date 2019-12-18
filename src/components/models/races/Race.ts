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
    proficiency: {
        skillMods: string[], // TODO: it marks which skills have proficiency (depends on level)
    },
    specialAbilities?: string[],
    size: string;
    speed: number;
    languages: string[]; //TODO: one more to choose freely
    maxAge?: number;
    description: {
        long: string;
        short: string;
    }
};