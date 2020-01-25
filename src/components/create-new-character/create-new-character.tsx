import { Component, h, Prop, Listen } from '@stencil/core';
import { ICharacterParams, Character } from '../../models/Character';

@Component({
    tag: 'create-new-character',
    styleUrl: 'create-new-character.scss'
})
export class CharactersList {

    private allSteps: string[] = ['race', 'class', 'background', 'options', 'abilities', 'personal']; //ordered by appareance
    // private previousStep: string; // TODO: manage backbutton
    private characterParams: ICharacterParams;

    @Prop() public step: string;
    @Listen('paramSelected')
    paramSelectedHandler(event: CustomEvent) {
        this.characterParams[event.detail.step] = event.detail.param;
        if (this.step === this.allSteps[this.allSteps.length - 1]) {
            const newCharId = this.createNewCharacter();
            window.location.href = `/character-sheet/${newCharId}`;
            return;  // ends flow
        }
        // this.previousStep = this.allSteps.find((s, idx) => {
        //     if (s === event.detail.step) {
        //         this.step = this.allSteps[idx + 1];
        //         return true;
        //     }
        // });
    }

    constructor() { // store params from every step
        this.characterParams = {
            equipmentOptions: [],
            languagesOptions: [],
            languages: [],
            proficiency: {
                skillMods: [],
                savingThrows: [],
                armors: [],
                weapons: [],
            },
            skillsOptions: [],
            currency: { // TODO: choose money on creation
                total: 0,
                copper: 0,
                silver: 0,
                electrum: 0,
                gold: 0,
                platinum: 0,
              }
        };
    }

    createNewCharacter() {
        const newCharacter = new Character();
        newCharacter.setCharacterByBaseParams(this.characterParams);
        newCharacter.saveLocalCharacter();
        return newCharacter._id;
    }

    getStepComponent() {
        let stepComponent;
        switch (this.step) {
            case ('race'):
                stepComponent = <races-list isCreating={true} characterParams={this.characterParams}></races-list>
                break;
            case ('class'):
                stepComponent = <classes-list isCreating={true} characterParams={this.characterParams}></classes-list>
                break;
            case ('abilities'):
                stepComponent = <create-ability-score characterParams={this.characterParams}></create-ability-score>
                break;
            case ('background'):
                stepComponent = <backgrounds-list isCreating={true} characterParams={this.characterParams}></backgrounds-list>
                break;
            case ('options'):
                stepComponent = <choose-options characterParams={this.characterParams}></choose-options>
                break;
            case ('personal'):
                stepComponent = <character-personal-data characterParams={this.characterParams}></character-personal-data>
                break;
            default:
                stepComponent = <races-list isCreating={true} characterParams={this.characterParams}></races-list>
                break;
        }
        return stepComponent;
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>{this.characterParams.personal ? this.characterParams.personal.name : 'New character'}</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding">
                {this.getStepComponent()}
            </ion-content>,
        ];
    };
}