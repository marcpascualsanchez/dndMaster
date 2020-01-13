import { IClass, IChoosableEquipment, IItem } from "./classes/Class";
import { IRace } from "./races/Race";
import { mergeObjects, getUniqueValuesArray } from "../utils/utils";
import { IBackground } from "./backgrounds/Background";

export enum EAbility {
    strength = 'strength',
    dexterity = 'dexterity',
    constitution = 'constitution',
    intelligence = 'intelligence',
    wisdom = 'wisdom',
    charisma = 'charisma',
}

export interface IAbilities {
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
}

export interface IChoosableLanguage {
    list: any; // string | string[]; // array of languages, or 'all' for all, or 'exotic' for exotic
}

export interface IChoosableSkill {
    list: any; // string | string[]; // array of skills, or 'all' for all
}

export interface ICharacterParams {
    _id?: string;
    class?: IClass;
    race?: IRace;
    abilities?: IAbilities,
    background?: IBackground; // TODO: create background
    personal?: any;
    state?: any; // TODO: design how to manage current state of char
    items?: any;
    equipmentOptions?: IChoosableEquipment[]; // only used on the char creation to fill equipment
    equipment?: IEquipment;
    languages?: string[];
    languagesOptions?: IChoosableLanguage[];
    proficiency?: ICharacterProficiency;
    skillsOptions?: IChoosableSkill[];
}

export interface ISkills {
    strength: string[],
    dexterity: string[],
    constitution: string[],
    intelligence: string[],
    wisdom: string[],
    charisma: string[],
}

export interface ICharacterClass {
    name: string;
    traits: string[];
}

export interface ICharacterRace {
    name: string;
    specialAbilities: any;
}

export interface ICharacterProficiency {
    skillMods: string[];
    savingThrows: string[];
    armors: string[];
    weapons: string[];
}

export interface IWeapon extends IItem {
    damage: string;
    bonus: string;
    type: string;
}

export interface IArmor extends IItem {
    armorClass: number;
}

export interface IEquipment {
    weapons: IWeapon[];
    armors: IArmor[];
    items: IItem[];
}

export interface IEquipped {
    weapons: IWeapon[];
    armor: IArmor;
}

export interface ICharacter {
    _id: string;
    abilities: IAbilities;
    personal: any;
    state: any;
    race: ICharacterRace;
    class: ICharacterClass;
    baseHealth: number;
    hitDiceGrowth: number;
    armorClass: number;
    proficiency: {
        skillMods: string[];
        savingThrows: string[];
        armors: string[];
        weapons: string[];
    },
    equipment: IEquipment;
    equipped: IEquipped;
    languages: any[];
    speed: number;
    saveLocalCharacter: Function;
    calculateAbilityModifier: Function;
}

export const skills: ISkills = {
    strength: ['athletics'],
    dexterity: ['acrobatics', 'sleight of hand', 'stealth'],
    constitution: [],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wisdom: ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
    charisma: ['deception', 'intimidation', 'performance', 'persuasion'],
};

export interface ILanguages {
    all: string[];
    exotic: string[];
}

export const languages: ILanguages = {
    all: ["abyssal", "aquan", "auran", "celestial", "common", "deep speech", "draconic", "druidic", "dwarvish", "elvish", "giant", "gnomish", "goblin", "gnoll", "halfling", "ignan", "infernal", "orc", "primordial", "sylvan", "terran", "undercommon"],
    exotic: ["abyssal", "celestial", "draconic", "deep speech", "infernal", "primordial", "sylvan", "undercommon", "druidic"],
}

export class Character implements ICharacter {

    public _id: string;
    public proficiency: ICharacterProficiency;
    public abilities: IAbilities;
    public state: any;
    public personal: any;
    public race: ICharacterRace;
    public class: ICharacterClass;
    public baseHealth: number;
    public hitDiceGrowth: number;
    public armorClass: number;
    public equipment: IEquipment;
    public equipped: IEquipped;
    public languages: any[];
    public speed: number;

    constructor() { }

    // ***** SETTERS *****
    public setCharacterByBaseParams(base: ICharacterParams) {
        this.setId();
        this.setProficiency(base);
        this.setAbilities(base);
        this.setState({ level: 1 });
        this.setPersonal(base.personal);
        this.setRace(base.race);
        this.setClass(base.class);
        this.baseHealth = base.class.baseHealth;
        this.hitDiceGrowth = base.class.hitDiceGrowth;
        this.armorClass = base.class.armorClass;
        this.languages = getUniqueValuesArray(base.languages);
        this.speed = base.race.speed;
        this.equipment = base.equipment;
        this.equipped = { weapons: [], armor: null};
    }

    public setCharacter(character: ICharacter) {
        this._id = character._id;
        this.proficiency = character.proficiency;
        this.abilities = character.abilities;
        this.state = character.state;
        this.personal = character.personal;
        this.race = character.race;
        this.class = character.class;
        this.baseHealth = character.baseHealth;
        this.hitDiceGrowth = character.hitDiceGrowth;
        this.armorClass = character.armorClass;
        this.equipment = character.equipment;
        this.languages = character.languages;
        this.speed = character.speed;
        this.equipment = character.equipment;
        this.equipped = character.equipped;
    }

    public setCharacterById(_id: string) {
        const allCharacters = JSON.parse(localStorage.getItem('characters'));
        this.setCharacter(allCharacters.find(c => c._id === _id));
    }

    public setId() {
        this._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    public setState(state: any) {
        this.state = state;
    }

    public setPersonal(personal: any) {
        this.personal = personal;
    }

    public setRace(race: IRace) {
        this.race = {
            name: race.name,
            specialAbilities: race.specialAbilities,
        }
    }

    public setClass(classData: IClass) {
        this['class'] = {
            name: classData.name,
            traits: classData.classTraits,
        }
    }

    public setProficiency(base: ICharacterParams) {
        this.proficiency = mergeObjects([base.background.proficiency, base.class.proficiency, base.race.proficiency, base.proficiency]);
    }

    public setAbilities(base: ICharacterParams) {
        this.abilities = Object.assign({}, base.abilities);
        Object.keys(base.race.statMods).forEach((s) => {
            this.abilities[s] += base.race.statMods[s];
        });
    }
    // ***** END SETTERS *****

    public saveLocalCharacter() {
        const charactersItem = localStorage.getItem('characters');
        if (charactersItem) {
            let characters: ICharacter[] = JSON.parse(charactersItem);
            const prevCharacter = characters.find(ch => ch._id === this._id);
            if (prevCharacter) {
                characters = characters.filter(ch => ch._id !== this._id);
            }
            characters.unshift(this);
            localStorage.setItem('characters', JSON.stringify(characters));
        } else { // if character local storage was empty
            localStorage.setItem('characters', JSON.stringify([this]));
        }
    }

    public calculateAbilityModifier(score: number, isReturnString: boolean = true) {
        const modifiers = { // Oh God of Code, please forgive me for my sins
            '-5': [1],
            '-4': [2, 3],
            '-3': [4, 5],
            '-2': [6, 7],
            '-1': [8, 9],
            '+0': [10, 11],
            '+1': [12, 13],
            '+2': [14, 15],
            '+3': [16, 17],
            '+4': [18, 19],
            '+5': [20, 21],
            '+6': [22, 23],
            '+7': [24, 25],
            '+8': [26, 27],
            '+9': [28, 29],
            '+10': [30],
        };
        const resultModifier = Object.keys(modifiers).find(m => modifiers[m].indexOf(score) > -1);
        return isReturnString ? resultModifier : parseInt(resultModifier);
    }

    calculateProficiencyModifier(level: number) {
        return (((level - 1) / 4) | 0) + 2;
    }
}
