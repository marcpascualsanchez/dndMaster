import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';

import { skills, EAbility, ICharacterParams } from '../models/Character';
import { Dice } from '../../utils/Dice';

@Component({
    tag: 'new-ability-score',
    styleUrl: 'new-ability-score.scss'
})
export class NewAbilityScore {
    private dice = new Dice();
    private inputs: any[];
    private abilityScore: any;

    @Event({
        eventName: 'paramSelected',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) selectEmitter: EventEmitter;
    @Prop() characterParams: ICharacterParams;
    @State() isFormValid: boolean = false;
    @State() diceThrows: any[];

    constructor() {
        this.initialize();
    }

    initialize() {
        this.throwDices();
        this.abilityScore = {};
        Object.keys(EAbility).forEach((ability) => this.abilityScore[ability] = undefined);
    }

    componentDidLoad() {
        this.inputs = Array.from(document.querySelectorAll('.ability-input'));
    }

    setUsedThrows() {
        // Get used values for every input
        let usedThrows = [];
        this.inputs.forEach((ai: any) => {
            if (ai.value) {
                usedThrows.push(ai.value);
            }
        });

        // Check which input values are used and changes State
        this.diceThrows = this.diceThrows.map((dt) => {
            const foundUsedThrow = usedThrows.find(ut => dt.value === ut);
            if (foundUsedThrow && foundUsedThrow !== 0) {
                dt.isUsed = true;
                usedThrows.splice(usedThrows.indexOf(foundUsedThrow), 1);
            } else {
                dt.isUsed = false;
            }
            return dt;
        });
    }

    validateInputs() {
        if (this.inputs.some(i => !i.value)) {
            this.isFormValid = false;
        } else {
            this.isFormValid = true;
        }
    }

    /*  
    *   Remove every selected dice throw class and redo checking all input values
    **/
    onScoreInput(event) {
        this.abilityScore[event.target.name] = event.detail.value;
        this.setUsedThrows();
        this.validateInputs();
    }

    getSkillProficiencyIcon(skill: string) {
        //TODO: check proficiency coming from previous steps
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
        return skills[ability].map((s) => <p>{this.getSkillProficiencyIcon(s)}{s}</p>);
    }

    getAbilityList() {
        return Object.keys(this.abilityScore).map((ability) => [
            <ion-row>
                <ion-item>
                    <h3 text-capitalize>{ability}</h3>
                </ion-item>
            </ion-row>,
            <ion-row text-capitalize>
                <ion-col col-4>
                    <ion-item>
                        <ion-select name={ability} onIonChange={(e) => this.onScoreInput(e)} class="ability-input" placeholder="-" value={this.abilityScore[ability]}>
                            {this.diceThrows.map(d => <ion-select-option value={d.value} disabled={d.isUsed}>{d.value}</ion-select-option>)}
                        </ion-select>
                    </ion-item>
                </ion-col>
                <ion-col col-8>
                    {this.getSkillsList(ability)}
                </ion-col>
            </ion-row>
        ]);
    }

    confirmScore() {
        this.selectEmitter.emit({ step: 'abilities', param: this.abilityScore });
    }

    throwDices() {
        this.diceThrows = this.dice.getNewCharacterThrows().map(dt => ({ value: dt, isUsed: false }));
    }

    render() {
        return [
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        Throws
                        <ion-icons>
                            <ion-icon onClick={() => { this.initialize() }} name="refresh-circle" color="primary" slot="end"></ion-icon>
                        </ion-icons>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid>
                        <ion-row>
                            {this.diceThrows.map(dt => <ion-col col-2 class={`dice-throws ${dt.isUsed ? 'used-throw' : ''}`} text-center>{dt.value}</ion-col>)}
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
