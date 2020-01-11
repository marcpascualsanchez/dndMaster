import { IChoosableEquipment } from "../classes/Class";
import { IChoosableLanguage, IChoosableSkill, ICharacterProficiency } from "../Character";

export interface IBackground {
    name: string;
    equipmentOptions: IChoosableEquipment[];
    proficiency: ICharacterProficiency;
    skillsOptions: IChoosableSkill[];
    languagesOptions: IChoosableLanguage[];
    description: {
        short: string;
        long: string;
    }
}