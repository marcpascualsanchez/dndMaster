import { Subscription } from 'rxjs';
import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../models/Character';
import { INote } from './note-element/note-element';
import { IItem } from '../../../utils/itemList';
import { ItemManager } from '../../../utils/ItemManager';

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
  private itemManager: ItemManager;
  private characterSubscription: Subscription;

  constructor() {
    this.items = this.character.equipment.items;
    this.itemManager = new ItemManager();
    this.notes = this.character.notes;
    this.characterSubscription = this.character.onChange.subscribe((c) => {
      this.items = [...c.equipment.items];
      this.notes = [...c.notes];
    });
  }

  componentDidUnload() {
    this.characterSubscription.unsubscribe();
  }

  getDefaultNote(): INote {
    return {
      title: 'Edit me!',
      body: 'Write anything you want, and keep track of everything.',
      lastModified: new Date(),
    };
  }

  getItemsList(items: IItem[], isExtendable: boolean = true) {
    if (!items || items.length === 0) {
      return [<span>There are no items yet</span>]
    }
    return items.map(i => <item-element character={this.character} item={i} isExtendable={isExtendable}></item-element>);
  }

  /**
   * Show armor choose-list with only armor that are not owned by character
   */
  showItemModal() {
    const ownedItemsNames: string[] = this.character.equipment.items.map(a => a.name);
    const nonownedItems = this.itemManager.getAll().filter(a => ownedItemsNames.indexOf(a.name) < 0).map(a => ({ ...a, amount: 1 }));
    const chooseListElement = document.querySelector('#choose-list');
    chooseListElement['elementList'] = this.getItemsList(nonownedItems, false);
    chooseListElement['valueAttribute'] = 'item';
    chooseListElement['name'] = <div>Choose an item<a href="/create-new-item"><ion-icon slot="end" name="add-circle" color="primary"></ion-icon></a></div>;
    chooseListElement['visible'] = true;
    chooseListElement['cb'] = (chosenItems: IItem[]) => this.character.addItems(chosenItems);
  }

  getNotesList(notes: INote[]) {
    return notes.map(n =>
      <ion-row>
        <ion-col size="12">
          <note-element character={this.character} note={n}></note-element>
        </ion-col>
      </ion-row>);
  }

  render() {
    return (
      <ion-card>
        <currency-manager character={this.character}></currency-manager>,
      <ion-grid>
          <ion-row>
          </ion-row>
          <ion-row>
            <ion-grid>
              <ion-row>
                <h3>Items<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.showItemModal()}></ion-icon></h3>
              </ion-row>
              {this.getItemsList(this.character.equipment.items)}
            </ion-grid>
          </ion-row>
          <ion-row>
            <ion-col><h3>Notes<ion-icon slot="end" name="add-circle" color="primary" onClick={() => this.character.addNote(this.getDefaultNote())}></ion-icon></h3></ion-col>
          </ion-row>
          {this.getNotesList(this.notes)}
        </ion-grid>
      </ion-card>
    );
  }
}
