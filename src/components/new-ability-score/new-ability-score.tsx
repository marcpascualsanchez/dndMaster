import { Component, h } from '@stencil/core';

import { skills, EAbility } from '../Character';
import { Dice } from '../Dice';

@Component({
    tag: 'new-ability-score',
    styleUrl: 'new-ability-score.scss'
})
export class NewAbilityScore {
    private dice = new Dice();

    getSkillsList(ability: string) {
        return skills[ability].map(s => <p>{s}</p>);
    }

    getAbilityList() {
        // console.log('abilities', EAbility);
        // console.log('skills', skills);
        return Object.keys(EAbility).map((ability) =>
            <ion-row>
                <ion-col col-4>
                    <ion-item>
                        <h3>{ability}</h3>
                        <ion-input class="ability-square" required inputmode="numeric" type="number" max="18" min="3" placeholder="-"></ion-input>
                    </ion-item>
                </ion-col>
                <ion-col col-8>
                    {this.getSkillsList(ability)}
                </ion-col>
            </ion-row>
        );
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
                <ion-grid>
                    <ion-row>
                        <h3>Throws</h3>
                    </ion-row>
                    <ion-row>
                        {this.dice.getNewCharacterThrows().map(t => <ion-col col-2>{t}</ion-col>)}
                    </ion-row>
                    {this.getAbilityList()}
                </ion-grid>
            </ion-content>
        ];
    }
}
