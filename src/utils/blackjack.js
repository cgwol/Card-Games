import { createDeck, shuffleDeck } from '../utils/deck.js'

export const getHandValue = (hand) => {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
        if (card.rank === 'A') {
            aces += 1;
        } else if (['J', 'Q', 'K'].includes(card.rank)) {
            value += 10;
        } else {
            value += parseInt(card.rank);
        }
    }
    for (let i = 0; i < aces; i++) {
        if (value + 11 <= 21) {
            value += 11;
        } else {
            value += 1;
        }
    }

    return value;
}

export const startGame = (bet) => {
    let deck = createDeck();
    deck = shuffleDeck(deck);
    let data = dealCards(deck)

    // console.log(data)

    let playerHand = data.playerHand;
    let dealerHand = data.dealerHand;
    deck = data.deck;

    let status = [{ text: 'Game started! Hit or Stand?', color: 'black' }]

    // console.log(playerHand)
    // console.log(dealerHand)
    // console.log(deck)

    const playerValue = getHandValue(playerHand);

    if (playerValue === 21) {
        status = [{ text: 'Blackjack! Player wins!', color: 'black' }]
        return {
            deck,
            playerHand,
            dealerHand,
            status,
            isGameStarted: true,
            isGameEnded: true,
        };
    }

    return {
        dealerHand: dealerHand,
        playerHand: playerHand,
        deck: deck,
        bet: bet,
        status: status,
        isGameStarted: true,
        isGameEnded: false,
    }

}

export const dealCards = (deck) => {
    let playerHand = [];
    let dealerHand = [];

    for (let i = 0; i < 2; i++) {
        playerHand[i] = deck.shift();
    }

    for (let i = 0; i < 2; i++) {
        dealerHand[i] = deck.shift();
    }

    return { playerHand, dealerHand, deck }

}

export const hitBlackJack = (state) => {
    const { deck, playerHand } = state;

    const newDeck = [...deck];
    const newPlayerHand = [...playerHand, newDeck.shift()];

    // console.log(newPlayerHand)

    const playerValue = getHandValue(newPlayerHand);
    // console.log(playerValue)

    if (playerValue > 21) {
        return {
            ...state,
            deck: newDeck,
            playerHand: newPlayerHand,
            status: [{ text: 'Bust! Dealer wins!', color: 'black' }],
            isGameEnded: true,
        };
    }

    if (playerValue === 21) {
        return {
            ...state,
            deck: newDeck,
            playerHand: newPlayerHand,
            status: [{ text: 'Blackjack! Player wins!', color: 'black' }],
            isGameEnded: true,
        };
    }

    return {
        ...state,
        deck: newDeck,
        playerHand: newPlayerHand,
        status: [{ text: 'Hit again or Stand?', color: 'black' }],
        isGameEnded: false,
    };
}

export const standBlackJack = (state) => {
    const { deck, playerHand, dealerHand } = state;
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    let dealerValue = getHandValue(newDealerHand);

    while (dealerValue < 17) {
        newDealerHand = [...newDealerHand, newDeck.shift()];
        dealerValue = getHandValue(newDealerHand);
    }
    console.log(newDealerHand)
    console.log(dealerValue)

    const playerValue = getHandValue(playerHand);
    let status = [];
    let isGameEnded = false;

    if (dealerValue > 21) {
        status = [
            { text: 'Dealer busts! Player wins!', color: 'black' },
        ]
        isGameEnded = true;
    } else if (playerValue > dealerValue) {
        status = [
            { text: 'Player wins!', color: 'black' }
        ]
        isGameEnded = true;
    } else if (dealerValue > playerValue) {
        status = [
            { text: 'Dealer wins!', color: 'black' }
        ]
        isGameEnded = true
    } else {
        status = [
            {text: 'Push!', color: 'black'}
        ]
        isGameEnded = true;
    }

    return {
        ...state,
        deck: newDeck,
        dealerHand: newDealerHand,
        status: status,
        isGameEnded,
    }
}
