import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

import { baseParams as fighterBase } from '../../models/classes/Fighter';
import { baseParams as barbarianBase } from '../../models/classes/Barbarian';
import { IClass } from '../../models/classes/Class';
import { ICharacterParams } from '../../models/Character';

@Component({
    tag: 'classes-list',
    styleUrl: 'classes-list.scss'
})
export class ClassesList {
    public allClasses = [barbarianBase, fighterBase];

    @Event({
        eventName: 'paramSelected',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) selectEmitter: EventEmitter;

    @Prop() isCreating: boolean;
    @Prop() characterParams: ICharacterParams;
    @Prop() step: string;

    @State() selectedClass: string = null;
    public imgBasePath: string = "../../assets/img/class";

    selectClass(data: any) {
        if (this.selectedClass === data.currentTarget.id) {
            this.selectedClass = null;
        } else {
            const elementId = data.currentTarget.id
            this.selectedClass = elementId;
        }
    }

    confirmClass(characterClass: IClass) {
        this.characterParams.equipmentOptions = this.characterParams.equipmentOptions.concat(characterClass.equipmentOptions);
        this.characterParams.skillsOptions = this.characterParams.skillsOptions.concat(characterClass.skillsOptions);
        const dataToEmit = { step: 'class', param: characterClass };
        this.selectEmitter.emit(dataToEmit); // this ends flow
    }

    getSelectButton(charClass: IClass) {
        if (this.isCreating) {
            return (
                <ion-row>
                    <ion-col text-center size="4" offset="4">
                        <ion-icon class="select-option" color="primary" onClick={() => this.confirmClass(charClass)} name="play-circle"></ion-icon>
                    </ion-col>
                </ion-row>);
        } else {
            return;
        }
    }

    getClassTraits(charClass: IClass) {
        if (charClass.classTraits) {
            const abilityList = charClass.classTraits.map((ability) => {
                return <ion-item><ion-text>Special: {ability}</ion-text></ion-item>
            });

            return (
                <ion-row class="exclusive-stats">
                    <ion-col offset="1" size="10">
                        <ion-list>
                            {abilityList}
                        </ion-list>
                    </ion-col>
                </ion-row>
            );
        }
        return null;
    }

    getImage(name: string) {
        const path = `${this.imgBasePath}/${name}.jpg`;
        return (
            <ion-img src={path} no-padding />
        );
    }

    getDescription(charClass) {
        if (charClass.name === this.selectedClass) {
            return charClass.description.short;
        }
        return charClass.description.long;
    }

    getClassCard(charClass: IClass) {
        return (
            <ion-item>
                <ion-grid class="card-height">
                    <ion-row padding-top>
                        <ion-text class="name ion-text-capitalize">{charClass.name}</ion-text>
                    </ion-row>
                    <ion-row padding-top>
                        <ion-text class="subtitle ion-text-capitalize">{this.getDescription(charClass)}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    render() {
        return this.allClasses.map((c) => {
            return (
                <ion-card id={c.name} onClick={(e) => this.selectClass(e)}>
                    <ion-card-header no-padding>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col class="image-col" size="4" no-padding>
                                    <div class="class-image">{this.getImage(c.name)}</div>
                                    <div class="image-triangle"></div>
                                </ion-col>
                                <ion-col size="8" class="info-col card-height" no-padding>
                                    {this.getClassCard(c)}
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-header>
                    <ion-card-content class={`${this.selectedClass === c.name ? 'extended' : 'unextended'} card-extension`}>
                        <ion-grid no-padding>
                            <ion-row class="regular-stats">
                                <ion-col offset="1" size="10">
                                    <ion-list>
                                        <ion-item>
                                            <ion-text>baseHealth: {c.baseHealth}</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>armorClass: {c.armorClass}</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>classTraits: {c.classTraits.toString()}</ion-text>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                            </ion-row>
                            {this.getClassTraits(c)}
                            {this.getSelectButton(c)}
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            );
        });
    }
}
