import { Component, h, Prop, State, EventEmitter, Event } from '@stencil/core';
import { ICharacterParams, IEquipment } from '../models/Character';
import { IChoosableItemList } from '../models/classes/Class';

@Component({
  tag: 'new-equipment',
  styleUrl: 'new-equipment.scss',
  shadow: false
})
export class NewEquipment {

  @Event({
    eventName: 'paramSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) selectEmitter: EventEmitter;
  @Prop() characterParams: ICharacterParams;
  @State() isFormValid: boolean = false;

  private equipment: IEquipment;
  private inputs: any[];

  componentDidLoad() {
    this.inputs = Array.from(document.querySelectorAll('.new-equipment'));
  }

  setEquipment() {
    this.equipment = { weapons: [], armors: [], items: [] };
    const chosenList: IChoosableItemList[][] = this.inputs.map(i => i.value).filter(v => v);
    console.log(chosenList);
    chosenList.forEach((choosenValues) => {
      choosenValues.forEach((value) => {
        const chosenItem: any = Object.assign({}, value);
        delete chosenItem.equipmentType;
        this.equipment[value.equipmentType].push(chosenItem);
      })
    })
  }

  confirmEquipment() {
    this.setEquipment();
    this.selectEmitter.emit({ step: 'equipment', param: this.equipment });
  }

  render() {
    return [
      this.characterParams.equipmentOptions.map((option) =>
        <ion-card>
          <ion-radio-group allowEmptySelection class="new-equipment">
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
      ),
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
