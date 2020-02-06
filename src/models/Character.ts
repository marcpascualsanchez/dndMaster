import { IClass, IChoosableEquipment, IItem } from "./classes/Class";
import { IRace } from "./races/Race";
import { mergeObjects, getUniqueValuesArray } from "../utils/utils";
import { IBackground } from "./backgrounds/Background";
import { IWeapon } from "../utils/weaponList";
import { ICurrency } from "../components/character-sheet/misc-tab/currency-manager/currency-manager";
import { INote } from "../components/character-sheet/misc-tab/note-element/note-element";
import { IHealth } from "../components/character-sheet/fight-tab/health-manager/health-manager";
import { Subject } from 'rxjs';
import { IArmor } from "../utils/armorList";
import { getCurrencyFromTotal } from "../utils/currency";
import { ISpell } from "../components/character-sheet/spell-tab/spell-element/spell-element";
import { getSpellSlots } from "../utils/spell";

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
    currency: ICurrency;
    spells: ICharacterSpells;
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
    armorClass: number;
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

export interface IEquipment {
    weapons: IWeapon[];
    armors: IArmor[];
    items: IItem[];
}

export interface IEquipped {
    weapons: IWeapon[];
    armor: IArmor;
}

export interface IState {
    level: number;
    health: IHealth;
    spellSlots: number[];
}

export interface ISpellList {
    cantrips: ISpell[];
    1: ISpell[];
    2: ISpell[];
    3: ISpell[];
    4: ISpell[];
    5: ISpell[];
    6: ISpell[];
    7: ISpell[];
    8: ISpell[];
    9: ISpell[];
}

export interface ICharacterSpells {
    slots: number[];
    list: ISpellList;
}

export interface ICharacter {
    _id: string;
    abilities: IAbilities;
    personal: any;
    state: IState;
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
    currency: ICurrency;
    notes: INote[];
    lastModified: Date;
    spells: ICharacterSpells;
    saveLocalCharacter: Function;
    calculateAbilityModifier: Function;
    getMaxHealth: Function;
    heal: Function;
    damage: Function;
    addExtraHealth: Function;
    setArmorClass: Function;
    dropArmor: Function;
    sellArmor: Function;
    equipArmor: Function;
    setArmorAmount: Function;
    onChange: Subject<ICharacter>;
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
    public state: IState;
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
    public currency: ICurrency;
    public notes: INote[];
    public lastModified: Date;
    public spells: ICharacterSpells;
    public onChange: Subject<ICharacter>;

    constructor() { }

    // ***** SETTERS *****
    public setCharacterByBaseParams(base: ICharacterParams) {
        this.setId();
        this.setProficiency(base);
        this.setAbilities(base);
        this.setPersonal(base.personal);
        this.setRace(base.race);
        this.setClass(base.class);
        this.baseHealth = base.class.baseHealth;
        this.hitDiceGrowth = base.class.hitDiceGrowth;
        this.armorClass = base.class.armorClass;
        this.languages = getUniqueValuesArray(base.languages);
        this.speed = base.race.speed;
        this.equipment = base.equipment;
        this.equipped = { weapons: [], armor: null };
        this.currency = base.currency;
        this.notes = [];
        this.setState(this.getDefaultState());
        //TODO: choose spells in char creation
        this.setSpells(base);
        this.lastModified = new Date();
        this.onChange = new Subject<undefined>();
    }

    public setCharacter(character: ICharacter) {
        this._id = character._id;
        this.proficiency = character.proficiency;
        this.abilities = character.abilities;
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
        this.currency = character.currency;
        this.notes = character.notes;
        this.state = character.state;
        this.spells = character.spells;
        this.lastModified = new Date(character.lastModified);
        this.onChange = new Subject<undefined>();
    }

    public setCharacterById(_id: string) {
        const allCharacters = JSON.parse(localStorage.getItem('characters'));
        this.setCharacter(allCharacters.find(c => c._id === _id));
    }

    public setId() {
        this._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    public setState(state: IState) {
        this.state = state;
    }

    public setPersonal(personal: any) {
        this.personal = personal;
    }

    /**
     * Filters only useful data from race
     * @param race race object used to create character
     */
    public setRace(race: IRace) {
        this.race = {
            name: race.name,
            specialAbilities: race.specialAbilities,
        }
    }

    /**
     * Filters only useful data from class
     * @param classData class object used to create character
     */
    public setClass(classData: IClass) {
        this['class'] = {
            name: classData.name,
            traits: classData.classTraits,
            armorClass: classData.armorClass,
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

    public setSpells(base: ICharacterParams) {
        const slots = getSpellSlots(this.class.name, this.state.level);
        const list = base.spells.list;
        this.spells = { slots, list };
    }

    // ***** END SETTERS *****
    public saveLocalCharacter() {
        this.lastModified = new Date();
        this.onChange.next(this);
        const charactersItem = localStorage.getItem('characters');
        if (charactersItem) {
            let characters: ICharacter[] = JSON.parse(charactersItem);
            const prevCharacter = characters.find(ch => ch._id === this._id);
            if (prevCharacter) {
                characters = characters.filter(ch => ch._id !== this._id);
            }
            const savedCharacter = { ... this };
            delete savedCharacter.onChange;
            characters.unshift(savedCharacter);
            localStorage.setItem('characters', JSON.stringify(characters));
        } else { // if character local storage was empty
            localStorage.setItem('characters', JSON.stringify([this]));
        }
    }

    public removeLocalCharacter() {
        this.lastModified = new Date();
        const charactersItem = localStorage.getItem('characters');
        if (charactersItem) {
            let characters: ICharacter[] = JSON.parse(charactersItem).filter(ch => ch._id !== this._id);
            localStorage.setItem('characters', JSON.stringify(characters));
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
        return isReturnString ? parseInt(resultModifier) : parseInt(resultModifier);
    }

    public calculateProficiencyModifier(level: number) {
        return (((level - 1) / 4) | 0) + 2;
    }

    private getDefaultState(): IState {
        return {
            level: 1,
            health: { extra: 0, current: this.getMaxHealth() },
            spellSlots: getSpellSlots(this.class.name, 1),
        }
    }

    // ***** HEALTH *****
    public getMaxHealth() {
        return this.baseHealth + this.calculateAbilityModifier(parseInt(this.abilities.constitution), false);
    }

    public heal(amount: number) {
        this.state.health.current += amount;
        if (this.state.health.current > this.getMaxHealth()) {
            this.state.health.current = this.getMaxHealth();
        }
        this.saveLocalCharacter();
    }

    public damage(amount: number) {
        this.state.health.current -= amount;
        if (this.state.health.current <= 0) {
            this.state.health.current = 0;
            // TODO: set KO state
        }
        this.saveLocalCharacter();
    }

    public addExtraHealth(amount: number) {
        this.state.health.extra += amount;
        if (this.state.health.extra <= 0) {
            this.state.health.extra = 0;
        }
        this.saveLocalCharacter();
    }
    // ***** END HEALTH *****

    // ***** ARMOR *****
    public setArmorClass() {
        this.armorClass = this.equipped.armor ? this.equipped.armor.armorClass : this.class.armorClass;
    }

    public dropArmor(armor: IArmor) {
        if (armor.name === this.equipped.armor.name) {
            this.equipped.armor = null;
        }
        this.equipment.armors = this.equipment.armors.filter(a => a.name !== armor.name);
        this.saveLocalCharacter();
    }

    public sellArmor(armor: IArmor) {
        this.currency = getCurrencyFromTotal(armor.price + this.currency.total);
        this.dropArmor(armor);
    }

    public equipArmor(armor: IArmor) {
        if (this.equipped.armor && this.equipped.armor.name === armor.name) {
            this.equipped.armor = null;
        } else {
            this.equipped.armor = armor;
        }
        this.setArmorClass();
        this.saveLocalCharacter();
    }

    public setArmorAmount(name: string, amount: number) {
        const armor: IArmor = this.equipment.armors.find(a => a.name === name);
        armor.amount = amount;
        this.saveLocalCharacter();
    }
    // ***** END ARMOR *****
}
