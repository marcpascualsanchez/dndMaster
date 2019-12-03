import { Component, Prop, h } from '@stencil/core';
import { skills, EAbility, ICharacterParams } from '../models/Character';

@Component({
  tag: 'character-sheet',
  styleUrl: 'character-sheet.scss',
})
export class CharacterSheet {

  @Prop() characterParams: ICharacterParams;

  getProfficencyIcon(skill: string) {
    //TODO: check profficency coming from previous steps
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
    return skills[ability].map((s) => <p>{this.getProfficencyIcon(s)}{s}</p>);
  }

  getAbilities() {
    const abilitiesHTML = Object.keys(EAbility).map((ability) => {
      return (
        <ion-row no-padding>
          <ion-col size="6" no-padding>
            <span>{ability}:</span>
            <span>{this.characterParams.abilities[ability]}</span>
          </ion-col>
          <ion-col size="6" no-padding>{this.getSkillsList(ability)}</ion-col>
        </ion-row>
      );
    });
    return abilitiesHTML;
  }

  render() {
    console.log('baseParams', this.characterParams);
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="4">Nom</ion-col>
          <ion-col size="8">
            <ion-grid>
              <ion-row>
                <ion-col size="4">{this.characterParams.class.name}</ion-col>
                <ion-col size="4">{this.characterParams.race.name}</ion-col>
                <ion-col size="4">lvl 1</ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="4">Armor: {this.characterParams.class.armorClass}</ion-col>
                <ion-col size="4">Health: {this.characterParams.class.healthGrowth * 1}</ion-col>
                <ion-col size="4">Speed: {this.characterParams.race.speed}</ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">percepció</ion-col>
          <ion-col size="4">iniciativa</ion-col>
          <ion-col size="4">inspiració</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-grid no-padding>
              {this.getAbilities()}
            </ion-grid>
          </ion-col>
          <ion-col size="6">
            <ion-grid></ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
