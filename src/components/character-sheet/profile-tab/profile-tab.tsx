import { Component, h, Prop } from '@stencil/core';
import { ICharacter } from '../../../models/Character';

@Component({
  tag: 'profile-tab',
  styleUrl: 'profile-tab.scss',
  shadow: true
})
export class ProfileTab {

  @Prop() character: ICharacter;

  render() {
    return (
      <ion-card>
        <ion-grid>
          <ion-grid>
            <level-manager character={this.character}></level-manager>
          </ion-grid>
          <ion-row>
            <ion-col size="12">
              <h3>Proficiencies</h3>
              <p>Skills: {this.character.proficiency.skillMods.toString()}</p>
              <p>Abilities: {this.character.proficiency.savingThrows.toString()}</p>
              <p>Weapons: {this.character.proficiency.weapons.toString()}</p>
              <p>Armors: {this.character.proficiency.armors.toString()}</p>
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
        <ion-grid>
          <ion-row>
            <avatar-customizer></avatar-customizer>
          </ion-row>
        </ion-grid>
      </ion-card>
    );
  }

}
