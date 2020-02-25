import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="characters-list" />
          <ion-route url="/races" component="races-list" />
          <ion-route url="/classes" component="classes-list" />
          <ion-route url="/create-new-character" component="create-new-character" />
          <ion-route url="/character-sheet/:characterId" component="character-sheet" />
          <ion-route url="/create-new-item" component="custom-item-creator" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
