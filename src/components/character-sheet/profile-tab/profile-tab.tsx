import { Component, h, Prop } from '@stencil/core';
import { ICharacterParams, ICharacter } from '../../models/Character';
import { concatUniqueValuesArray, getUniqueValuesArray } from '../../../utils/utils';

@Component({
  tag: 'profile-tab',
  styleUrl: 'profile-tab.scss',
  shadow: true
})
export class ProfileTab {

  @Prop() character: ICharacter;

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <h3>Proficiencies</h3>
            <p>Abilities: {this.character.proficiency.skillMods.toString()}</p>
            <p>Skills: {this.character.proficiency.savingThrows.toString()}</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <h3>Languages</h3>
            <p>{this.character.languages.toString()}</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <h3>Feats and Traits</h3>
            <p>{this.character.race.specialAbilities.toString()}</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
