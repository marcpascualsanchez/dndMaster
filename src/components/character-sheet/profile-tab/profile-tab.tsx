import { Component, h } from '@stencil/core';

@Component({
  tag: 'profile-tab',
  styleUrl: 'profile-tab.scss',
  shadow: true
})
export class ProfileTab {

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="6">This is</ion-col>
          <ion-col size="6">profile</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">bye</ion-col>
          <ion-col size="6">bye</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

}
