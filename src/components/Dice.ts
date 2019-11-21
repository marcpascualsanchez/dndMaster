import { EAbility } from './Character';

export class Dice {
    public throw(amount: number, faces: number) {
        const result = [];
        for (let i = 0; i < amount; i += 1) {
            result[i] = Math.round(Math.random() * (faces - 1)) + 1; //min is 1, max is faces
        }
        return result;
    }

    public getNewCharacterThrows(): number[] {
        const throwTimes = 4;
        const faces = 6;
        const maxResults = 3; // Will get the n best throws for each ability

        let currentThrows;
        let bestResults;
        const result = Object.keys(EAbility).map(() => {
            currentThrows = this.throw(throwTimes, faces);
            bestResults = currentThrows.sort().slice(-maxResults);
            return bestResults.reduce((a, b) => a + b, 0); // Sum of best results
        });

        return result;
    }
    // Tirades a l'inici de creació de character
    // Per cada ability 4 daus, dels quals es fa el sumatori dels 3 més alts
}