import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'character-personal-data',
  styleUrl: 'character-personal-data.scss',
  shadow: true
})
export class CharacterPersonalData {
  @Event({
    eventName: 'paramSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) selectEmitter: EventEmitter;
  private isFormValid: boolean = false;

  confirmPersonal() {
    // this.selectEmitter.emit({ step: 'abilities', param: e.value });
  }

  getSelectButton() {
    return (
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button class="confirm-icon" onClick={() => this.isFormValid ? this.confirmPersonal() : null}>
              <ion-icon name="checkmark-circle" color="success" class={this.isFormValid ? '' : 'disabled'}></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    );
  }

  render() {
    return ([
      <ion-list lines="full" class="ion-no-margin ion-no-padding">
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Age</ion-label>
          <ion-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input></ion-input>
        </ion-item>
      </ion-list>,
      this.getSelectButton(),
    ]);
  }
}
