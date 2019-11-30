import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';

import { skills, EAbility } from '../Character';
import { Dice } from '../Dice';

@Component({
    tag: 'new-ability-score',
    styleUrl: 'new-ability-score.scss'
})
export class NewAbilityScore {
    private dice = new Dice();

    private inputs: any[];

    @Event({
        eventName: 'paramSelected',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) selectEmitter: EventEmitter;

    @Prop() characterParams: any;
    @State() isFormValid: boolean = false;

    componentDidLoad() {
        this.inputs = Array.from(document.querySelectorAll('.ability-input'));
    }

    checkUsedThrows() {
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
            if (foundUsedThrow) {
                usedThrows.splice(usedThrows.indexOf(foundUsedThrow), 1);
                dt.classList.add(selectedClass);
            }
        })
    }

    validateInputs() {
        if (this.inputs.some(i => i.value === '')) {
            this.isFormValid = false;
        } else {
            this.isFormValid = true;
        }
    }

    /*  
    *   Remove every selected dice throw class and redo checking all input values
    **/
    onScoreInput() {
        this.checkUsedThrows();
        this.validateInputs();
    }

    getProfficencyIcon(skill: string) {
        //TODO: check profficency coming from previous steps
        let isProficiency = false;
        Object.keys(this.characterParams).forEach((cp) => {
            if (
                this.characterParams[cp].proficiency
                && this.characterParams[cp].proficiency.skillMods.some((sm) => skill === sm)
            ) {
                isProficiency = true;
            }
        })
        return <ion-icon name={isProficiency ? 'radio-button-on' : 'radio-button-off'}></ion-icon>;
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
                        <ion-input name={ability} onInput={() => this.onScoreInput()} class="ability-input" required inputmode="numeric" type="number" max="18" min="3" placeholder="-"></ion-input>
                    </ion-item>
                </ion-col>
                <ion-col col-8>
                    {this.getSkillsList(ability)}
                </ion-col>
            </ion-row>
        ]);
    }

    confirmScore() {
        const abilityScores = {};
        this.inputs.forEach(i => abilityScores[i.name] = i.value);
        this.selectEmitter.emit({ step: 'abilities', param: abilityScores });
    }

    render() {
        return [
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
            </ion-card>,
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        Choose the ability score
                        </ion-card-title>
                </ion-card-header>
                {this.getAbilityList()}
            </ion-card>,
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-button class="confirm-icon" onClick={() => this.isFormValid ? this.confirmScore() : null}>
                            <ion-icon name="checkmark-circle" color="success" class={this.isFormValid ? '' : 'disabled'}></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-footer>
        ];
    }
}
