
export class Card{
    constructor(
        gachaId,
        cardName,
        price,
        bronze,
        silver,
        gold,
        platinum,
        diamond
    ) {
        this.gachaId = gachaId;
        this.cardName = cardName;
        this.price = price;
        this.bronze = bronze;
        this.silver = silver;
        this.gold = gold;
        this.platinum = platinum;
        this.diamond = diamond;
    }
}