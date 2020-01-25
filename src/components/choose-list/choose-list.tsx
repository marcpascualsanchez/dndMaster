import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'choose-list',
  styleUrl: 'choose-list.scss',
  shadow: true
})
export class ChooseList {

  @Prop() public elementList: any[];
  @Prop() public maxChosen: number;
  @Prop() public minChosen: number;
  @Prop() public name: string;
  @Prop() public visible: boolean;
  @Prop() public valueAttribute: string;
  @Prop() public cb: Function = () => { };
  @State() private isValid: boolean;

  public chosenElements: any[] = [];
  private defaultValueAttribute: string = 'custom-value';

  constructor() {
    this.visible = false;
    this.valueAttribute = this.defaultValueAttribute;
    this.maxChosen = 1;
    this.minChosen = 1;
  }

  chooseElement(event, element) {
    const chosenIndex = this.chosenElements.indexOf(element);
    if (chosenIndex === -1) {
      this.chosenElements.push(element);
      event.target.classList.add('selected');
      event.target.classList.remove('unselected');
    } else {
      event.target.classList.add('unselected');
      event.target.classList.remove('selected');
      this.chosenElements.splice(chosenIndex, 1);
    }
    this.checkChosenElements();
  }

  checkChosenElements() {
    if (this.chosenElements.length <= this.maxChosen && this.chosenElements.length >= this.minChosen) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  closeModal() {
    this.visible = false;
    setTimeout(() => this.reset(), 250); // it takes 0.25 to finish the animation
  }

  confirm() {
    this.cb(this.chosenElements);
    this.closeModal();
  }

  reset() {
    this.chosenElements = [];
    this.elementList = [];
    this.name = null;
    this.maxChosen = 1;
    this.minChosen = 1;
    this.isValid = false;
    this.valueAttribute = this.defaultValueAttribute;
    this.cb = () => { };
  }

  cancel() {
    this.closeModal();
  }

  render() {
    return (
      <div class={this.visible ? "wrapper visible" : "wrapper"} onClick={() => this.cancel()}>
        <div class="modal" onClick={(e) => e.stopPropagation()}>
          <h3 class="title">{this.name ? this.name : 'Choose any'}</h3>
          <div>
            <ion-grid>
              {this.elementList.map((e) => {
                const elementValue = e.$attrs$[this.valueAttribute];
                return (
                  <ion-row>
                    <ion-col size="10">{e}</ion-col>
                    <ion-col size="2">
                      <ion-icon name="checkmark-circle" class="unselected" onClick={(e) => this.chooseElement(e, elementValue)}></ion-icon>
                    </ion-col>
                  </ion-row>)
              })}
            </ion-grid>
          </div>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button class="cancel-icon" onClick={() => this.cancel()}>
                <ion-icon name="close-circle" color="danger"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button class="confirm-icon" onClick={() => this.isValid ? this.confirm() : null}>
                <ion-icon name="checkmark-circle" color="success" class={this.isValid ? '' : 'disabled'}></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </div>
      </div>
    );
  }

}
