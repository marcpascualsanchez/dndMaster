import { Component, h, Prop, Listen } from '@stencil/core';
import { ICharacterParams } from '../models/Character';

@Component({
    tag: 'create-new-character',
    styleUrl: 'create-new-character.scss'
})
export class CharactersList {

    private allSteps: string[] = ['race', 'class', 'abilities', 'personal']; //ordered by appareance
    private previousStep: string; // TODO: manage backbutton
    private characterParams: ICharacterParams;

    @Prop() public step: string;
    @Listen('paramSelected')
    paramSelectedHandler(event: CustomEvent) {
        this.characterParams[event.detail.step] = event.detail.param;
        if (this.step === this.allSteps[this.allSteps.length - 1]) {
            this.createNewCharacter();
            window.location.href = `/character-sheet/${this.characterParams._id}`;
            return;  // ends flow
        }
        this.previousStep = this.allSteps.find((s, idx) => {
            if (s === event.detail.step) {
                this.step = this.allSteps[idx + 1];
                return true;
            }
        });
    }
    
    constructor() {
        this.characterParams = { // store params from every step
            _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            state: { level: 1 },
        };
    }

    createNewCharacter() {
        // TODO: create new char in mongo & localStorage, add it an id
        // TODO: navigate to characters/:_id
        console.log('creating character...', this.characterParams);
        const charactersItem = localStorage.getItem('characters');
        if (charactersItem) {
            const characters = JSON.parse(charactersItem);
            characters.push(this.characterParams);
            localStorage.setItem('characters', JSON.stringify(characters));
        } else {
            localStorage.setItem('characters', JSON.stringify([this.characterParams]));
        }
    }

    getStepComponent() {
        let stepComponent;
        switch (this.step) {
            case ('race'):
                stepComponent = <races-list isCreating={true}></races-list>
                break;
            case ('class'):
                stepComponent = <classes-list isCreating={true}></classes-list>
                break;
            case ('abilities'):
                stepComponent = <new-ability-score characterParams={this.characterParams}></new-ability-score>
                break;
            case ('personal'):
                stepComponent = <character-personal-data></character-personal-data>
                break;
            default:
                stepComponent = <races-list isCreating={true}></races-list>
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