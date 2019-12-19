import { Component, h, Prop } from '@stencil/core';
import { ICharacter } from '../../models/Character';

@Component({
  tag: 'fight-tab',
  styleUrl: 'fight-tab.scss',
  shadow: true
})
export class FightTab {

  @Prop() character: ICharacter;

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="4">Armor class: {this.character.armorClass}</ion-col>
          <ion-col size="4">Health: {this.character.baseHealth + this.character.calculateAbilityModifier(this.character.abilities.constitution, false)}</ion-col>
          <ion-col size="4">Speed: {this.character.speed}ft</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">Armor class</ion-col>
          <ion-col size="4">Initiative</ion-col>
          <ion-col size="4">Speed</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
