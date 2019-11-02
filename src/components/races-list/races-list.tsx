import { Component, h } from '@stencil/core';

import { baseParams as dragonbornBase } from '../pages/races/Dragonborn';
import { baseParams as halfOrcBase } from '../pages/races/HalfOrc';
import { baseParams as humanBase } from '../pages/races/Human';
import { baseParams as tieflingBase } from '../pages/races/Tiefling';
import { IRace } from '../pages/races/Race';

@Component({
    tag: 'races-list',
    styleUrl: 'races-list.scss'
})
export class RacesList {
    public allRaces = [dragonbornBase, halfOrcBase, humanBase, tieflingBase];

    getImage(name: string) {
        const path = `../../../assets/img/raceImages/${name}.jpg`;
        return (
            <ion-img src={path} no-padding />
        );
    }

    getRaceCard(race: IRace) {
        return (
            <ion-item>
                <ion-grid class="character-info">
                    <ion-row class="ion--padding-top">
                        <ion-text class="name ion--text-capitalize">{race.name}</ion-text>
                    </ion-row>
                    <ion-row class="ion--padding-top">
                        <ion-text class="subtitle ion--text-capitalize">{race.description.short}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    getList(races: IRace[]) {
        return races.map((r) => {
            return (
                <ion-card>
                    <ion-card-content no-padding>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col size="4" no-padding>
                                    <div class="race-image">{this.getImage(r.name)}</div>
                                    <div class="image-triangle"></div>
                                </ion-col>
                                <ion-col size="8" class="info-col character-info" no-padding>
                                    {this.getRaceCard(r)}
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            );
        });
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Races</ion-title>
                </ion-toolbar>
            </ion-header>,
            this.getList(this.allRaces)
        ];
    }
}
