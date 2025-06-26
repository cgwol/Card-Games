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
        let message = [{ text: 'Blackjack! Player wins!', color: 'black' }];
        message.push(...winnings(bet))
        return {
            deck,
            playerHand,
            dealerHand,
            status: message,
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
    const { deck, playerHand, bet } = state;

    const newDeck = [...deck];
    const newPlayerHand = [...playerHand, newDeck.shift()];

    // console.log(newPlayerHand)

    const playerValue = getHandValue(newPlayerHand);
    // console.log(playerValue)

    if (playerValue > 21) {
        let message = [{ text: 'Player busts! Dealer wins!', color: 'black' }]
        message.push(...losses(bet));
        
        return {
            ...state,
            deck: newDeck,
            playerHand: newPlayerHand,
            status: message,
            isGameEnded: true,
        };
    }

    if (playerValue === 21) {
        let message = [{ text: 'Blackjack! Player wins!', color: 'black' }]
        message.push(...winnings(bet))
        return {
            ...state,
            deck: newDeck,
            playerHand: newPlayerHand,
            status: message,
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
    const { deck, playerHand, dealerHand, bet } = state;
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    let dealerValue = getHandValue(newDealerHand);

    while (dealerValue < 17) {
        newDealerHand = [...newDealerHand, newDeck.shift()];
        dealerValue = getHandValue(newDealerHand);
    }
    // console.log(newDealerHand)
    // console.log(dealerValue)

    const playerValue = getHandValue(playerHand);
    let message = [];
    let isGameEnded = false;

    if (dealerValue > 21) {
        message = [
            { text: 'Dealer busts! Player wins!', color: 'black' },
        ]
        message.push(...winnings(bet));
        isGameEnded = true;
    } else if (playerValue > dealerValue) {
        message = [
            { text: 'Player wins!', color: 'black' }
        ]
        message.push(...winnings(bet));
        isGameEnded = true;
    } else if (dealerValue > playerValue) {
        message = [
            { text: 'Dealer wins!', color: 'black' }
        ]
        message.push(...losses(bet));
        isGameEnded = true
    } else {
        message = [
            {text: 'Push!', color: 'black'}
        ]
        isGameEnded = true;
    }

    // console.log(message)

    return {
        ...state,
        deck: newDeck,
        dealerHand: newDealerHand,
        status: message,
        isGameEnded,
    }
}

export const winnings = (bet) =>{
    // Later usage for credits
    let x = bet * 2;
    let status = [
        {text: ' Player wins ', color: 'black'},
        {text: `${x}`, color: 'green'},
        {text: ' credits!', color: 'black'}
    ]

    return status;
    
}

export const losses = (bet) =>{
    // Later usage for credits
    let status = [
        {text: ' Player loses ', color: 'black'},
        {text: `${bet}`, color: 'red'},
        {text: ' credits!', color: 'black'}
    ]

    return status;
}

