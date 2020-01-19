export function getCurrencyFromTotal(total: number) {
    const currency = {
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