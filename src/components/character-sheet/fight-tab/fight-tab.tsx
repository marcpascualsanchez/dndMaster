import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../models/Character';
import { WeaponManager } from '../../../utils/WeaponManager';
import { IWeapon } from '../../../utils/weaponList';
import { ArmorManager } from '../../../utils/ArmorManager';
import { IArmor } from '../../../utils/armorList';

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
  @State() lastModified: Date;

  private weaponManager: WeaponManager;
  private armorManager: ArmorManager;

  constructor() {
    this.weapons = this.character.equipment.weapons;
    this.armors = this.character.equipment.armors;
    this.equippedArmor = this.character.equipped.armor;
    this.weaponManager = new WeaponManager();
    this.armorManager = new ArmorManager();
    this.character.onChange.subscribe(() => this.lastModified = new Date());
  }

  getWeaponList(weapons: IWeapon[], isExtendable: boolean = true) {
    if (!weapons || weapons.length === 0) {
      return <span>There are no weapons yet</span>
    }
    return weapons.map((w) => <weapon-element weapon={w} character={this.character} isExtendable={isExtendable}></weapon-element>);
  }

  /**
   * Show weapon choose-list with only weapons that are not owned by character
   */
  showWeaponModal() {
    const ownedWeaponsNames: string[] = this.weapons.map(w => w.name);
    const nonownedWeapons = this.weaponManager.getAll().filter(w => ownedWeaponsNames.indexOf(w.name) < 0);
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getWeaponList(nonownedWeapons, false);
    chooseListElement['valueAttribute'] = 'weapon';
    chooseListElement['name'] = 'Choose a weapon';
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenWeapons: IWeapon[]) => {
      this.weapons = this.weapons.concat(chosenWeapons);
      this.character.equipment.weapons = this.weapons;
    }
  }

  getArmorList(armors: IArmor[], isExtendable: boolean = true) {
    if (!armors || armors.length === 0) {
      return <span>There are no armors yet</span>
    }
    return armors.map(a => <armor-element armor={a} character={this.character} isExtendable={isExtendable}></armor-element>);
  }

  /**
   * Show armor choose-list with only armor that are not owned by character
   */
  showArmorModal() {
    const ownedArmorsNames: string[] = this.character.equipment.armors.map(a => a.name);
    const nonownedArmors = this.armorManager.getAll().filter(a => ownedArmorsNames.indexOf(a.name) < 0);
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getArmorList(nonownedArmors, false);
    chooseListElement['valueAttribute'] = 'armor';
    chooseListElement['name'] = 'Choose an armor';
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenArmors: IArmor[]) => {
      this.armors = this.armors.concat(chosenArmors);
      this.character.equipment.armors = this.armors;
    }
  }

  render() {
    this.character.saveLocalCharacter();
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="4">Armor class: {this.character.armorClass}</ion-col>
          <ion-col size="4">Health: <health-manager character={this.character}></health-manager></ion-col>
          <ion-col size="4">Speed: {this.character.speed}ft</ion-col>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row>
              <h3>Weapons<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showWeaponModal()}></ion-icon></h3>
            </ion-row>
            <ion-row>
              <ion-col size="1"></ion-col>
              <ion-col size="8">Name</ion-col>
              <ion-col size="3">Damage</ion-col>
            </ion-row>
            {this.getWeaponList(this.character.equipment.weapons, true)}
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
