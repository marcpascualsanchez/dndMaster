import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../models/Character';
import { IItem } from '../../../models/classes/Class';

@Component({
  tag: 'misc-tab',
  styleUrl: 'misc-tab.scss',
  shadow: true
})
export class MiscTab {
  @Prop() character: ICharacter;
  @State() items: IItem[];

  constructor() {
    this.items = this.character.equipment.items;
  }

  getItemsList(items: IItem[]) {
    return items.map((a) =>
      <ion-row custom-value={a}>
        <ion-col size="1">{a.amount}</ion-col>
        <ion-col size="11">{a.name}</ion-col>
      </ion-row>
    );
  }

  render() {
    this.character.saveLocalCharacter();
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="2">Copper</ion-col>
          <ion-col size="2">Silver</ion-col>
          <ion-col size="2">Gold</ion-col>
          <ion-col size="2">Electrum</ion-col>
          <ion-col size="2">Platinum</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="2">{this.character.money}<ion-icon name="cash"></ion-icon></ion-col>
          <ion-col size="2">{this.character.money}<ion-icon name="cash"></ion-icon></ion-col>
          <ion-col size="2">{this.character.money}<ion-icon name="cash"></ion-icon></ion-col>
          <ion-col size="2">{this.character.money}<ion-icon name="cash"></ion-icon></ion-col>
          <ion-col size="2">{this.character.money}<ion-icon name="cash"></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row>
              {/* <h3>Items<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showItemsModal()}></ion-icon></h3> */}
              <h3>Items</h3>
            </ion-row>
            {this.getItemsList(this.character.equipment.items)}
          </ion-grid>
        </ion-row>
      </ion-grid>
    );
  }
}
