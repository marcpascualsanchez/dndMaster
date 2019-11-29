/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppHome {}
  interface AppProfile {
    'name': string;
  }
  interface AppRoot {}
  interface CharactersList {}
  interface ClassesList {
    'isCreating': boolean;
    'step': string;
  }
  interface CreateNewCharacter {
    'step': string;
  }
  interface NewAbilityScore {
    'characterParams': any;
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

  interface HTMLCharactersListElement extends Components.CharactersList, HTMLStencilElement {}
  var HTMLCharactersListElement: {
    prototype: HTMLCharactersListElement;
    new (): HTMLCharactersListElement;
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

  interface HTMLNewAbilityScoreElement extends Components.NewAbilityScore, HTMLStencilElement {}
  var HTMLNewAbilityScoreElement: {
    prototype: HTMLNewAbilityScoreElement;
    new (): HTMLNewAbilityScoreElement;
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
    'characters-list': HTMLCharactersListElement;
    'classes-list': HTMLClassesListElement;
    'create-new-character': HTMLCreateNewCharacterElement;
    'new-ability-score': HTMLNewAbilityScoreElement;
    'races-list': HTMLRacesListElement;
  }
}

declare namespace LocalJSX {
  interface AppHome {}
  interface AppProfile {
    'name'?: string;
  }
  interface AppRoot {}
  interface CharactersList {}
  interface ClassesList {
    'isCreating'?: boolean;
    'onParamSelected'?: (event: CustomEvent<any>) => void;
    'step'?: string;
  }
  interface CreateNewCharacter {
    'step'?: string;
  }
  interface NewAbilityScore {
    'characterParams'?: any;
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
    'characters-list': CharactersList;
    'classes-list': ClassesList;
    'create-new-character': CreateNewCharacter;
    'new-ability-score': NewAbilityScore;
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
      'characters-list': LocalJSX.CharactersList & JSXBase.HTMLAttributes<HTMLCharactersListElement>;
      'classes-list': LocalJSX.ClassesList & JSXBase.HTMLAttributes<HTMLClassesListElement>;
      'create-new-character': LocalJSX.CreateNewCharacter & JSXBase.HTMLAttributes<HTMLCreateNewCharacterElement>;
      'new-ability-score': LocalJSX.NewAbilityScore & JSXBase.HTMLAttributes<HTMLNewAbilityScoreElement>;
      'races-list': LocalJSX.RacesList & JSXBase.HTMLAttributes<HTMLRacesListElement>;
    }
  }
}


