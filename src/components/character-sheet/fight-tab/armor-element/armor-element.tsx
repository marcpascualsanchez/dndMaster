import { Component, Prop, State, h } from "@stencil/core";
import { ICharacter } from "../../../../models/Character";
import { IArmor } from "../../../../utils/armorList";

@Component({
  tag: 'armor-element',
  styleUrl: 'armor-element.scss',
  shadow: true
})
export class ArmorElement {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @Prop({
    mutable: false,
    reflect: false,
  }) armor: IArmor;
  @Prop() isExtendable: boolean;
  @State() isSelected: boolean;
  @State() lastModified: Date;

  constructor() {
    this.isSelected = false;
    this.character.onChange.subscribe(() => this.lastModified = new Date());
  }

  select() {
    this.isSelected = !this.isSelected;
  }

  drop() {
    this.isSelected = false;
    this.character.dropArmor(this.armor);
  }

  sell() {
    this.isSelected = false;
    this.character.sellArmor(this.armor);
  }

  getExtended() {
    return [
      <ion-row>
        <ion-col size="1"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.setArmorAmount(this.armor.name, this.armor.amount - 1)}></ion-icon></ion-col>
        <ion-col size="1">{this.armor.amount}</ion-col>
        <ion-col size="1"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.setArmorAmount(this.armor.name, this.armor.amount + 1)}></ion-icon></ion-col>
        <ion-col size="7" onClick={() => this.select()}>{this.armor.name}</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="4">{this.armor.armorClass} AC</ion-col>
        <ion-col size="4">{this.armor.weight} lb</ion-col>
        <ion-col size="4">{this.armor.price} €</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="4">
          <ion-button size="small" onClick={() => this.character.equipArmor(this.armor)}>Equip</ion-button>
        </ion-col>
        <ion-col size="6">
          <ion-button size="small" onClick={() => this.sell()}>Sell {this.armor.price}<ion-icon name="cash"></ion-icon></ion-button>
        </ion-col>
        <ion-col size="2">
          <ion-button size="small" onClick={() => this.drop()}><ion-icon name="trash"></ion-icon></ion-button>
        </ion-col>
      </ion-row>
    ]
  }

  getUnextended() {
    return (
      <ion-row onClick={() => this.select()}>
        <ion-col size="1">{this.armor.amount}</ion-col>
        <ion-col size="8">{this.armor.name}</ion-col>
        <ion-col size="3">{this.armor.armorClass}</ion-col>
      </ion-row>
    );
  }

  render() {
    if (this.isSelected && this.isExtendable) {
      return this.getExtended();
    } else {
      return this.getUnextended();
    }
  }
}