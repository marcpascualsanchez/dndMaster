import { Component, h, Prop, State, EventEmitter, Event } from '@stencil/core';
import { ICharacterParams, IEquipment } from '../../../models/Character';
import { IChoosableItemList } from '../../../models/classes/Class';
import { languages } from '../../../models/Character'
import { WeaponManager } from '../../../utils/WeaponManager';
import { IWeapon } from '../../../utils/weaponList';
import { ArmorManager } from '../../../utils/ArmorManager';
import { IArmor } from '../../../utils/armorList';

@Component({
  tag: 'choose-options',
  styleUrl: 'choose-options.scss',
  shadow: false
})
export class ChooseOptions {

  @Event({
    eventName: 'paramSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) selectEmitter: EventEmitter;
  @Prop() characterParams: ICharacterParams;
  @State() isFormValid: boolean;

  private weaponManager: WeaponManager;
  private armorManager: ArmorManager;
  private equipment: IEquipment;
  private equipmentInputs: any[];
  private languagesInputs: any[];
  private skillInputs: any[];

  constructor() {
    this.isFormValid = false;
    this.weaponManager = new WeaponManager();
    this.armorManager = new ArmorManager();
  }

  componentDidLoad() {
    this.equipmentInputs = Array.from(document.querySelectorAll('.equipment-options'));
    this.languagesInputs = Array.from(document.querySelectorAll('.languages-options'));
    this.skillInputs = Array.from(document.querySelectorAll('.skill-options'));
  }

  setEquipment() {
    // TODO: in case same object more than once, add it to amount
    this.equipment = { weapons: [], armors: [], items: [] };
    const chosenList: IChoosableItemList[][] = this.equipmentInputs.map(i => i.value).filter(v => v);
    chosenList.forEach((choosenValues) => {
      choosenValues.forEach((value) => {
        switch (value.equipmentType) {
          case ('weapons'):
            const chosenWeapon: IWeapon = this.weaponManager.getByName(value.name);
            chosenWeapon.amount = value.amount;
            this.equipment.weapons.push(chosenWeapon);
            break;
          case ('armors'):
            const chosenArmor: IArmor = this.armorManager.getByName(value.name);
            chosenArmor.amount = value.amount;
            this.equipment.armors.push(chosenArmor);
            break;
          default:
            // TODO: standarize armors and items too
            const chosenItem: any = Object.assign({}, value);
            delete chosenItem.equipmentType;
            this.equipment[value.equipmentType].push(chosenItem);
            break;
        }
      })
    });
    this.characterParams.equipment = this.equipment;
  }

  setLanguages() {
    const chosenList: string[] = this.languagesInputs.map(i => i.value).filter(v => v);
    this.characterParams.languages = this.characterParams.languages.concat(chosenList);
  }

  setSkills() {
    const chosenList: string[] = this.skillInputs.map(i => i.value).filter(v => v);
    this.characterParams.proficiency.skillMods = this.characterParams.proficiency.skillMods.concat(chosenList);
  }

  confirmEquipment() {
    this.setEquipment();
    this.setLanguages();
    this.setSkills();
    this.selectEmitter.emit({ step: 'options', param: {} });
  }

  getEquipmentOptions() {
    return this.characterParams.equipmentOptions.map((option) =>
      <ion-card>
        <ion-radio-group allowEmptySelection class="equipment-options">
          {option.list.map(items =>
            <ion-item custom-value={items}>
              <ion-label>
                <ion-grid>
                  {items.map(item =>
                    <ion-row>
                      <ion-col size="2">x{item.amount}</ion-col>
                      <ion-col size="10">{item.name}</ion-col>
                    </ion-row>
                  )}
                </ion-grid>
              </ion-label>
              <ion-radio slot="end" value={items} checked={option.list.length === 1} disabled={option.list.length === 1}></ion-radio>
            </ion-item>
          )}
        </ion-radio-group>
      </ion-card>
    );
  }

  getSkillsOptions() {
    return this.characterParams.skillsOptions.map(option => {
      let list: string[] = option.list;
      return <ion-card>
        <ion-item>
          <ion-select placeholder="Choose a skill..." class="skill-options">
            {list.map(l => <ion-select-option value={l}>{l}</ion-select-option>)}
          </ion-select>
        </ion-item>
      </ion-card>
    });
  }

  getLanguagesOptions() {
    return this.characterParams.languagesOptions.map(option => {
      let list: string[];
      if (option.list === 'exotic') {
        list = languages.exotic;
      } else if (option.list === 'all') {
        list = languages.all;
      } else {
        list = option.list;
      }
      return <ion-card>
        <ion-item>
          <ion-select placeholder="Choose language..." class="languages-options">
            {list.map(l => <ion-select-option value={l}>{l}</ion-select-option>)}
          </ion-select>
        </ion-item>
      </ion-card>
    });
  }

  render() {
    return [
      <div>
        <h3>Equipment</h3>
        {this.getEquipmentOptions()}
      </div>,
      <div>
        <h3>Skills</h3>
        {this.getSkillsOptions()}
      </div>,
      <div>
        <h3>Languages</h3>
        {this.getLanguagesOptions()}
      </div>,
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button class="confirm-icon" onClick={() => this.confirmEquipment()}>
              <ion-icon name="checkmark-circle" color="success"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    ];
  }

}
