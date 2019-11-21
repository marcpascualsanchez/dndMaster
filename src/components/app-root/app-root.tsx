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
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
          <ion-route url="/races" component="races-list" />
          <ion-route url="/new-ability-score" component="new-ability-score" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
