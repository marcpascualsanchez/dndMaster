import { Component, h, Prop } from '@stencil/core';
import { ICharacter } from '../../models/Character';

@Component({
  tag: 'fight-tab',
  styleUrl: 'fight-tab.scss',
  shadow: true
})
export class FightTab {

  @Prop() character: ICharacter;
  private mockWeapons: any[] = [{ name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' },{ name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' },{ name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' },{ name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }, { name: 'sword', damage: '1d6', type: 'punxeta' }, { name: 'porra', damage: '3d4', type: 'pupita' }];

  getWeaponsList() {
    this.character.weapons = this.mockWeapons;
    return this.character.weapons.map((w) =>
      <ion-row custom-value={w}>
        <ion-col size="3">{w.name}</ion-col>
        <ion-col size="3">bonus</ion-col>
        <ion-col size="3">{w.damage}</ion-col>
        <ion-col size="3">{w.type}</ion-col>
      </ion-row>
    );
  }

  showWeaponModal() {
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getWeaponsList();
    chooseListElement['minChosen'] = 1;
    chooseListElement['maxChosen'] = 1;
    chooseListElement['title'] = 'Choose a weapon';
    chooseListElement['visible'] = true;
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="4">Armor class: {this.character.armorClass}</ion-col>
          <ion-col size="4">Health: {this.character.baseHealth + this.character.calculateAbilityModifier(this.character.abilities.constitution, false)}</ion-col>
          <ion-col size="4">Speed: {this.character.speed}ft</ion-col>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row>
              <h3>Weapons<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showWeaponModal()}></ion-icon></h3>
            </ion-row>
            <ion-row>
              <ion-col size="3">Name</ion-col>
              <ion-col size="3">Attack bonus</ion-col>
              <ion-col size="3">Damage</ion-col>
              <ion-col size="3">Type</ion-col>
            </ion-row>
            {this.getWeaponsList()}
          </ion-grid>
        </ion-row>
      </ion-grid>
    );
  }

}
