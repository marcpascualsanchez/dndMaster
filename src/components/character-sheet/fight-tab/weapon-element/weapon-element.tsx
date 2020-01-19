import { Component, Prop, State, h } from "@stencil/core";
import { IWeapon } from "../../../../utils/weaponList";
import { ICharacter } from "../../../../models/Character";

@Component({
  tag: 'weapon-element',
  styleUrl: 'weapon-element.scss',
  shadow: true
})
export class WeaponElement {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @Prop({
    mutable: true,
    reflect: true,
  }) weapon: IWeapon;
  @Prop() isExtendable: boolean;
  @State() amount: number;
  @State() isSelected: boolean;

  constructor() {
    this.amount = this.weapon.amount ? this.weapon.amount : 1;
    this.isSelected = false;
  }

  drop() {
    this.isSelected = false;
    this.character.equipment.weapons = this.character.equipment.weapons.filter(w => w.name !== this.weapon.name);
  }

  sell() {
    this.isSelected = false;
    this.character.money += this.weapon.price;
    this.drop();
  }

  getExtended() {
    return [
      <ion-row>
        <ion-col size="1"><ion-icon name="arrow-dropdown-circle" onClick={() => this.amount -= 1}></ion-icon></ion-col>
        <ion-col size="1">{this.amount}</ion-col>
        <ion-col size="1"><ion-icon name="arrow-dropup-circle" onClick={() => this.amount += 1}></ion-icon></ion-col>
        <ion-col size="7" onClick={() => this.select()}>{this.weapon.name}</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="4">bonus</ion-col>
        <ion-col size="4">{this.weapon.damage}</ion-col>
        <ion-col size="4">{this.weapon.type ? this.weapon.type : '-'}</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="4">{this.weapon.range} ft</ion-col>
        <ion-col size="4">{this.weapon.weight} lb</ion-col>
        <ion-col size="4">{this.weapon.price} €</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="12">{this.weapon.properties.toString()}</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="4">
          <ion-button size="small">Equip</ion-button>
        </ion-col>
        <ion-col size="6">
          <ion-button size="small" onClick={() => this.sell()}>Sell {this.weapon.price}<ion-icon name="cash"></ion-icon></ion-button>
        </ion-col>
        <ion-col size="2">
          <ion-button size="small" onClick={() => this.drop()}><ion-icon name="trash"></ion-icon></ion-button>
        </ion-col>
      </ion-row>
    ]
  }

  select() {
    this.isSelected = !this.isSelected;
  }

  getUnextended() {
    return (
      <ion-row onClick={() => this.select()}>
        <ion-col size="1">{this.weapon.amount}</ion-col>
        <ion-col size="8">{this.weapon.name}</ion-col>
        <ion-col size="3">{this.weapon.damage}</ion-col>
      </ion-row>
    );
  }

  render() {
    this.weapon.amount = this.amount;
    if (this.isSelected && this.isExtendable) {
      return this.getExtended();
    } else {
      return this.getUnextended();
    }
  }
}