import { Component, Prop, h } from '@stencil/core';
import { skills, EAbility, ICharacterParams } from '../models/Character';

@Component({
  tag: 'character-sheet',
  styleUrl: 'character-sheet.scss',
})
export class CharacterSheet {
  private mockChar = JSON.parse('{"race":{"name":"halfOrc","statMods":{"Strength":2,"Constitution":1},"proficiency":{"skillMods":["intimidation"]},"size":"medium","speed":30,"languages":["common","orc"],"maxAge":75,"raceAbilities":["relentless endurance","savage attacks","darkvision"],"description":{"short":"Strong and hardy, the perfect frontline","long":"Harlf-orcs are hard to kill, nearly impossible to kill. Perfect as Barbarians, Fighters and Paladins"}},"class":{"name":"barbarian","healthGrowth":12,"hitDiceGrowth":12,"armorClass":10,"classTraits":["unarmored defense","rage"],"proficiency":{"skillModsAble":2,"skillMods":["animal handling","athletics","intimidation","nature","perception","survival"],"savingThrows":["strenght","constitution"],"armors":["light armor","medium armor","shield"],"weapons":["simple weapon","martial weapon"]},"equipment":{"weapon":{"primary":{"name":"greataxe","amount":1},"secondary":{"name":"handaxe","amount":2}},"items":[{"name":"explorer pack","amount":1},{"name":"javelin","amount":4}]},"description":{"long":"Barbarians are barbarians","short":"Barbarians are barbarians Barbarians are barbarians Barbarians are barbarians"}},"abilities":{"strength":"12","dexterity":"13","constitution":"16","intelligence":"10","wisdom":"10","charisma":"14"}}');
  private mockImgPath: string = '../../assets/img/profileImages/PaladinElf.jpg';

  @Prop() characterParams: ICharacterParams = this.mockChar;

  getProfficencyIcon(skill: string) {
    //TODO: check profficency coming from previous steps
    let isProficiency = false;
    Object.keys(this.characterParams).forEach((cp) => {
      if (
        this.characterParams[cp].proficiency
        && this.characterParams[cp].proficiency.skillMods.some((sm) => skill === sm)
      ) {
        isProficiency = true;
      }
    })
    return <ion-icon name={isProficiency ? 'radio-button-on' : 'radio-button-off'}></ion-icon>;
  }

  getSkillsList(ability: string) {
    return skills[ability].map((s) => <p>{this.getProfficencyIcon(s)}{s}</p>);
  }

  getAbilities() {
    const abilitiesHTML = Object.keys(EAbility).map((ability) => {
      return (
        <ion-row no-padding>
          <ion-col size="6" no-padding>
            <span>{ability}:</span>
            <span>{this.characterParams.abilities[ability]}</span>
          </ion-col>
          <ion-col size="6" no-padding>{this.getSkillsList(ability)}</ion-col>
        </ion-row>
      );
    });
    return abilitiesHTML;
  }

  render() {
    console.log('baseParams', this.characterParams);
    return (
      <ion-content>
        <ion-grid>
          <ion-row>
            <ion-col class="image-col" no-padding offset="2" size="8">
              <div class="left-triangle">
              </div>
              <ion-img class="profile-image" src={this.mockImgPath} no-padding />
              <div class="right-triangle">
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="icon-container" text-center size="4">
              <ion-icon class="profile-icon" name="help-buoy"></ion-icon>
              <span class="icon-value">{this.characterParams.class.armorClass}</span>
            </ion-col>
            <ion-col class="icon-container" text-center size="4">
              <ion-icon class="profile-icon" name="heart"></ion-icon>
              <span class="icon-value">{this.characterParams.class.healthGrowth * 1}</span>
            </ion-col>
            <ion-col class="icon-container" text-center size="4">
              <ion-icon class="profile-icon" name="walk"></ion-icon>
              <span class="icon-value">{this.characterParams.race.speed}</span>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-grid no-padding>
              {this.getAbilities()}
            </ion-grid>
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
