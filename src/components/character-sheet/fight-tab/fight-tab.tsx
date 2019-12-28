import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, IWeapon, IEquipment } from '../../models/Character';

@Component({
  tag: 'fight-tab',
  styleUrl: 'fight-tab.scss',
  shadow: true
})
export class FightTab {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() weapons: IWeapon[];
  private mockWeapons: IWeapon[] = [{ name: 'sword', bonus: '+1', damage: '1d6', type: 'punxeta' }, { name: 'porra', bonus: '+0', damage: '3d4', type: 'pupita' }];

  constructor() {
    this.weapons = this.character.equipment.weapons;
  }

  getWeaponsList(weapons: IWeapon[]) {
    return weapons.map((w) =>
      <ion-row custom-value={w}>
        <ion-col size="3">{w.name}</ion-col>
        <ion-col size="3">{w.bonus}</ion-col>
        <ion-col size="3">{w.damage}</ion-col>
        <ion-col size="3">{w.type}</ion-col>
      </ion-row>
    );
  }

  /**
   * Show weapon choose-list with only weapons that are not owned by character
   */
  showWeaponModal() {
    const ownedWeaponsNames: string[] = this.weapons.map(w => w.name);
    const nonownedWeapons = this.mockWeapons.filter(w => ownedWeaponsNames.indexOf(w.name) < 0); // replace mock w real weapons
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getWeaponsList(nonownedWeapons);
    chooseListElement['title'] = 'Choose a weapon';
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenWeapons: IWeapon[]) => {
      this.weapons = this.weapons.concat(chosenWeapons);
      this.character.equipment.weapons = this.weapons;
      this.character.saveLocalCharacter();
    }
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
              <ion-col size="3">Bonus</ion-col>
              <ion-col size="3">Damage</ion-col>
              <ion-col size="3">Type</ion-col>
            </ion-row>
            {this.getWeaponsList(this.character.equipment.weapons)}
          </ion-grid>
        </ion-row>
      </ion-grid>
    );
  }

}
