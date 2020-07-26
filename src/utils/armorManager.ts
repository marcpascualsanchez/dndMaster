import { armorList, IArmorList, IArmor, EArmorType } from './armorList';

const armors: IArmorList = armorList;

export function getAllArmors() {
    return [...getLightArmors(), ...getMediumArmors(), ...getHeavyArmors()];
}

export function getArmorByName(name: string) {
    return getAllArmors().find(a => a.name === name);
}

export function getLightArmors() {
    return armors.light;
}

export function getMediumArmors() {
    return armors.medium;
}

export function getHeavyArmors() {
    return armors.heavy;
}

export function getArmorType(armor: IArmor): EArmorType {
    if (armors.light.some(a => a.name === armor.name)) {
        return EArmorType.light;
    }
    if (armors.medium.some(a => a.name === armor.name)) {
        return EArmorType.medium;
    }
    if (armors.heavy.some(a => a.name === armor.name)) {
        return EArmorType.heavy;
    }
}