import { Component, Prop, h, State } from "@stencil/core";
import { getCurrencyFromTotal } from "../../../../utils/currency";
import { ICharacter } from "../../../../models/Character";

export interface ICurrency {
  total: number; // in copper
  copper: number; // basic unit
  silver: number; // equals to 10 copper
  electrum: number; // equals to 5 silver
  gold: number; // equals to 2 electrums
  platinum: number; // equals to 10 gold
}

@Component({
  tag: 'currency-manager',
  styleUrl: 'currency-manager.scss',
  shadow: true
})
export class CurrencyManager {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() currency: ICurrency;

  constructor() {
    this.currency = this.character.currency;
  }

  add(quantity: number) {
    this.currency = getCurrencyFromTotal(this.currency.total + quantity);
  }

  render() {
    this.character.currency = this.currency;
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.add(1000)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.add(100)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.add(50)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.add(10)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.add(1)}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><span>{this.currency.platinum}</span><ion-icon name="cash" class="platinum"></ion-icon></ion-col>
          <ion-col size="2"><span>{this.currency.gold}</span><ion-icon name="cash" class="gold"></ion-icon></ion-col>
          <ion-col size="2"><span>{this.currency.electrum}</span><ion-icon name="cash" class="electrum"></ion-icon></ion-col>
          <ion-col size="2"><span>{this.currency.silver}</span><ion-icon name="cash" class="silver"></ion-icon></ion-col>
          <ion-col size="2"><span>{this.currency.copper}</span><ion-icon name="cash" class="copper"></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.add(-1000)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.add(-100)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.add(-50)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.add(-10)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.add(-1)}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
      </ion-grid>
    );
  }
}