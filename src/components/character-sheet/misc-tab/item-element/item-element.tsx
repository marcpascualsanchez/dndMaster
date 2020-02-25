import { Component, Prop, State, h } from "@stencil/core";
import { Subscription } from 'rxjs';
import { ICharacter } from "../../../../models/Character";
import { IItem } from "../../../../utils/itemList";

@Component({
  tag: 'item-element',
  styleUrl: 'item-element.scss',
  shadow: true
})
export class ItemElement {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @Prop({
    mutable: true,
    reflect: true,
  }) item: IItem;
  @Prop() isExtendable: boolean;
  @State() isEditing: boolean;
  private equipmentSubscription: Subscription;

  constructor() {
    this.isEditing = false;
    this.equipmentSubscription = this.character.onEquipmentChange.subscribe(e => this.item = { ...e.items.find(a => this.item.name === a.name) });
  }

  componentDidUnload() {
    this.equipmentSubscription.unsubscribe();
  }

  drop() {
    this.isEditing = false;
    this.character.dropItem(this.item);
  }

  sell() {
    this.isEditing = false;
    this.character.sellItem(this.item);
  }

  getExtended() {
    return [
      <ion-row>
        <ion-col size="1"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.setItemAmount(this.item.name, this.item.amount - 1)}></ion-icon></ion-col>
        <ion-col size="1">{this.item.amount}</ion-col>
        <ion-col size="1"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.setItemAmount(this.item.name, this.item.amount + 1)}></ion-icon></ion-col>
        <ion-col size="5">{this.item.name}</ion-col>
        <ion-col size="2"><ion-icon name="create" onClick={() => this.isEditing = false}></ion-icon></ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="6">{this.item.weight} lb</ion-col>
        <ion-col size="6">{this.item.price} €</ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="6">
          <ion-button size="small" onClick={() => this.sell()}>Sell {this.item.price}<ion-icon name="cash"></ion-icon></ion-button>
        </ion-col>
        <ion-col size="2">
          <ion-button size="small" onClick={() => this.drop()}><ion-icon name="trash"></ion-icon></ion-button>
        </ion-col>
      </ion-row>
    ]
  }

  getUnextended() {
    return (
      <ion-row>
        <ion-col size="2">{this.item.amount}</ion-col>
        <ion-col size="8">{this.item.name}</ion-col>
        <ion-col size="2"><ion-icon name="create" onClick={() => this.isEditing = true}></ion-icon></ion-col>
      </ion-row>
    );
  }

  render() {
    if (this.isEditing && this.isExtendable) {
      return this.getExtended();
    } else {
      return this.getUnextended();
    }
  }
}