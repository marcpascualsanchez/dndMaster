import { Component, h } from '@stencil/core';

import { skills, EAbility } from '../Character';
import { Dice } from '../Dice';

@Component({
    tag: 'new-ability-score',
    styleUrl: 'new-ability-score.scss'
})
export class NewAbilityScore {
    private dice = new Dice();

    /*  
    *   Remove every selected dice throw class and redo checking all input values
    **/
    onScoreInput() {
        const selectedClass = 'used-throw';
        const diceThrowsElement = Array.from(document.querySelectorAll('.dice-throws'));
        const abilityInputs = Array.from(document.querySelectorAll('.ability-input'));
        let usedThrows = [];

        abilityInputs.forEach((ai: any) => {
            if (ai.value) {
                usedThrows.push(ai.value);
            }
        });

        diceThrowsElement.forEach(dt => dt.classList.remove(selectedClass));
        diceThrowsElement.forEach((dt) => {
            const foundUsedThrow = usedThrows.find(ut => dt.innerHTML === ut && !dt.classList.contains(selectedClass))
            console.log(foundUsedThrow);
            if (foundUsedThrow) {
                usedThrows.splice(usedThrows.indexOf(foundUsedThrow), 1);
                dt.classList.add(selectedClass);
                console.log
            }
        })
    }

    getProfficencyIcon(skill: string) {
        //TODO: check profficency coming from previous steps
        return <ion-icon name="radio-button-off"></ion-icon>;
    }

    getSkillsList(ability: string) {
        return skills[ability].map((s) => <p>{this.getProfficencyIcon(s)}{s}</p>);
    }

    getAbilityList() {
        return Object.keys(EAbility).map((ability) => [
            <ion-row>
                <ion-item>
                    <h3 text-capitalize>{ability}</h3>
                </ion-item>
            </ion-row>,
            <ion-row text-capitalize>
                <ion-col col-4>
                    <ion-item>
                        <ion-input onInput={() => this.onScoreInput()} class="ability-input" required inputmode="numeric" type="number" max="18" min="3" placeholder="-"></ion-input>
                    </ion-item>
                </ion-col>
                <ion-col col-8>
                    {this.getSkillsList(ability)}
                </ion-col>
            </ion-row>
        ]);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Ability Score</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content overflow-scroll="true">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            Throws
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-grid>
                            <ion-row>
                                {this.dice.getNewCharacterThrows().map(t => <ion-col col-2 class="dice-throws" text-center>{t}</ion-col>)}
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            Choose the ability score
                        </ion-card-title>
                    </ion-card-header>
                    {this.getAbilityList()}
                </ion-card>
            </ion-content>
        ];
    }
}
