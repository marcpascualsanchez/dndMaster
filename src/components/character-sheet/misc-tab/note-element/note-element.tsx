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

  constructor() {
    this.isEditing = false;
    this.note.lastModified = new Date(this.note.lastModified);
  }

  save() {
    this.note.title = document.querySelector('.new-note-title')['value'];
    this.note.body = document.querySelector('.new-note-body')['value'];
    this.delete();
    this.note.lastModified = new Date();
    this.character.notes.unshift(this.note);
  }

  delete() {
    this.isEditing = false;
    this.character.notes = this.character.notes.filter(n => n.title !== this.note.title && n.lastModified.toString() !== this.note.lastModified.toString());
  }

  getEditNote() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col size="8"><ion-textarea value={this.note.title} class="new-note-title"></ion-textarea></ion-col>
          <ion-col size="2"><ion-icon name="trash" onClick={() => this.delete()}></ion-icon></ion-col>
          <ion-col size="2"><ion-icon name="save" onClick={() => this.save()}></ion-icon></ion-col>
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
          <ion-col size="10"><h3>{this.note.title}</h3></ion-col>
          <ion-col size="2"><ion-icon name="create" onClick={() => this.isEditing = true}></ion-icon></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">{this.note.body}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">{this.note.lastModified.toLocaleString()}</ion-col>
        </ion-row>
      </ion-grid>
    );
  }

  render() {
    this.character.saveLocalCharacter();
    if (this.isEditing) {
      return this.getEditNote();
    } else {
      return this.getNote();
    }
  }
}