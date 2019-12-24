import { IClass } from "./classes/Class";
import { IRace } from "./races/Race";
import { mergeObjects } from "../../utils/utils";

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

export interface ICharacterParams {
    _id?: string;
    class?: IClass;
    race?: IRace;
    abilities?: IAbilities,
    background?: any; // TODO: create background
    personal?: any;
    state?: any; // TODO: design how to manage current state of char
    items?: any;
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

export interface IWeapon {
    name: string;
    damage: string;
    bonus: string;
    type: string;
    amount?: number;
}

export interface IEquipment {
    weapons: IWeapon[];
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
    items: any;
    languages: any[];
    speed: number;
    weapons: any[];
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
    public equipment: any;
    public items: any;
    public languages: any[];
    public speed: number;
    public weapons: IWeapon[];

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
        this.equipment = base.class.equipment;
        this.languages = base.race.languages;
        this.speed = base.race.speed;
        this.weapons = base.items.weapons;
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
        this.items = character.items;
        this.languages = character.languages;
        this.speed = character.speed;
        this.weapons = character.weapons;
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
        this.proficiency = mergeObjects([base.class.proficiency, base.race.proficiency]);
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
            const characters = JSON.parse(charactersItem);
            characters.push(this);
            localStorage.setItem('characters', JSON.stringify(characters));
        } else {
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
