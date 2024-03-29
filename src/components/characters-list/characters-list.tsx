import { Component, h } from '@stencil/core';
import { ICharacterParams } from '../../models/Character';

@Component({
    tag: 'characters-list',
    styleUrl: 'characters-list.scss'
})
export class CharactersList {
    private characters: ICharacterParams[];

    constructor() {
        this.characters = JSON.parse(localStorage.getItem('characters')) || [];
    }

    getCharacterImage(name: string) {
        const path = `../../assets/img/profile/${name}`;
        return (
            <ion-img src={path} no-padding />
        );
    }

    getCharacterLevelBadge(level: number) {
        return (
            <div class="image-triangle">
                <div class="level-badge">
                    <span class="level-value">{level}</span>
                </div>
            </div>
        );
    }

    getCharacterCard(character: ICharacterParams) {
        return (
            <ion-item>
                <ion-grid class="character-info">
                    <ion-row class="ion-padding-top">
                        <ion-text class="name ion-text-capitalize">{character.personal.name}</ion-text>
                        {character.personal.title ? <ion-text class="title ion-text-capitalize">,&nbsp;{character.personal.title}</ion-text> : null}
                    </ion-row>
                    <ion-row class="ion-padding-top">
                        <ion-text class="subtitle ion-text-capitalize">{character.class.name}&nbsp;{character.race.name}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    getCharacterCards(characters: ICharacterParams[]) {
        if (characters.length === 0) {
            return <p>You do not have any character saved, let's <a href="/create-new-character">create one</a></p>
        }
        return characters.map((ch) => {
            return (
                <ion-card key={ch._id} href={`character-sheet/${ch._id}`}>
                    <ion-card-content class="ion-no-padding">
                        <ion-grid class="ion-no-padding">
                            <ion-row>
                                <ion-col size="4" class="ion-no-padding image-col">
                                    <div class="profile-image">{this.getCharacterImage(ch.personal.image)}</div>
                                    {this.getCharacterLevelBadge(ch.state.level)}
                                </ion-col>
                                <ion-col size="8" class="ion-no-padding info-col character-info">
                                    {this.getCharacterCard(ch)}
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            );
        });
    }

    render() {
        return ([
            <ion-content class="ion-padding">
                {this.getCharacterCards(this.characters)}
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button href="/create-new-character">
                        <ion-icon name="add" />
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ]);
    };
}