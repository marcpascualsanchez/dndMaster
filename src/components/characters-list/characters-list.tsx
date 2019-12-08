import { Component, h } from '@stencil/core';

interface ICharacter {
    id: string;
    level: number;
    name: string;
    title?: string;
    class: string;
    race: string;
    image: string;
}

const mockChars: ICharacter[] = [
    {
        id: '000',
        level: 69,
        name: 'marcus',
        title: 'the First',
        class: 'druid',
        race: 'half-orc',
        image: 'DruidHalf-Orc',
    },
    {
        id: '001',
        level: 420,
        name: 'sergios',
        title: 'the bastard',
        class: 'paladin',
        race: 'elf',
        image: 'PaladinElf',
    },
]

@Component({
    tag: 'characters-list',
    styleUrl: 'characters-list.scss'
})
export class CharactersList {
    getCharacterImage(name: string) {
        const path = `../../assets/img/profileImages/${name}.jpg`;
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

    getCharacterCard(character: ICharacter) {
        return (
            <ion-item>
                <ion-grid class="character-info">
                    <ion-row class="ion-padding-top">
                        <ion-text class="name ion-text-capitalize">{character.name},&nbsp;</ion-text>
                        <ion-text class="title ion-text-capitalize">{character.title}</ion-text>
                    </ion-row>
                    <ion-row class="ion-padding-top">
                        <ion-text class="subtitle ion-text-capitalize">{character.class}&nbsp;{character.race}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    getHtml(characters: ICharacter[]) {
        return characters.map((ch) => {
            return (
                <ion-card key={ch.id}>
                    <ion-card-content class="ion-no-padding">
                        <ion-grid class="ion-no-padding">
                            <ion-row>
                                <ion-col size="4" class="ion-no-padding image-col">
                                    <div class="profile-image">{this.getCharacterImage(ch.image)}</div>
                                    {this.getCharacterLevelBadge(ch.level)}
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
        const charactersHtml = this.getHtml(mockChars);

        return (
            <ion-content class="ion-padding">
                {charactersHtml}

                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button href="/create-new-character">
                        <ion-icon name="add" />
                    </ion-fab-button>
                </ion-fab>
            </ion-content>
        );
    };
}