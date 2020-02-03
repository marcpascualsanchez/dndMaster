import { ICurrency, ICoinType } from "../components/character-sheet/misc-tab/currency-manager/currency-manager";

export const coinTypes: ICoinType = {
    copper: 1, // basic unit
    silver: 10, // equals to 10 copper
    electrum: 50, // equals to 5 silver
    gold: 100, // equals to 2 electrums
    platinum: 1000, // equals to 10 gold
}

export function getCurrencyFromTotal(total: number): ICurrency {
    const currency: ICurrency = {
        isAuto: true, // it will always be true if using this function
        total: total, // total in copper
        copper: 0,    // basic unit
        silver: 0,    // equals to 10 copper
        electrum: 0,  // equals to 50 copper
        gold: 0,      // equals to 100 copper
        platinum: 0,  // equals to 1000 copper
    };
    let rest = total;
    currency.platinum = Math.floor(rest / 1000);
    rest = rest - currency.platinum * 1000;
    currency.gold = Math.floor(rest / 100);
    rest = rest - currency.gold * 100;
    currency.electrum = Math.floor(rest / 50);
    rest = rest - currency.electrum * 50;
    currency.silver = Math.floor(rest / 10);
    rest = rest - currency.silver * 10;
    currency.copper = rest;
    return currency;
}

export function getTotalFromCoins(coins: ICoinType): number {
    let total = 0;
    total += coins.platinum * 1000;
    total += coins.gold * 100;
    total += coins.electrum * 50;
    total += coins.silver * 10;
    total += coins.copper * 1;
    return total;
}

export function getCurrency(coins: any, currency: ICurrency): ICurrency {
    const newCoins: ICoinType = {
        copper: coins.copper ? coins.copper : currency.copper,
        silver: coins.silver ? coins.silver : currency.silver,
        electrum: coins.electrum ? coins.electrum : currency.electrum,
        gold: coins.gold ? coins.gold : currency.gold,
        platinum: coins.platinum ? coins.platinum : currency.platinum,
    }
    return { ...{ isAuto: currency.isAuto, total: getTotalFromCoins(newCoins) }, ...newCoins };
}
