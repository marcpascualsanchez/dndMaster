import { Component, h, Prop } from '@stencil/core';
import { ICharacter } from '../../models/Character';

@Component({
  tag: 'magic-tab',
  styleUrl: 'magic-tab.scss',
  shadow: true
})
export class MagicTab {

  @Prop() character: ICharacter;

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6">this is</ion-col>
          <ion-col size="6">magic tab</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">bye</ion-col>
          <ion-col size="6">bye</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
