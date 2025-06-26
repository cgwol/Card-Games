const suits = ['♥', '♦', '♣', '♠'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
    let deck = [];
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < ranks.length; j++){
            let color = '';
            if(i > 1){
                color = 'black';
            } else {
                color = 'red';
            }
            let card = {
                suit: suits[i],
                rank: ranks[j],
                color: color,
            };
            deck.push(card)
            // console.log(card)
        }
    }
    return deck;
}

export const shuffleDeck = (deck) => {
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

export const splitDeck = (deck) => {
    var deck1 = deck.splice(0,26);
    var deck2 = deck.splice(0);

    return [deck1, deck2];
}

export const getCardValue = (card) => {
    var rankIndex = ranks.indexOf(card.rank)
    return rankIndex + 2; // Adding 2 since index is 0 and first card is 2
}
