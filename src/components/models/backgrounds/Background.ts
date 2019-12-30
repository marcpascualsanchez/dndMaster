import { IChoosableEquipment } from "../classes/Class";
import { IChoosableLanguage } from "../Character";

export interface IBackground {
    name: string;
    equipmentOptions: IChoosableEquipment[];
    // skills: string[];
    languagesOptions: IChoosableLanguage[];
}