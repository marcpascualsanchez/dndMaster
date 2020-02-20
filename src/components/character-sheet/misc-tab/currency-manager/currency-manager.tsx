import { Subscription } from 'rxjs';
import { Component, Prop, h, State } from "@stencil/core";
import { ICurrency } from "../../../../utils/currency";
import { ICharacter } from "../../../../models/Character";

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

  private characterSubscription: Subscription;

  constructor() {
    this.currency = this.character.currency;
    this.characterSubscription = this.character.onChange.subscribe(c => this.currency = c.currency);
  }

  componentDidUnload() {
    this.characterSubscription.unsubscribe();
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col offset="10" size="2">Auto</ion-col>
        </ion-row>
        <ion-row>
          <ion-col offset="10" size="2">
            <ion-toggle onIonChange={(e) => this.character.setAuto(e.detail.checked)} checked={this.currency.isAuto}></ion-toggle>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addCoins('platinum')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addCoins('gold')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addCoins('electrum')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addCoins('silver')}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addCoins('copper')}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-input value={this.currency.platinum.toString()} onIonChange={e => this.character.setCoins('platinum', parseInt(e.detail.value) || 0)} type="number"></ion-input><ion-icon name="cash" class="platinum"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.gold.toString()} onIonChange={e => this.character.setCoins('gold', parseInt(e.detail.value) || 0)} type="number"></ion-input><ion-icon name="cash" class="gold"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.electrum.toString()} onIonChange={e => this.character.setCoins('electrum', parseInt(e.detail.value) || 0)} type="number"></ion-input><ion-icon name="cash" class="electrum"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.silver.toString()} onIonChange={e => this.character.setCoins('silver', parseInt(e.detail.value) || 0)} type="number"></ion-input><ion-icon name="cash" class="silver"></ion-icon></ion-col>
          <ion-col size="2"><ion-input value={this.currency.copper.toString()} onIonChange={e => this.character.setCoins('copper', parseInt(e.detail.value) || 0)} type="number"></ion-input><ion-icon name="cash" class="copper"></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addCoins('platinum', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addCoins('gold', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addCoins('electrum', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addCoins('silver', -1)}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addCoins('copper', -1)}></ion-icon></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
      </ion-grid>
    );
  }
}