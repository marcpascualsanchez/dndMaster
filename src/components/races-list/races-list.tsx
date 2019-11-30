import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

import { baseParams as dragonbornBase } from '../models/races/Dragonborn';
import { baseParams as halfOrcBase } from '../models/races/HalfOrc';
import { baseParams as humanBase } from '../models/races/Human';
import { baseParams as tieflingBase } from '../models/races/Tiefling';
import { IRace } from '../models/races/Race';

@Component({
    tag: 'races-list',
    styleUrl: 'races-list.scss'
})
export class RacesList {
    public allRaces = [dragonbornBase, halfOrcBase, humanBase, tieflingBase];

    @Event({
        eventName: 'paramSelected',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) selectEmitter: EventEmitter;

    @Prop() isCreating: boolean;
    @Prop() step: string;

    @State() selectedRace: string = null;
    public imgBasePath: string = "../../assets/img/raceImages";
    // AbilityScore images from https://chachart.net/radar?lang=en

    selectRace(data: any) {
        if (this.selectedRace === data.currentTarget.id) {
            this.selectedRace = null;
        } else {
            const elementId = data.currentTarget.id
            this.selectedRace = elementId;
            // location.href = `#${elementId}`;
        }
    }

    getSelectButton(race: IRace) {
        if (this.isCreating) {
            const dataToEmit = { step: 'race', param: race };
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

    getRaceAbilities(race: IRace) {
        if (race.raceAbility) {
            const abilityList = race.raceAbility.map((ability) => {
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

    getDescription(race) {
        if (race.name === this.selectedRace) {
            return race.description.long;
        }
        return race.description.short;
    }

    getRaceCard(race: IRace) {
        return (
            <ion-item>
                <ion-grid class="card-height">
                    <ion-row padding-top>
                        <ion-text class="name ion-text-capitalize">{race.name}</ion-text>
                    </ion-row>
                    <ion-row padding-top>
                        <ion-text class="subtitle ion-text-capitalize">{this.getDescription(race)}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    render() {
        return this.allRaces.map((r) => {
            return (
                <ion-card id={r.name} onClick={(e) => this.selectRace(e)}>
                    <ion-card-header no-padding>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col size="4" no-padding>
                                    <div class="race-image">{this.getImage(r.name)}</div>
                                    <div class="image-triangle"></div>
                                </ion-col>
                                <ion-col size="8" class="info-col card-height" no-padding>
                                    {this.getRaceCard(r)}
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-header>
                    <ion-card-content class={`${this.selectedRace === r.name ? 'extended' : 'unextended'} card-extension`}>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col offset="1" size="10">
                                    <ion-img class="ability-score" src={`${this.imgBasePath}/${r.name}AbilityScore.png`}></ion-img>
                                </ion-col>
                            </ion-row>
                            <ion-row class="regular-stats">
                                <ion-col offset="1" size="10">
                                    <ion-list>
                                        <ion-item>
                                            <ion-text>Size: {r.size}</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>Speed: {r.speed}</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>Languages: {r.languages.toString()}</ion-text>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                            </ion-row>
                            {this.getRaceAbilities(r)}
                            {this.getSelectButton(r)}
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            );
        });
    }
}
