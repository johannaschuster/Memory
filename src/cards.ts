export default {

    
    dir: '/img',

    
    amount: 16,

    getCards() {
        let cards = [];
        for (let i=1; i<=this.amount; i++) {
            cards.push({
                id: i,
                img: `${this.dir}${i<10?'0':''}${i}.jpg`
            });
        }
        return cards;
    }
}