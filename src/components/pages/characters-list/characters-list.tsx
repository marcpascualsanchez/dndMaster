import { IonPage, IonContent, IonFab, IonFabButton, IonIcon, IonCard, IonItem, IonImg, IonGrid, IonRow, IonCol, IonText, IonCardContent } from '@ionic/react';
import { add } from 'ionicons/icons';

import './characters-list.scss';

import React from 'react';

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
        image: 'druidHalf-orc',
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

function getCharacterImage(name: string) {
    const path = `../../assets/img/profileImages/${name}.jpg`;
    return (
        <IonImg src={path} no-padding />
    );
}

function getCharacterLevelBadge(level: number) {
    return (
        <div className="image-triangle">
            <div className="level-badge">
                <span className="level-value">{level}</span>
            </div>
        </div>
    );
}

function getCharacterCard(character: ICharacter) {
    return (
        <IonItem>
            <IonGrid className="character-info">
                <IonRow className="ion-padding-top">
                    <IonText className="name ion-text-capitalize">{character.name},&nbsp;</IonText>
                    <IonText className="title ion-text-capitalize">{character.title}</IonText>
                </IonRow>
                <IonRow className="ion-padding-top">
                    <IonText className="subtitle ion-text-capitalize">{character.class}&nbsp;{character.race}</IonText>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
}

function getHtml(characters: ICharacter[]) {
    return characters.map((ch) => {
        return (
            <IonCard key={ch.id}>
                <IonCardContent className="ion-no-padding">
                    <IonGrid className="ion-no-padding">
                        <IonRow>
                            <IonCol size="4" className="ion-no-padding">
                                <div className="profile-image">{getCharacterImage(ch.image)}</div>
                                {getCharacterLevelBadge(ch.level)}
                            </IonCol>
                            <IonCol size="8" className="ion-no-padding info-col character-info">
                                {getCharacterCard(ch)}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        );
    });
}

const CharactersList: React.FC = () => {
    const charactersHtml = getHtml(mockChars);

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {charactersHtml}

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/createCharacter">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default CharactersList;