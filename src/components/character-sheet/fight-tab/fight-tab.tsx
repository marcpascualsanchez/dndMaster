import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, IArmor } from '../../../models/Character';
import { IWeapon, WeaponManager } from '../../../utils/WeaponManager';

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
  @State() armors: IArmor[];
  @State() equippedArmor: IArmor;
  
  private weaponManager: WeaponManager;
  private mockArmors: IArmor[] = [{ name: 'chainmail', armorClass: 16, amount: 1 }, { name: 'iron chest', armorClass: 18, amount: 1 }];

  constructor() {
    this.weapons = this.character.equipment.weapons;
    this.armors = this.character.equipment.armors;
    this.equippedArmor = this.character.equipped.armor;
    this.weaponManager = new WeaponManager();
  }

  getWeaponList(weapons: IWeapon[]) {
    return weapons.map((w) =>
      <ion-row custom-value={w}>
        <ion-col size="1">{w.amount}</ion-col>
        <ion-col size="3">{w.name}</ion-col>
        <ion-col size="3">bonus</ion-col>
        <ion-col size="3">{w.damage}</ion-col>
        <ion-col size="2">{w.type}</ion-col>
      </ion-row>
    );
  }

  /**
   * Show weapon choose-list with only weapons that are not owned by character
   */
  showWeaponModal() {
    const ownedWeaponsNames: string[] = this.weapons.map(w => w.name);
    const nonownedWeapons = this.weaponManager.getAll().filter(w => ownedWeaponsNames.indexOf(w.name) < 0); // replace mock w real weapons
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getWeaponList(nonownedWeapons);
    chooseListElement['title'] = 'Choose a weapon';
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenWeapons: IWeapon[]) => {
      this.weapons = this.weapons.concat(chosenWeapons);
      this.character.equipment.weapons = this.weapons;
    }
  }

  equipArmor(armor: IArmor) {
    if (!this.equippedArmor || this.equippedArmor.name !== armor.name) {
      this.equippedArmor = armor;
    } else {
      this.equippedArmor = null;
    }
    this.character.equipped.armor = this.equippedArmor;
  }

  getArmorList(armors: IArmor[]) {
    return armors.map((a) =>
      <ion-row custom-value={a} onClick={() => this.equipArmor(a)}>
        <ion-col size="1">{a.amount}</ion-col>
        <ion-col size="8">{a.name}</ion-col>
        <ion-col size="3">{a.armorClass}</ion-col>
      </ion-row>
    );
  }

  /**
   * Show armor choose-list with only armor that are not owned by character
   */
  showArmorModal() {
    const ownedArmorsNames: string[] = this.armors.map(a => a.name);
    const nonownedArmors = this.mockArmors.filter(a => ownedArmorsNames.indexOf(a.name) < 0);
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getArmorList(nonownedArmors);
    chooseListElement['title'] = 'Choose an armor';
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenArmors: IArmor[]) => {
      this.armors = this.armors.concat(chosenArmors);
      this.character.equipment.armors = this.armors;
    }
  }

  getArmorClass() {
    return this.character.equipped.armor ? this.character.equipped.armor.armorClass : this.character.armorClass;
  }

  getHealth() {
    return this.character.baseHealth + this.character.calculateAbilityModifier(this.character.abilities.constitution, false);
  }

  render() {
    this.character.saveLocalCharacter();
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="4">Armor class: {this.getArmorClass()}</ion-col>
          <ion-col size="4">Health: {this.getHealth()}</ion-col>
          <ion-col size="4">Speed: {this.character.speed}ft</ion-col>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row>
              <h3>Weapons<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showWeaponModal()}></ion-icon></h3>
            </ion-row>
            <ion-row>
              <ion-col size="1"></ion-col>
              <ion-col size="3">Name</ion-col>
              <ion-col size="3">Bonus</ion-col>
              <ion-col size="3">Damage</ion-col>
              <ion-col size="2">Type</ion-col>
            </ion-row>
            {this.getWeaponList(this.character.equipment.weapons)}
          </ion-grid>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row>
              <h3>Armors<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showArmorModal()}></ion-icon></h3>
            </ion-row>
            <ion-row>
              <ion-col size="1"></ion-col>
              <ion-col size="8">Name</ion-col>
              <ion-col size="3">Class</ion-col>
            </ion-row>
            {this.getArmorList(this.character.equipment.armors)}
          </ion-grid>
        </ion-row>
      </ion-grid>
    );
  }

}
