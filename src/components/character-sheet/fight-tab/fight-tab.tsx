import { Component, h } from '@stencil/core';

@Component({
  tag: 'fight-tab',
  styleUrl: 'fight-tab.scss',
  shadow: true
})
export class FightTab {

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6">this is</ion-col>
          <ion-col size="6">fight tab</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">bye</ion-col>
          <ion-col size="6">bye</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
