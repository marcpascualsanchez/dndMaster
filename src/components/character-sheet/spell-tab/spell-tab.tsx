import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter, ISpellList } from '../../../models/Character';
import { ISpell } from './spell-element/spell-element';

@Component({
  tag: 'spell-tab',
  styleUrl: 'spell-tab.scss',
  shadow: false
})
export class MagicTab {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() spellsList: ISpellList;
  @State() spellSlots: number[];

  public defaultSpell: ISpell;

  constructor() {
    this.spellsList = this.character.spells.list;
    this.defaultSpell = {
      name: 'This is a spell',
      description: 'Spells are very useful! They can damage, heal, or buff your character',
      range: 10,
      duration: '1 day',
      castingTime: '1 action',
      components: ['imagination'],
    }
  }

  createSpell(level: number | string) {
    this.character.spells.list[level] = this.character.spells.list[level].concat(this.defaultSpell);
  }

  getSpells(level: number | string) {
    const spells: ISpell[] = this.character.spells.list[level];
    return spells.map(s => <ion-row><spell-element spell={s} character={this.character} level={level.toString()}></spell-element></ion-row>);
  }

  getSpellSlots() {
    const spellSlots = [];
    this.character.spells.slots.forEach((slot, level) => {
      if (slot) {
        spellSlots.push(
          <ion-grid>
            <ion-row>
              <ion-col size="6"><h3>Level {level + 1}</h3></ion-col>
              <ion-col size="2"><ion-icon name="add-circle" color="primary" onClick={() => this.createSpell(level + 1)}></ion-icon></ion-col>
              <ion-col size="4"><h3>{this.character.state.spellSlots[level]}/{slot}</h3></ion-col>
            </ion-row>
            {this.getSpells(level + 1)}
          </ion-grid>
        );
      }
    });
    spellSlots.unshift(
      <ion-grid>
        <ion-row>
          <ion-col size="6"><h3>Cantrips</h3></ion-col>
          <ion-col size="2"><ion-icon name="add-circle" color="primary" onClick={() => this.createSpell('cantrips')}></ion-icon></ion-col>
          <ion-col size="4"><ion-icon name="infinite"></ion-icon></ion-col>
        </ion-row>
        {this.getSpells('cantrips')}
      </ion-grid>
    );
    return spellSlots;
  }

  render() {
    this.character.saveLocalCharacter();
    return (
      <ion-card>
        {this.getSpellSlots()}
      </ion-card>
    )
  }
}
