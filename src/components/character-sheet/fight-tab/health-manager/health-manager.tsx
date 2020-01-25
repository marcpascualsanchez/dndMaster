import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../../models/Character';

export interface IHealth {
  extra: number;
  current: number;
}

@Component({
  tag: 'health-manager',
  styleUrl: 'health-manager.scss',
  shadow: false
})
export class HealthManager {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() currentHealth: number;
  @State() extraHealth: number;

  constructor() {
    this.currentHealth = this.character.state.health.current;
    this.extraHealth = this.character.state.health.extra;
  }

  getExtraHealth() {
    return <ion-col size="6" class={`${this.extraHealth > 0 ? '' : 'disabled'}`}>{this.extraHealth}</ion-col>
  }

  heal(amount: number) {
    this.currentHealth += amount;
    if (this.currentHealth > this.character.getMaxHealth()) {
      this.currentHealth = this.character.getMaxHealth();
    }
  }

  damage(amount: number) {
    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      // TODO: set KO state
    }
  }

  addExtra(amount: number) {
    this.extraHealth += amount;
    if (this.extraHealth <= 0) {
      this.extraHealth = 0;
    }
  }

  render() {
    this.character.state.health = { current: this.currentHealth, extra: this.extraHealth };
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.heal(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.addExtra(1)}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">{this.currentHealth}</ion-col>
          {this.getExtraHealth()}
        </ion-row>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.damage(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.addExtra(-1)}></ion-icon></ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
