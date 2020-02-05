import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, ICharacterSpells } from '../../../models/Character';
import { ISpell } from './spell-element/spell-element';

@Component({
  tag: 'spell-tab',
  styleUrl: 'spell-tab.scss',
  shadow: true
})
export class MagicTab {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() spells: ICharacterSpells;

  public defaultSpell: ISpell;

  constructor() {
    this.spells = this.character.spells;
    this.defaultSpell = {
      name: 'This is a spell',
      description: 'Spells are very useful! They can damage, heal, or buff your character',
      range: 10,
      duration: '1 day',
      castingTime: '1 action',
      components: ['imagination', 'magic'],
    }
  }

  createSpell(level: string) {
    this.character.spells[level] = this.character.spells[level].concat(this.defaultSpell);
  }

  getSpells(level: string) {
    const spells: ISpell[] = this.character.spells[level];
    return spells.map(s => <ion-row><spell-element spell={s} character={this.character} level={level}></spell-element></ion-row>);
  }

  getSpellSlots() {
    return Object.keys(this.character.spells).map((level) => {
      return (
        <ion-grid>
          <ion-row>
            <ion-col size="10"><h3>{level}</h3></ion-col>
            <ion-col size="2"><ion-icon name="add-circle" color="primary" onClick={() => this.createSpell(level)}></ion-icon></ion-col>
          </ion-row>
          {this.getSpells(level)}
        </ion-grid>
      );
    });
  }

  render() {
    this.character.saveLocalCharacter();
    return [
      <ion-card>
        <ion-card-content>
          <span>Mana: {this.character.state.mana}</span>
        </ion-card-content>
      </ion-card>,
      <ion-card>
          {this.getSpellSlots()}
      </ion-card>
    ]
  }
}
