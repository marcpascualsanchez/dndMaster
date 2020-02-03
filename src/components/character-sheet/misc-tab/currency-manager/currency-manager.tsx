import { Component, Prop, h, State } from "@stencil/core";
import { getCurrencyFromTotal, getCurrency, coinTypes } from "../../../../utils/currency";
import { ICharacter } from "../../../../models/Character";

export interface ICoinType {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface ICurrency extends ICoinType {
  total: number;
  isAuto: boolean; // to make auto currency 'promotion'
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

  setAuto(isAuto: boolean) {
    this.currency = { ...this.currency, ...{ isAuto } };
    if (isAuto) {
      this.currency = getCurrencyFromTotal(this.currency.total);
    }
  }

  addCoins(type: string = 'copper', amount: number = 1) {
    if (this.currency.isAuto) {
      this.currency = getCurrencyFromTotal(this.currency.total + amount * coinTypes[type]);
    } else {
      const coins = {};
      coins[type] = amount + this.currency[type];
      this.currency = getCurrency(coins, this.currency);
    }
  }

  setCoins(type: string, amount: number) {
    console.log('h');
    const coins = {};
    coins[type] = amount;
    this.currency = getCurrency(coins, this.currency);
  }

  render() {
    this.character.currency = this.currency;
    return (
      <ion-grid>
        <ion-row>
          <ion-col offset="10" size="2">Auto</ion-col>
        </ion-row>
        <ion-row>
          <ion-col offset="10" size="2">
            <ion-toggle onIonChange={(e) => this.setAuto(e.detail.checked)} checked={this.currency.isAuto}></ion-toggle>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.addCoins('platinum')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.addCoins('gold')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.addCoins('electrum')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.addCoins('silver')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.addCoins('copper')}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-input value={this.currency.platinum.toString()} onIonChange={e => this.setCoins('platinum', parseInt(e.detail.value))} type="number"></ion-input><ion-icon name="cash" class="platinum"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.gold.toString()} onIonChange={e => this.setCoins('gold', parseInt(e.detail.value))} type="number"></ion-input><ion-icon name="cash" class="gold"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.electrum.toString()} onIonChange={e => this.setCoins('electrum', parseInt(e.detail.value))} type="number"></ion-input><ion-icon name="cash" class="electrum"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.silver.toString()} onIonChange={e => this.setCoins('silver', parseInt(e.detail.value))} type="number"></ion-input><ion-icon name="cash" class="silver"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.copper.toString()} onIonChange={e => this.setCoins('copper', parseInt(e.detail.value))} type="number"></ion-input><ion-icon name="cash" class="copper"></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addCoins('platinum', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addCoins('gold', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addCoins('electrum', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addCoins('silver', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addCoins('copper', -1)}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
      </ion-grid>
    );
  }
}