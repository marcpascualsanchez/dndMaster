import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, IState } from '../../../../models/Character';
import { Subscription } from 'rxjs';

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
  @State() characterState: IState;

  private stateSubscription: Subscription;

  constructor() {
    this.characterState = this.character.state;
    this.stateSubscription = this.character.onStateChange.subscribe(s => this.characterState = s);
  }

  componentDidUnload() {
    this.stateSubscription.unsubscribe();
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.heal(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addExtraHealth(1)}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">{this.characterState.health.current}</ion-col>
          <ion-col size="6" class={`${this.characterState.health.extra > 0 ? '' : 'disabled'}`}>{this.characterState.health.extra}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.damage(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addExtraHealth(-1)}></ion-icon></ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
