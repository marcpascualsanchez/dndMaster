import { Component, h, Prop, Listen } from '@stencil/core';
import { ICharacterParams } from '../models/Character';

@Component({
    tag: 'create-new-character',
    styleUrl: 'create-new-character.scss'
})
export class CharactersList {

    private allSteps: string[] = ['race', 'class', 'abilities', 'sheet', 'end']; //ordered by appareance
    private previousStep: string; // TODO: manage backbutton

    @Listen('paramSelected')
    paramSelectedHandler(event: CustomEvent) {
        console.log('Received the custom todoCompleted event: ', event.detail);
        this.previousStep = this.allSteps.find((s, idx) => {
            if (s === event.detail.step) {
                this.step = this.allSteps[idx + 1];
                return true;
            }
        });
        this.characterParams[event.detail.step] = event.detail.param;
        console.log('step', this.step);
        if (this.step === this.allSteps[this.allSteps.length - 1]) {
            // TODO: navigate to characters/:_id
            this.createNewCharacter();
        }
    }

    @Prop() public step: string;

    private characterParams: ICharacterParams = {}; // store params from every step

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
            case ('sheet'):
                stepComponent = <character-sheet characterParams={this.characterParams}></character-sheet>
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
                    <ion-title>New character</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding">
                {this.getStepComponent()}
            </ion-content>,
        ];
    };
}