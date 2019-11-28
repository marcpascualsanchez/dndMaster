import { Component, h, Watch, Prop, Listen } from '@stencil/core';

@Component({
    tag: 'create-new-character',
    styleUrl: 'create-new-character.scss'
})
export class CharactersList {

    // TODO: manage end step
    private allSteps: string[] = ['race', 'class', 'abilities', 'end']; //ordered by appareance
    private previousStep: string;

    @Listen('paramSelected')
    todoCompletedHandler(event: CustomEvent) {
        console.log('Received the custom todoCompleted event: ', event.detail);
        this.previousStep = this.allSteps.find((s, idx) => {
            if(s === event.detail.step) {
                this.step = this.allSteps[idx + 1];
                return true;
            }
        });
        this.characterParams[event.detail.step] = event.detail.param;
    }

    @Prop() public step: string;

    @Watch('step')
    watchHandler(newValue: string, oldValue: string) {
        console.log('The new value of step is: ', newValue);
        console.log('The old value of step was: ', oldValue);
    }

    private characterParams: any = {}; // store params from every step

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
                    stepComponent = <new-ability-score></new-ability-score>
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