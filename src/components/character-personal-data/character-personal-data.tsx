import { Component, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'character-personal-data',
  styleUrl: 'character-personal-data.scss',
  shadow: false
})
export class CharacterPersonalData {
  @Event({
    eventName: 'paramSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) selectEmitter: EventEmitter;
  @State() isFormValid: boolean = false;
  private genders: string[];
  private alignments: string[];
  private inputs: any[];
  private isCustomImage: boolean = false;

  constructor() {
    this.genders = ['Female', 'Male', 'Non-binary', 'Genderfluid', 'Agender'];
    this.alignments = ['Lawful good', 'Neutral good', 'Chaotic good', 'Lawful neutral', 'Neutral', 'Chaotic neutral', 'Lawful evil', 'Neutral evil', 'Chaotic evil'];
  }

  componentDidLoad() {
    this.inputs = Array.from(document.querySelectorAll('.personal-data-input'));
  }

  confirmPersonal() {
    const personalData: any = {};
    this.inputs.forEach(i => personalData[i.name] = i.value);
    personalData.image = this.isCustomImage ? 'custom.jpg' : 'PaladinElf.jpg'; // TODO: set custom image
    this.selectEmitter.emit({ step: 'personal', param: personalData });
  }

  validateInputs() {
    if (this.inputs.some(i => !i.value)) {
      this.isFormValid = false;
    } else {
      this.isFormValid = true;
    }
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
          <ion-input onIonChange={() => this.validateInputs()} class="personal-data-input" name="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Age</ion-label>
          <ion-input onIonChange={() => this.validateInputs()} class="personal-data-input" name="age"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Gender</ion-label>
          <ion-select onIonChange={() => this.validateInputs()} class="personal-data-input" name="gender">
            {this.genders.map(g => <ion-select-option value={g}>{g}</ion-select-option>)}
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Alignment</ion-label>
          <ion-select onIonChange={() => this.validateInputs()} class="personal-data-input" name="alignment">
            {this.alignments.map(a => <ion-select-option value={a}>{a}</ion-select-option>)}
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea onIonChange={() => this.validateInputs()} class="personal-data-input" name="description"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input onIonChange={() => this.validateInputs()} class="personal-data-input" name="title"></ion-input>
        </ion-item>
      </ion-list>,
      this.getSelectButton(),
    ]);
  }
}
