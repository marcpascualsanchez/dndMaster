/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Character,
  ICharacter,
  ICharacterParams,
} from './components/models/Character';

export namespace Components {
  interface AppHome {}
  interface AppProfile {
    'name': string;
  }
  interface AppRoot {}
  interface CharacterPersonalData {
    'characterParams': ICharacterParams;
  }
  interface CharacterSheet {
    'character': Character;
    'characterId': string;
  }
  interface CharactersList {}
  interface ChooseList {
    'cb': Function;
    'elementList': any[];
    'maxChosen': number;
    'minChosen': number;
    'title': string;
    'valueAttribute': string;
    'visible': boolean;
  }
  interface ClassesList {
    'characterParams': ICharacterParams;
    'isCreating': boolean;
    'step': string;
  }
  interface CreateNewCharacter {
    'step': string;
  }
  interface FightTab {
    'character': ICharacter;
  }
  interface MagicTab {
    'character': ICharacter;
  }
  interface MiscTab {
    'character': ICharacter;
  }
  interface NewAbilityScore {
    'characterParams': ICharacterParams;
  }
  interface NewEquipment {
    'characterParams': ICharacterParams;
  }
  interface ProfileTab {
    'character': ICharacter;
  }
  interface RacesList {
    'isCreating': boolean;
    'step': string;
  }
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCharacterPersonalDataElement extends Components.CharacterPersonalData, HTMLStencilElement {}
  var HTMLCharacterPersonalDataElement: {
    prototype: HTMLCharacterPersonalDataElement;
    new (): HTMLCharacterPersonalDataElement;
  };

  interface HTMLCharacterSheetElement extends Components.CharacterSheet, HTMLStencilElement {}
  var HTMLCharacterSheetElement: {
    prototype: HTMLCharacterSheetElement;
    new (): HTMLCharacterSheetElement;
  };

  interface HTMLCharactersListElement extends Components.CharactersList, HTMLStencilElement {}
  var HTMLCharactersListElement: {
    prototype: HTMLCharactersListElement;
    new (): HTMLCharactersListElement;
  };

  interface HTMLChooseListElement extends Components.ChooseList, HTMLStencilElement {}
  var HTMLChooseListElement: {
    prototype: HTMLChooseListElement;
    new (): HTMLChooseListElement;
  };

  interface HTMLClassesListElement extends Components.ClassesList, HTMLStencilElement {}
  var HTMLClassesListElement: {
    prototype: HTMLClassesListElement;
    new (): HTMLClassesListElement;
  };

  interface HTMLCreateNewCharacterElement extends Components.CreateNewCharacter, HTMLStencilElement {}
  var HTMLCreateNewCharacterElement: {
    prototype: HTMLCreateNewCharacterElement;
    new (): HTMLCreateNewCharacterElement;
  };

  interface HTMLFightTabElement extends Components.FightTab, HTMLStencilElement {}
  var HTMLFightTabElement: {
    prototype: HTMLFightTabElement;
    new (): HTMLFightTabElement;
  };

  interface HTMLMagicTabElement extends Components.MagicTab, HTMLStencilElement {}
  var HTMLMagicTabElement: {
    prototype: HTMLMagicTabElement;
    new (): HTMLMagicTabElement;
  };

  interface HTMLMiscTabElement extends Components.MiscTab, HTMLStencilElement {}
  var HTMLMiscTabElement: {
    prototype: HTMLMiscTabElement;
    new (): HTMLMiscTabElement;
  };

  interface HTMLNewAbilityScoreElement extends Components.NewAbilityScore, HTMLStencilElement {}
  var HTMLNewAbilityScoreElement: {
    prototype: HTMLNewAbilityScoreElement;
    new (): HTMLNewAbilityScoreElement;
  };

  interface HTMLNewEquipmentElement extends Components.NewEquipment, HTMLStencilElement {}
  var HTMLNewEquipmentElement: {
    prototype: HTMLNewEquipmentElement;
    new (): HTMLNewEquipmentElement;
  };

  interface HTMLProfileTabElement extends Components.ProfileTab, HTMLStencilElement {}
  var HTMLProfileTabElement: {
    prototype: HTMLProfileTabElement;
    new (): HTMLProfileTabElement;
  };

  interface HTMLRacesListElement extends Components.RacesList, HTMLStencilElement {}
  var HTMLRacesListElement: {
    prototype: HTMLRacesListElement;
    new (): HTMLRacesListElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'character-personal-data': HTMLCharacterPersonalDataElement;
    'character-sheet': HTMLCharacterSheetElement;
    'characters-list': HTMLCharactersListElement;
    'choose-list': HTMLChooseListElement;
    'classes-list': HTMLClassesListElement;
    'create-new-character': HTMLCreateNewCharacterElement;
    'fight-tab': HTMLFightTabElement;
    'magic-tab': HTMLMagicTabElement;
    'misc-tab': HTMLMiscTabElement;
    'new-ability-score': HTMLNewAbilityScoreElement;
    'new-equipment': HTMLNewEquipmentElement;
    'profile-tab': HTMLProfileTabElement;
    'races-list': HTMLRacesListElement;
  }
}

declare namespace LocalJSX {
  interface AppHome {}
  interface AppProfile {
    'name'?: string;
  }
  interface AppRoot {}
  interface CharacterPersonalData {
    'characterParams'?: ICharacterParams;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
  }
  interface CharacterSheet {
    'character'?: Character;
    'characterId'?: string;
  }
  interface CharactersList {}
  interface ChooseList {
    'cb'?: Function;
    'elementList'?: any[];
    'maxChosen'?: number;
    'minChosen'?: number;
    'title'?: string;
    'valueAttribute'?: string;
    'visible'?: boolean;
  }
  interface ClassesList {
    'characterParams'?: ICharacterParams;
    'isCreating'?: boolean;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
    'step'?: string;
  }
  interface CreateNewCharacter {
    'step'?: string;
  }
  interface FightTab {
    'character'?: ICharacter;
  }
  interface MagicTab {
    'character'?: ICharacter;
  }
  interface MiscTab {
    'character'?: ICharacter;
  }
  interface NewAbilityScore {
    'characterParams'?: ICharacterParams;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
  }
  interface NewEquipment {
    'characterParams'?: ICharacterParams;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
  }
  interface ProfileTab {
    'character'?: ICharacter;
  }
  interface RacesList {
    'isCreating'?: boolean;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
    'step'?: string;
  }

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'character-personal-data': CharacterPersonalData;
    'character-sheet': CharacterSheet;
    'characters-list': CharactersList;
    'choose-list': ChooseList;
    'classes-list': ClassesList;
    'create-new-character': CreateNewCharacter;
    'fight-tab': FightTab;
    'magic-tab': MagicTab;
    'misc-tab': MiscTab;
    'new-ability-score': NewAbilityScore;
    'new-equipment': NewEquipment;
    'profile-tab': ProfileTab;
    'races-list': RacesList;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-profile': LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'character-personal-data': LocalJSX.CharacterPersonalData & JSXBase.HTMLAttributes<HTMLCharacterPersonalDataElement>;
      'character-sheet': LocalJSX.CharacterSheet & JSXBase.HTMLAttributes<HTMLCharacterSheetElement>;
      'characters-list': LocalJSX.CharactersList & JSXBase.HTMLAttributes<HTMLCharactersListElement>;
      'choose-list': LocalJSX.ChooseList & JSXBase.HTMLAttributes<HTMLChooseListElement>;
      'classes-list': LocalJSX.ClassesList & JSXBase.HTMLAttributes<HTMLClassesListElement>;
      'create-new-character': LocalJSX.CreateNewCharacter & JSXBase.HTMLAttributes<HTMLCreateNewCharacterElement>;
      'fight-tab': LocalJSX.FightTab & JSXBase.HTMLAttributes<HTMLFightTabElement>;
      'magic-tab': LocalJSX.MagicTab & JSXBase.HTMLAttributes<HTMLMagicTabElement>;
      'misc-tab': LocalJSX.MiscTab & JSXBase.HTMLAttributes<HTMLMiscTabElement>;
      'new-ability-score': LocalJSX.NewAbilityScore & JSXBase.HTMLAttributes<HTMLNewAbilityScoreElement>;
      'new-equipment': LocalJSX.NewEquipment & JSXBase.HTMLAttributes<HTMLNewEquipmentElement>;
      'profile-tab': LocalJSX.ProfileTab & JSXBase.HTMLAttributes<HTMLProfileTabElement>;
      'races-list': LocalJSX.RacesList & JSXBase.HTMLAttributes<HTMLRacesListElement>;
    }
  }
}


