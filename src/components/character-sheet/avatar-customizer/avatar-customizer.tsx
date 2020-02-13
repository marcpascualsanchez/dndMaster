import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'avatar-customizer',
  styleUrl: 'avatar-customizer.scss',
  shadow: true
})
export class AvatarCustomizer {
  @State() bodyIndex: number;
  @State() weaponIndex: number;

  private imagesDir: string;
  private bodyFiles: string[];
  private bodyElements: any[];
  private weaponElements: any[];
  private weaponFiles: string[];

  constructor() {
    this.bodyIndex = 0;
    this.weaponIndex = 0;
    this.imagesDir = '../../../assets/img/avatar/';
    this.bodyFiles = ['body.png'];
    this.weaponFiles = ['sword.png', 'axe.png', 'dagger.png', 'bottle.png', 'magic.png'];
  }

  setBodies() {
    this.bodyElements = this.bodyFiles.map((b, idx) => <img class={`body ${idx !== this.bodyIndex ? 'hidden' : ''}`} src={this.imagesDir + b} />);
  }

  setWeapons() {
    this.weaponElements = this.weaponFiles.map((w, idx) => <img class={`weapon ${idx !== this.weaponIndex ? 'hidden' : ''}`} src={this.imagesDir + w} />);
  }

  getNewIndex(length: number, oldIndex: number, amount: number = 1) {
    // In order to make it cyclic
    if (oldIndex + amount < 0) {
      return length - 1;
    } else if (oldIndex + amount > length - 1) {
      return 0;
    } else {
      return oldIndex + amount;
    }
  }

  getOptions() {
    return [
      <ion-row>
        <ion-col size="2">
          <ion-icon onClick={() => this.bodyIndex = this.getNewIndex(this.bodyFiles.length, this.bodyIndex, +1)} name="arrow-dropleft-circle"></ion-icon>
        </ion-col>
        <ion-col size="8">
          {this.bodyFiles[this.bodyIndex].replace(/(.png)|(.gif)/, '')}
        </ion-col>
        <ion-col size="2">
          <ion-icon onClick={() => this.bodyIndex = this.getNewIndex(this.bodyFiles.length, this.bodyIndex, -1)} name="arrow-dropright-circle"></ion-icon>
        </ion-col>
      </ion-row>,
      <ion-row>
        <ion-col size="2">
          <ion-icon onClick={() => this.weaponIndex = this.getNewIndex(this.weaponFiles.length, this.weaponIndex, +1)} name="arrow-dropleft-circle"></ion-icon>
        </ion-col>
        <ion-col size="8">
          {this.weaponFiles[this.weaponIndex].replace(/(.png)|(.gif)/, '')}
        </ion-col>
        <ion-col size="2">
          <ion-icon onClick={() => this.weaponIndex = this.getNewIndex(this.weaponFiles.length, this.weaponIndex, -1)} name="arrow-dropright-circle"></ion-icon>
        </ion-col>
      </ion-row>,
    ]
  }

  render() {
    this.setBodies();
    this.setWeapons();
    return [
      <div class="avatar-container">
        {this.bodyElements}
        {this.weaponElements}
      </div>,
      <ion-grid>
        {this.getOptions()}
      </ion-grid>
    ];
  }
}
