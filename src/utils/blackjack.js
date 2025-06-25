import { createDeck, shuffleDeck} from '../utils/deck.js'

export const getHandValue = (hand) =>{
    hand = [];

    return hand;
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
    console.log(deck)

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

