import { Subscription } from 'rxjs';
import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, IState } from '../../../../models/Character';
import { experienceLevels } from '../../../../utils/level';

@Component({
  tag: 'level-manager',
  styleUrl: 'level-manager.scss',
  shadow: true
})
export class LevelManager {
  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() state: IState;

  private characterSubscription: Subscription;

  constructor() {
    this.state = { ...this.character.state };
    this.characterSubscription = this.character.onChange.subscribe(c => this.state = { ...c.state });
  }

  componentDidUnload() {
    this.characterSubscription.unsubscribe();
  }

  getNextLevelExperience() {
    if (this.state.level < experienceLevels.length) {
      return <ion-col size="3">/{experienceLevels[this.state.level]}xp</ion-col>
    }
  }

  getCheckedLevelCap(level: number) {
    if (level < 0) {
      return 0;
    }
    if (level > experienceLevels.length) {
      return experienceLevels.length;
    }
    return level;
  }

  onChangeLevel(level: number) {
    const cappedLevel = this.getCheckedLevelCap(level);
    if (this.state.experience < experienceLevels[cappedLevel])
    this.character.setExperience(experienceLevels[cappedLevel])
  }

  render() {
    return (
      <ion-row>
        <ion-col size="1">Lvl</ion-col>
        <ion-col size="3"><ion-input value={this.state.level.toString()} onIonChange={e => this.onChangeLevel(parseInt(e.detail.value))} type="number"></ion-input>
        </ion-col>
        <ion-col size="3"><ion-input value={this.state.experience.toString()} onIonChange={e => this.character.setExperience(parseInt(e.detail.value) || 0)} type="number"></ion-input></ion-col>
        {this.getNextLevelExperience()}
      </ion-row>
    );
  }

}
