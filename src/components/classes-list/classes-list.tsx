import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

import { baseParams as fighterBase } from '../pages/classes/Fighter';
import { baseParams as barbarianBase } from '../pages/classes/Barbarian';
import { IClass } from '../pages/classes/Class';

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
    @Prop() step: string;

    @State() selectedClass: string = null;
    public imgBasePath: string = "../../assets/img/classImages";
    // AbilityScore images from https://chachart.net/radar?lang=en

    selectClass(data: any) {
        if (this.selectedClass === data.currentTarget.id) {
            this.selectedClass = null;
        } else {
            const elementId = data.currentTarget.id
            this.selectedClass = elementId;
            // location.href = `#${elementId}`;
        }
    }

    getSelectButton(charClass: IClass) {
        if (this.isCreating) {
            const dataToEmit = { step: 'class', param: charClass };
            return (
                <ion-row>
                    <ion-col text-center size="4" offset="4">
                        <ion-icon class="select-option" color="primary" onClick={() => this.selectEmitter.emit(dataToEmit)} name="play-circle"></ion-icon>
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
            return charClass.description.long;
        }
        return charClass.description.short;
    }

    getClassCard(charClass: IClass) {
        return (
            <ion-item>
                <ion-grid class="card-height">
                    <ion-row class="ion--padding-top">
                        <ion-text class="name ion-text-capitalize">{charClass.name}</ion-text>
                    </ion-row>
                    <ion-row class="ion--padding-top">
                        <ion-text class="subtitle ion-text-capitalize">{this.getDescription(charClass)}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    render() {
        console.log(this.isCreating);
        return this.allClasses.map((c) => {
            return (
                <ion-card id={c.name} onClick={(e) => this.selectClass(e)}>
                    <ion-card-header no-padding>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col size="4" no-padding>
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
                                            <ion-text>healthGrowth: {c.healthGrowth}</ion-text>
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
