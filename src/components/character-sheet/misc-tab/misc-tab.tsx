import { Component, h, Prop } from '@stencil/core';
import { ICharacter } from '../../../models/Character';

@Component({
  tag: 'misc-tab',
  styleUrl: 'misc-tab.scss',
  shadow: true
})
export class MiscTab {

  @Prop() character: ICharacter;

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6">this is</ion-col>
          <ion-col size="6">misc</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">bye</ion-col>
          <ion-col size="6">bye</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
