import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../models/Character';
import { IItem } from '../../../models/classes/Class';
import { INote } from './note-element/note-element';

@Component({
  tag: 'misc-tab',
  styleUrl: 'misc-tab.scss',
  shadow: false
})
export class MiscTab {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @State() items: IItem[];
  @State() notes: INote[];

  public defaultNote: INote;

  constructor() {
    this.items = this.character.equipment.items;
    this.notes = this.character.notes;
    this.defaultNote = {
      title: 'Edit me!',
      body: 'Write anything you want, and keep track of everything.',
      lastModified: new Date(),
    };
  }

  getItemsList(items: IItem[]) {
    if (!items || items.length === 0) {
      return <span>There are no items yet</span>
    }
    return items.map((a) =>
      <ion-row custom-value={a}>
        <ion-col size="1">{a.amount}</ion-col>
        <ion-col size="11">{a.name}</ion-col>
      </ion-row>
    );
  }

  getNotesList(notes: INote[]) {
    return notes.map(n =>
      <ion-row>
        <ion-col size="12">
          <note-element character={this.character} note={n}></note-element>
        </ion-col>
      </ion-row>);
  }

  createNote() {
    this.notes = this.notes.concat(this.defaultNote);
    this.character.notes = this.notes;
  }

  render() {
    this.character.saveLocalCharacter();
    return (
      <ion-card>
        <currency-manager character={this.character}></currency-manager>,
      <ion-grid>
          <ion-row>
          </ion-row>
          <ion-row>
            <ion-grid>
              <ion-row>
                {/* <h3>Items<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showItemsModal()}></ion-icon></h3> */}
                <h3>Items</h3>
              </ion-row>
              {this.getItemsList(this.character.equipment.items)}
            </ion-grid>
          </ion-row>
          <ion-row>
            <ion-col><h3>Notes<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.createNote()}></ion-icon></h3></ion-col>
          </ion-row>
          {this.getNotesList(this.notes)}
        </ion-grid>
      </ion-card>
    );
  }
}
