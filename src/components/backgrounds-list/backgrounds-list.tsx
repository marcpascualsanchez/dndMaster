import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

import { ICharacterParams } from '../../models/Character';
import { HauntedOne } from '../../models/backgrounds/HauntedOne';
import { Acolyte } from '../../models/backgrounds/Acolyte';
import { Soldier } from '../../models/backgrounds/Soldier';
import { IBackground } from '../../models/backgrounds/Background';

@Component({
    tag: 'backgrounds-list',
    styleUrl: 'backgrounds-list.scss'
})
export class BackgroundsList {
    public allBackgrounds = [HauntedOne, Acolyte, Soldier];

    @Event({
        eventName: 'paramSelected',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) selectEmitter: EventEmitter;

    @Prop() isCreating: boolean;
    @Prop() characterParams: ICharacterParams;
    @Prop() step: string;

    @State() selectedBackground: string = null;
    public imgBasePath: string = "../../assets/img/background";

    selectBackground(data: any) {
        if (this.selectedBackground === data.currentTarget.id) {
            this.selectedBackground = null;
        } else {
            const elementId = data.currentTarget.id
            this.selectedBackground = elementId;
        }
    }

    confirmBackground(background: IBackground) {
        this.characterParams.equipmentOptions = this.characterParams.equipmentOptions.concat(background.equipmentOptions);
        this.characterParams.languagesOptions = this.characterParams.languagesOptions.concat(background.languagesOptions);
        this.characterParams.skillsOptions = this.characterParams.skillsOptions.concat(background.skillsOptions);
        const dataToEmit = { step: 'background', param: background };
        this.selectEmitter.emit(dataToEmit); // this ends flow
    }

    getSelectButton(background: IBackground) {
        if (this.isCreating) {
            return (
                <ion-row>
                    <ion-col text-center size="4" offset="4">
                        <ion-icon class="select-option" color="primary" onClick={() => this.confirmBackground(background)} name="play-circle"></ion-icon>
                    </ion-col>
                </ion-row>);
        } else {
            return;
        }
    }

    getImage(name: string) {
        const path = `${this.imgBasePath}/${name}.jpg`;
        return (
            <ion-img src={path} no-padding />
        );
    }

    getDescription(background: IBackground) {
        if (background.name === this.selectedBackground) {
            return background.description.short;
        }
        return background.description.long;
    }

    getBackgroundCard(background: IBackground) {
        return (
            <ion-item>
                <ion-grid class="card-height">
                    <ion-row padding-top>
                        <ion-text class="name ion-text-capitalize">{background.name}</ion-text>
                    </ion-row>
                    <ion-row padding-top>
                        <ion-text class="subtitle ion-text-capitalize">{this.getDescription(background)}</ion-text>
                    </ion-row>
                </ion-grid>
            </ion-item>
        );
    }

    render() {
        return this.allBackgrounds.map((b) => {
            return (
                <ion-card id={b.name} onClick={(e) => this.selectBackground(e)}>
                    <ion-card-header no-padding>
                        <ion-grid no-padding>
                            <ion-row>
                                <ion-col class="image-col" size="4" no-padding>
                                    <div class="class-image">{this.getImage(b.name)}</div>
                                    <div class="image-triangle"></div>
                                </ion-col>
                                <ion-col size="8" class="info-col card-height" no-padding>
                                    {this.getBackgroundCard(b)}
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-header>
                    <ion-card-content class={`${this.selectedBackground === b.name ? 'extended' : 'unextended'} card-extension`}>
                        <ion-grid no-padding>
                            <ion-row class="regular-stats">
                                <ion-col offset="1" size="10">
                                    <ion-list>
                                        <ion-item>
                                            <ion-text>skills proficiency: (skill options here)</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>items: (equipment options here</ion-text>
                                        </ion-item>
                                        <ion-item>
                                            <ion-text>languages: (languages options here)</ion-text>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                            </ion-row>
                            {this.getSelectButton(b)}
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            );
        });
    }
}
