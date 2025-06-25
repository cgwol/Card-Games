import { createDeck, shuffleDeck} from '../utils/deck.js'

export const getHandValue = (hand) =>{
    let value = 0;
    let aces = 0;
    for(const card of hand){
        if(card.rank === 'A'){
            aces+=1;
        } else if(['J','Q','K'].includes(card.rank)){
            value += 10;
        } else {
            value += parseInt(card.rank);
        }
    }
    for (let i = 0; i < aces; i++){
        if(value + 11 <= 21){
            value += 11;
        } else {
            value += 1;
        }
    }

    return value;
}

export const startGame = () => {
    let deck = createDeck();
    deck = shuffleDeck(deck);
    let data = dealCards(deck)

    console.log(data)

    let playerHand = data.playerHand;
    let dealerHand = data.dealerHand;
    deck = data.deck;

    console.log(playerHand)
    console.log(dealerHand)
    // console.log(deck)

    console.log(getHandValue(playerHand))

}

export const dealCards = (deck) => {
    let playerHand = [];
    let dealerHand = [];

    for(let i = 0; i < 2; i++){
        playerHand[i] = deck.shift();
    }

    for(let i = 0; i < 2; i++){
        dealerHand[i] = deck.shift();
    }

    return {playerHand, dealerHand, deck} 

}

