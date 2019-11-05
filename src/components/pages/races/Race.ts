// export interface IAbilityScore {
//     Strength: number;
//     Dexterity: number;
//     Constitution: number;
//     Intelligence: number;
//     Wisdom: number;
//     Charisma: number;
// }

export interface IAbilityScoreModifier {
    Strength?: number;
    Dexterity?: number;
    Constitution?: number;
    Intelligence?: number;
    Wisdom?: number;
    Charisma?: number;
}

export interface IRace {
    name: string;
    statMods: IAbilityScoreModifier;
    skillMods?: string[], // TODO: it marks which skills have proficiency (depends on level)
    raceAbility?: string[],
    size: string;
    speed: number;
    languages: string[]; //TODO: one more to choose freely
    maxAge?: number;
    description: {
        long: string;
        short: string;
    }
};