import { Component, Prop, h, State, Watch } from '@stencil/core';
import { skills, EAbility, Character } from '../../models/Character';

@Component({
  tag: 'character-sheet',
  styleUrl: 'character-sheet.scss',
})
export class CharacterSheet {

  @Prop() characterId: string;
  @Prop({mutable: true}) character: Character;
  @State() selectedAbility: EAbility;
  @State() currentTabName: string;

  constructor() {
    this.character = new Character();
    this.character.setCharacterById(this.characterId);
  }

  getSkillProficiencyIcon(skill: string) {
    const isProficiency = this.character.proficiency.skillMods.indexOf(skill) > -1;
    return <ion-icon name={isProficiency ? 'radio-button-on' : 'radio-button-off'}></ion-icon>;
  }

  getSavingThrowProficiencyIcon(ability: string) {
    const isProficiency = this.character.proficiency.savingThrows.indexOf(ability) > -1;
    return <ion-icon name={isProficiency ? 'battery-charging' : 'battery-dead'}></ion-icon>;
  }

  getSkillsList(ability: string) {
    return skills[ability].map((s) => <ion-col size="6">{this.getSkillProficiencyIcon(s)}{s}</ion-col>);
  }

  getSelectedAbilityInfo() {
    if (!this.selectedAbility) {
      return null;
    } else {
      return (
        <ion-card-content>
          <ion-grid>
            <ion-row text-center>
              <ion-col size="12" text-center>
                <span>{this.getSavingThrowProficiencyIcon(this.selectedAbility)}Saving Throw</span>
              </ion-col>
            </ion-row>
            <ion-row>
              {this.getSkillsList(this.selectedAbility)}
            </ion-row>
          </ion-grid>
        </ion-card-content>
      );
    }
  }

  setSelectedAbility(ability: EAbility) {
    if (this.selectedAbility === ability) {
      this.selectedAbility = null;
    } else {
      this.selectedAbility = ability;
    }
  }

  getAbilities() {
    return (
      <ion-row>
        <ion-card>
          <ion-card-content class="ion-no-padding">
            <ion-grid no-padding>
              <ion-row no-padding>
                {Object.keys(EAbility).map((ability) => {
                  return (
                    <ion-col size="4">
                      <div class="ability-container" onClick={() => this.setSelectedAbility(EAbility[ability])}>
                        <span class="ability-label">{ability.substr(0, 3).toUpperCase()}</span>
                        <span class="ability-mod">{this.character.calculateAbilityModifier(this.character.abilities[ability])}</span>
                        <div class="right-down-triangle"></div>
                      </div>
                    </ion-col>
                  );
                })}
              </ion-row>
            </ion-grid>
            {this.getSelectedAbilityInfo()}
          </ion-card-content>
        </ion-card>
      </ion-row>
    );
  }

  getProfile() {
    // TODO: set custom image
    return (
      <ion-row padding-top>
        <ion-col no-padding size="3">
          <div class="static-info left-up">
            <span>{this.character.state.level}</span>
            <div class="right-down-triangle"></div>
          </div>
          <div class="static-info left-down ion-text-capitalize">
            <span>{this.character.class.name}</span>
            <div class="right-up-triangle"></div>
          </div>
        </ion-col>
        <ion-col class="image-col" no-padding size="6">
          <ion-img class="profile-image" src={`../../assets/img/profile/${this.character.personal.image}`} no-padding />
          <div class="triangles">
            <div class="rhomb-left-up-triangle"></div>
            <div class="rhomb-right-up-triangle"></div>
          </div>
          <div class="triangles">
            <div class="rhomb-left-down-triangle"></div>
            <div class="rhomb-right-down-triangle"></div>
          </div>
        </ion-col>
        <ion-col no-padding size="3">
          <div class="static-info right-up ion-text-capitalize">
            <span>{this.character.personal.name}</span>
            <div class="left-down-triangle"></div>
          </div>
          <div class="static-info right-down ion-text-capitalize">
            <span>{this.character.race.name}</span>
            <div class="left-up-triangle"></div>
          </div>
        </ion-col>
      </ion-row>
    );
  }

  getStaticUI() {
    return (
      <ion-grid no-padding>
        {this.getProfile()}
        {this.getAbilities()}
      </ion-grid>
    );
  }

  getCurrentTabUI(tabName: string) {
    let tabComponent;
    switch (tabName) {
      case ('profile'):
        tabComponent = <profile-tab character={this.character}></profile-tab>;
        break;
      case ('fight'):
        tabComponent = <fight-tab character={this.character}></fight-tab>;
        break;
      case ('magic'):
        tabComponent = <magic-tab character={this.character}></magic-tab>;
        break;
      case ('misc'):
        tabComponent = <misc-tab character={this.character}></misc-tab>;
        break;
      default:
        tabComponent = <profile-tab character={this.character}></profile-tab>;
        break;
    }
    return tabComponent;
  }

  render() {
    this.character.saveLocalCharacter();
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title text-capitalize>{this.character.personal.name}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        {this.getStaticUI()}
        <ion-card>
          {this.getCurrentTabUI(this.currentTabName)}
        </ion-card>
      </ion-content>,
      <ion-footer>
      <choose-list id="choose-list" elementList={[]}></choose-list>,
        <ion-segment onIonChange={(e) => this.currentTabName = e.detail.value} value="profile">
          <ion-segment-button value="profile">
            <ion-icon name="person"></ion-icon>
            <ion-label text-capitalize>Profile</ion-label>
          </ion-segment-button>
          <ion-segment-button value="fight">
            <ion-icon name="fitness"></ion-icon>
            <ion-label text-capitalize>Fight</ion-label>
          </ion-segment-button>
          <ion-segment-button value="magic">
            <ion-icon name="flame"></ion-icon>
            <ion-label text-capitalize>Magic</ion-label>
          </ion-segment-button>
          <ion-segment-button value="misc">
            <ion-icon name="apps"></ion-icon>
            <ion-label text-capitalize>Misc</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-footer>
    ]);
  }

}
