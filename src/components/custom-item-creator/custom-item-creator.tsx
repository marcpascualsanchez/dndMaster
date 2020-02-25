import { Component, h, State } from '@stencil/core';
import { ItemManager } from '../../utils/ItemManager';
import { IItem } from '../../utils/itemList';

const defaultItem: IItem = {
  name: 'Awesome object',
  amount: 1,
  weight: 5,
  price: 7,
}

@Component({
  tag: 'custom-item-creator',
  styleUrl: 'custom-item-creator.scss',
  shadow: false
})
export class CustomItemCreator {
  @State() isFormValid: boolean = false;

  private inputs: any[];
  private itemManager: ItemManager;

  constructor() {
    this.itemManager = new ItemManager();
  }

  componentDidLoad() {
    this.inputs = Array.from(document.querySelectorAll('.new-item-input'));
  }

  confirmPersonal() {
    const newItem: IItem = { ...defaultItem };
    this.inputs.forEach(i => newItem[i.name] = i.value);
    this.itemManager.addCustomItem(newItem);
    window.location.href = '/';
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
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"/>
          </ion-buttons>
          <ion-title text-capitalize>Create custom item</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-list lines="full" class="ion-no-margin ion-no-padding">
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input onIonChange={() => this.validateInputs()} class="new-item-input" name="name" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Weight</ion-label>
          <ion-input onIonChange={() => this.validateInputs()} class="new-item-input" name="weight" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Price</ion-label>
          <ion-input onIonChange={() => this.validateInputs()} class="new-item-input" name="price" type="number"></ion-input>
        </ion-item>
      </ion-list>,
      this.getSelectButton(),
    ]);
  }
}
