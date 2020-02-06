import { Component, h, Prop, State } from '@stencil/core';
import { ICharacter } from '../../../../models/Character';

export interface ISpell {
    name: string;
    description: string;
    range: number;
    duration: string;
    castingTime: string;
    components: string[];
}

@Component({
    tag: 'spell-element',
    styleUrl: 'spell-element.scss',
    shadow: false
})
export class SpellElement {

    @Prop({
        mutable: true,
        reflect: true,
      }) character: ICharacter;
    @Prop() spell: ISpell;
    @Prop() level: string;
    @State() isEditing: boolean;

    constructor() {
        this.isEditing = false;
    }

    save() {
        this.spell.name = document.querySelector('.new-spell-name')['value']; // TODO: only init value is working since it cannot be changed
        this.spell.description = document.querySelector('.new-spell-description')['value'];
        this.delete();
        this.character.spells.list[this.level].unshift(this.spell);
    }

    delete() {
        this.isEditing = false;
        this.character.spells.list[this.level] = this.character.spells.list[this.level].filter(s => s.name !== this.spell.name);
    }

    getEditSpell() {
        return (
            <ion-grid>
                <ion-row>
                    <ion-col size="8"><ion-input type="text" value={this.spell.name} class="new-spell-name"></ion-input></ion-col>
                    <ion-col size="2"><ion-icon name="trash" onClick={() => this.delete()}></ion-icon></ion-col>
                    <ion-col size="2"><ion-icon name="save" onClick={() => this.save()}></ion-icon></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">Casting time: <ion-input type="text" value={this.spell.castingTime}></ion-input></ion-col>
                    <ion-col size="6">Duration: <ion-input type="text" value={this.spell.duration}></ion-input></ion-col>
                    <ion-col size="6">Range: <ion-input type="number" value={this.spell.range.toString()}></ion-input></ion-col>
                </ion-row>
                <ion-row>
                    {/* TODO: choose only existing items <ion-col size="12">Components: <ion-input type="text" value={this.spell.components.toString()}></ion-input></ion-col> */}
                    <ion-col size="12">Components: {this.spell.components.toString()}</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12"><ion-textarea value={this.spell.description} class="new-spell-description"></ion-textarea></ion-col>
                </ion-row>
            </ion-grid>
        );
    }

    getSpell() {
        return (
            <ion-grid>
                <ion-row>
                    <ion-col size="8">{this.spell.name}</ion-col>
                    <ion-col size="2"><ion-icon name="create" onClick={() => this.isEditing = true}></ion-icon></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">Casting time: {this.spell.castingTime}</ion-col>
                    <ion-col size="6">Duration: {this.spell.duration}</ion-col>
                    <ion-col size="6">Range: {this.spell.range}</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">Components: {this.spell.components}</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">{this.spell.description}</ion-col>
                </ion-row>
            </ion-grid>
        )
    }

    render() {
        this.character.saveLocalCharacter();
        if (this.isEditing) {
            return this.getEditSpell();
        } else {
            return this.getSpell();
        }
    }
}
