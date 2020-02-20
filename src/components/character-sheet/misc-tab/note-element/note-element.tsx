import { Subscription } from 'rxjs';
import { Component, Prop, h, State } from "@stencil/core";
import { ICharacter } from "../../../../models/Character";

export interface INote {
  title: string;
  body: string;
  lastModified: Date;
}

@Component({
  tag: 'note-element',
  styleUrl: 'note-element.scss',
  shadow: false
})
export class NoteElement {

  @Prop({
    mutable: true,
    reflect: true,
  }) character: ICharacter;
  @Prop() note: INote;
  @State() isEditing: boolean;
  private newNote: INote;

  private characterSubscription: Subscription;

  constructor() {
    this.isEditing = false;
    this.characterSubscription = this.character.onChange.subscribe(() => {
      if (this.newNote) {
        this.note = { ...this.character.getNote(this.newNote.title, this.newNote.lastModified) };
      }
    });
  }

  componentDidUnload() {
    this.characterSubscription.unsubscribe();
  }

  saveEdited() {
    this.isEditing = false;
    this.newNote = { ...this.note };
    this.newNote.title = document.querySelector('.new-note-title')['value'];
    this.newNote.body = document.querySelector('.new-note-body')['value'];
    this.newNote.lastModified = new Date();
    this.character.editNote(this.note, this.newNote);
  }

  delete() {
    this.isEditing = false;
    this.newNote = null;
    this.character.removeNote(this.note);
  }

  getEditNote() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="8"><ion-input type="text" value={this.note.title} class="new-note-title"></ion-input></ion-col>
          <ion-col size="2"><ion-icon name="trash" onClick={() => this.delete()}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="save" onClick={() => this.saveEdited()}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12"><ion-textarea value={this.note.body} class="new-note-body"></ion-textarea></ion-col>
        </ion-row>
        <ion-row>
          <ion-col offset="6" size="6">{new Date().toLocaleString()}</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

  getNote() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="10"><h6>{this.note.title}</h6></ion-col>
          <ion-col size="2"><ion-icon name="create" onClick={() => this.isEditing = true}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">{this.note.body}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">{this.note.lastModified ? this.note.lastModified.toLocaleString() : ''}</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

  render() {
    if (this.isEditing) {
      return this.getEditNote();
    } else {
      return this.getNote();
    }
  }
}