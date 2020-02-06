const spellSlotsTable = [
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(2, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(3, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(4, 2, 0, 0, 0, 0, 0, 0, 0),
    new Array(4, 3, 0, 0, 0, 0, 0, 0, 0),
    new Array(4, 3, 2, 0, 0, 0, 0, 0, 0),
    new Array(4, 3, 3, 0, 0, 0, 0, 0, 0),
    new Array(4, 3, 3, 1, 0, 0, 0, 0, 0),
    new Array(4, 3, 3, 2, 0, 0, 0, 0, 0),
    new Array(4, 3, 3, 3, 1, 0, 0, 0, 0),
    new Array(4, 3, 3, 3, 2, 0, 0, 0, 0),
    new Array(4, 3, 3, 3, 2, 1, 0, 0, 0),
    new Array(4, 3, 3, 3, 2, 1, 0, 0, 0),
    new Array(4, 3, 3, 3, 2, 1, 1, 0, 0),
    new Array(4, 3, 3, 3, 2, 1, 1, 0, 0),
    new Array(4, 3, 3, 3, 2, 1, 1, 1, 0),
    new Array(4, 3, 3, 3, 2, 1, 1, 1, 0),
    new Array(4, 3, 3, 3, 2, 1, 1, 1, 1),
    new Array(4, 3, 3, 3, 3, 1, 1, 1, 1),
    new Array(4, 3, 3, 3, 3, 2, 1, 1, 1),
    new Array(4, 3, 3, 3, 3, 2, 2, 1, 1),
];

const spellSlotsTableWarlock = [
    new Array(0, 0, 0, 0, 0),
    new Array(1, 0, 0, 0, 0),
    new Array(2, 0, 0, 0, 0),
    new Array(0, 2, 0, 0, 0),
    new Array(0, 2, 0, 0, 0),
    new Array(0, 0, 2, 0, 0),
    new Array(0, 0, 2, 0, 0),
    new Array(0, 0, 0, 2, 0),
    new Array(0, 0, 0, 2, 0),
    new Array(0, 0, 0, 0, 2),
    new Array(0, 0, 0, 0, 2),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 3),
    new Array(0, 0, 0, 0, 4),
    new Array(0, 0, 0, 0, 4),
    new Array(0, 0, 0, 0, 4),
    new Array(0, 0, 0, 0, 4),
]

const semiCasters = ['eldritchKnight', 'arcaneTrickster'];
const halfCasters = ['artificer', 'paladin'];
const fullCasters = ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'];

export function getSpellSlots(className: string, level: number) { // Currently not supporting multiclass
    let classLevel = level;
    const isSemiCaster = semiCasters.indexOf(className) >= 0;
    const isHalfCaster = halfCasters.indexOf(className) >= 0;
    const isFullCaster = fullCasters.indexOf(className) >= 0;

    if (isSemiCaster) {
        classLevel *= 0.3334;
    } else if (isHalfCaster) {
        classLevel *= 0.5;
    } else if (isFullCaster) {
        classLevel *= 1; // I know it is redundant but it helps the reading
    }

    if (classLevel > 0.5 || className === 'artificer') {
        classLevel += 0.5;
    }

    if (isSemiCaster && classLevel > 1) {
        classLevel += 0.66666667;
    }

    const usedTable = className === 'warlock' ? spellSlotsTableWarlock : spellSlotsTable;
    return usedTable[Math.floor(classLevel)];
}
