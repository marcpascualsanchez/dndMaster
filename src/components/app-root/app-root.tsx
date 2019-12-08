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
          <ion-route url="/profile/:name" component="app-profile" />
          <ion-route url="/races" component="races-list" />
          <ion-route url="/new-ability-score" component="new-ability-score" />
          <ion-route url="/create-new-character" component="create-new-character" />
          <ion-route url="/character-sheet" component="character-sheet" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
