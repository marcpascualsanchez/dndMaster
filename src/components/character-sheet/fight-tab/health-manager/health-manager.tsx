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
  @State() lastModified: Date;

  constructor() {
    this.character.onChange.subscribe(() => this.lastModified = new Date());
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.heal(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropup-circle" onClick={() => this.character.addExtraHealth(1)}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">{this.character.state.health.current}</ion-col>
          <ion-col size="6" class={`${this.character.state.health.extra > 0 ? '' : 'disabled'}`}>{this.character.state.health.extra}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.damage(1)}></ion-icon></ion-col>
          <ion-col size="6"><ion-icon name="arrow-dropdown-circle" onClick={() => this.character.addExtraHealth(-1)}></ion-icon></ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
