import { IClass, IChoosableEquipment } from "./classes/Class";
import { IRace } from "./races/Race";
import { mergeObjects, getUniqueValuesArray } from "../utils/utils";
import { IBackground } from "./backgrounds/Background";
import { IWeapon } from "../utils/weaponList";
import { INote } from "../components/character-sheet/misc-tab/note-element/note-element";
import { IHealth } from "../components/character-sheet/fight-tab/health-manager/health-manager";
import { Subject } from 'rxjs';
import { IArmor, EArmorType } from "../utils/armorList";
import { getCurrencyFromTotal, getCurrency, coinTypes, ICurrency } from "../utils/currency";
import { ISpell } from "../components/character-sheet/spell-tab/spell-element/spell-element";
import { getSpellSlots } from "../utils/spell";
import { experienceLevels } from "../utils/level";
import { IItem } from "../utils/itemList";
import { getArmorType } from "../utils/armorManager";

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
    experience: number;
    health: IHealth;
    spellSlots: number[];
    armorClass: number;
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
    addWeapons: Function;
    dropWeapon: Function;
    sellWeapon: Function;
    setWeaponAmount: Function;
    addArmors: Function;
    setArmorClass: Function;
    dropArmor: Function;
    sellArmor: Function;
    equipArmor: Function;
    setArmorAmount: Function;
    setAuto: Function;
    addCoins: Function;
    setCoins: Function;
    getNote: Function;
    addNote: Function;
    editNote: Function;
    removeNote: Function;
    setLevel: Function;
    setExperience: Function;
    addItems: Function;
    dropItem: Function;
    sellItem: Function;
    setItemAmount: Function;
    onChange?: Subject<ICharacter>;
    onEquipmentChange?: Subject<IEquipment>;
    onStateChange?: Subject<IState>;
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
    public equipment: IEquipment;
    public equipped: IEquipped;
    public languages: any[];
    public speed: number;
    public currency: ICurrency;
    public notes: INote[];
    public lastModified: Date;
    public spells: ICharacterSpells;
    public onChange: Subject<ICharacter>;
    public onEquipmentChange: Subject<IEquipment>;
    public onStateChange: Subject<IState>;

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
        this.languages = getUniqueValuesArray(base.languages);
        this.speed = base.race.speed;
        this.equipment = base.equipment;
        this.equipped = { weapons: [], armor: null };
        this.currency = base.currency;
        this.notes = [];
        this.setState(this.getDefaultState(base));
        //TODO: choose spells in char creation
        this.setSpells(base);
        this.lastModified = new Date();
        this.onChange = new Subject<ICharacter>();
        this.onEquipmentChange = new Subject<IEquipment>();
        this.onStateChange = new Subject<IState>();
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
        this.onChange = new Subject<ICharacter>();
        this.onEquipmentChange = new Subject<IEquipment>();
        this.onStateChange = new Subject<IState>();
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
    private removeObservables(): ICharacter {
        const newCharacter = { ...this };
        delete newCharacter.onChange;
        delete newCharacter.onEquipmentChange;
        delete newCharacter.onStateChange;
        return newCharacter;
    }

    public saveLocalCharacter() {
        this.lastModified = new Date();
        const charactersItem = localStorage.getItem('characters');
        if (charactersItem) {
            let characters: ICharacter[] = JSON.parse(charactersItem);
            const prevCharacter = characters.find(ch => ch._id === this._id);
            if (prevCharacter) {
                characters = characters.filter(ch => ch._id !== this._id);
            }
            const savedCharacter = this.removeObservables();;
            this.onChange.next(savedCharacter);
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

    private getDefaultState(base: ICharacterParams): IState {
        return {
            level: 0,
            experience: 0,
            health: { extra: 0, current: this.getMaxHealth() },
            spellSlots: getSpellSlots(this.class.name, 1),
            armorClass: base.class.armorClass,
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
        this.onStateChange.next({ ...this.state });
    }

    public damage(amount: number) {
        this.state.health.current -= amount;
        if (this.state.health.current <= 0) {
            this.state.health.current = 0;
            // TODO: set KO state
        }
        this.saveLocalCharacter();
        this.onStateChange.next({ ...this.state });
    }

    public addExtraHealth(amount: number) {
        this.state.health.extra += amount;
        if (this.state.health.extra <= 0) {
            this.state.health.extra = 0;
        }
        this.saveLocalCharacter();
        this.onStateChange.next({ ...this.state });
    }
    // ***** END HEALTH *****

    // ***** WEAPON *****
    public addWeapons(weapons: IWeapon[]) {
        this.equipment.weapons = [...this.equipment.weapons, ...weapons];
        this.onEquipmentChange.next({ ... this.equipment });
    }

    public dropWeapon(weapon: IWeapon) {
        this.equipment.weapons = this.equipment.weapons.filter(a => a.name !== weapon.name);
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
    }

    public sellWeapon(weapon: IWeapon) {
        this.currency = getCurrencyFromTotal(weapon.price + this.currency.total);
        this.dropWeapon(weapon);
    }

    public setWeaponAmount(name: string, amount: number) {
        const weapon: IWeapon = this.equipment.weapons.find(a => a.name === name);
        weapon.amount = amount;
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });

    }
    // ***** END WEAPON *****

    // ***** ARMOR *****
    public addArmors(armors: IArmor[]) {
        this.equipment.armors = [...this.equipment.armors, ...armors];
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
    }

    /** Each type of armor in IArmorList (light, heavy, medium) have different modifiers. */
    public calculateArmorArmorClass(armor: IArmor) {
        const armorType: EArmorType = getArmorType(armor);
        let calculatedArmorClass = armor.armorClass;
        let modifier = 0;
        switch (armorType) {
            case EArmorType.light:
                modifier = this.calculateAbilityModifier(parseInt(this.abilities.dexterity), false);
                calculatedArmorClass = armor.armorClass + modifier;
                break;
            case EArmorType.light:
                modifier = this.calculateAbilityModifier(parseInt(this.abilities.dexterity), false);
                calculatedArmorClass = armor.armorClass + (modifier > 2 ? 2 : modifier); // cap modifier to +2
                break;
            default:
                break;
        }
        return calculatedArmorClass;
    }

    public setArmorClass() {
        this.state.armorClass = this.equipped.armor ? this.calculateArmorArmorClass(this.equipped.armor) : this.class.armorClass;
        this.saveLocalCharacter();
    }

    public unequipArmor(armor: IArmor) {
        if (this.equipped.armor && armor.name === this.equipped.armor.name) {
            this.equipped.armor = null;
        }
        this.setArmorClass();
    }

    public dropArmor(armor: IArmor) {
        this.unequipArmor(armor);
        this.equipment.armors = this.equipment.armors.filter(a => a.name !== armor.name);
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
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
        this.onEquipmentChange.next({ ... this.equipment });

    }
    // ***** END ARMOR *****

    // ***** ITEM *****
    public addItems(items: IItem[]) {
        this.equipment.items = [...this.equipment.items, ...items];
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
    }

    public dropItem(item: IItem) {
        this.equipment.items = this.equipment.items.filter(a => a.name !== item.name);
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
    }

    public sellItem(item: IItem) {
        this.currency = getCurrencyFromTotal(item.price + this.currency.total);
        this.dropItem(item);
    }

    public setItemAmount(name: string, amount: number) {
        const item: IItem = this.equipment.items.find(i => i.name === name);
        item.amount = amount;
        this.saveLocalCharacter();
        this.onEquipmentChange.next({ ... this.equipment });
    }
    // ***** END ITEM *****

    // ***** CURRENCY *****
    public setAuto(isAuto: boolean) {
        this.currency.isAuto = isAuto;
        if (isAuto) {
            this.currency = getCurrencyFromTotal(this.currency.total);
        }
        this.saveLocalCharacter();
    }

    public addCoins(type: string = 'copper', amount: number = 1) {
        if (this.currency.isAuto) {
            this.currency = getCurrencyFromTotal(this.currency.total + amount * coinTypes[type]);
        } else {
            const coins = {};
            coins[type] = amount + this.currency[type];
            this.currency = getCurrency(coins, this.currency);
        }
        this.saveLocalCharacter();
    }

    public setCoins(type: string, amount: number) {
        const coins = {};
        coins[type] = amount;
        this.currency = getCurrency(coins, this.currency);
        this.saveLocalCharacter();
    }
    // ***** END CURRENCY *****

    // ***** NOTES *****
    public getNote(title: string, lastModified: Date) {
        return this.notes.find(n => n.title === title && n.lastModified === lastModified)
    }
    public addNote(note: INote) {
        this.notes.unshift(note);
        this.saveLocalCharacter();
    }

    public removeNote(note: INote) {
        this.notes = this.notes.filter(n => !(n.title === note.title && n.lastModified === note.lastModified));
        this.saveLocalCharacter();
    }

    public editNote(oldNote: INote, newNote: INote) {
        this.removeNote(oldNote);
        this.notes.unshift(newNote);
        this.saveLocalCharacter();
    }
    // ***** END NOTES *****
    public setLevel(level: number) {
        this.state.level = level;
        this.setSpellsSlots();
        this.saveLocalCharacter();
    }

    public getLevelByExperience(experience) {
        let level;
        experienceLevels.forEach((e, idx) => {
            if (e <= experience) {
                level = idx;
            }
        })
        return level;
    }

    public setSpellsSlots() {
        this.spells.slots = getSpellSlots(this.class.name, this.state.level);
    }

    public setExperience(experience: number) {
        this.state.experience = experience;
        this.setLevel(this.getLevelByExperience(experience));
    }

    rest() {
        this.state.health.current = this.getMaxHealth();
        this.state.health.extra = 0;
        this.state.spellSlots = getSpellSlots(this.class.name, this.state.level);
        this.saveLocalCharacter();
        this.onStateChange.next({ ...this.state });
    }
}
