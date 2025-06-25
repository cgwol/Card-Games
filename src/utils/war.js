import { createDeck, shuffleDeck, splitDeck, getCardValue } from '../utils/deck.js'

export const startGame = () => {
    console.log('Game Starting')
    let deck = [];
    deck = createDeck();
    deck = shuffleDeck(deck);

    const splitDeckArray = splitDeck(deck)
    let playerDeck = splitDeckArray[0]
    let computerDeck = splitDeckArray[1]

    return {
        playerDeck,
        computerDeck,
        playerCard: '?',
        computerCard: '?',
        warCards: [],
        roundCount: 0,
        status: [{ text: 'Game started! Click "Play round!"', color: 'black' }],
        isGameStarted: true,
        isWar: false,
        isGameOver: false,
        isGameEnded: false,
    };
};

export const playRound = (state) => {
    const { playerDeck, computerDeck, warCards, roundCount } = state;

    if (playerDeck.length < 1 || computerDeck.length < 1) {
        return {
            ...state,
            status: [{ text: playerDeck.length < 1 ? 'Computer wins the game!' : 'Player wins the game!', color: 'black' }],
            isGameOver: true,
            isGameEnded: false,
        }
    }

    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    const newWarCards = [...warCards, playerCard, computerCard]

    console.log(playerCard);
    console.log(playerCard.color)

    let status = '';
    let isWar = false;

    let playerValue = getCardValue(playerCard);
    let computerValue = getCardValue(computerCard);

    if (playerValue > computerValue) {
        status = [
            { text: 'Player wins round! ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
            { text: ' beats ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
        ];
        newPlayerDeck.push(...newWarCards);
    }
    else if (playerValue < computerValue) {
        status = [
            { text: 'Computer wins round! ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
            { text: ' beats ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
        ];
        newComputerDeck.push(...newWarCards);
    }
    else {
        status = [
            { text: 'WAR! ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
            { text: ' ties ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
        ];
        isWar = true;
    }

    return {
        playerDeck: newPlayerDeck,
        computerDeck: newComputerDeck,
        playerCard: playerCard,
        computerCard: computerCard,
        warCards: isWar ? newWarCards : [],
        roundCount: roundCount + 1,
        status: status,
        isGameStarted: true,
        isWar: isWar,
        isGameOver: false,
    };
}

export const playWar = (state) => {

    console.log('Starting War')
    const { playerDeck, computerDeck, warCards, roundCount } = state;
    if (playerDeck.length < 1 || computerDeck.length < 1) {
        return {
            ...state,
            status: [{ text: playerDeck.length < 1 ? 'Computer wins the game!' : 'Player wins the game!', color: 'black' }],
            isGameOver: true,
            isGameEnded: false,
        }
    }

    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    const newWarCards = [...warCards, playerCard, computerCard];

    let status = '';
    let isWar = false;

    let playerValue = getCardValue(playerCard);
    let computerValue = getCardValue(computerCard);

    if (playerValue > computerValue) {
        status = [
            { text: 'Player wins the WAR! ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
            { text: ' beats ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
        ];
        newPlayerDeck.push(...newWarCards);
    }
    else if (playerValue < computerValue) {
        status = [
            { text: 'Computer wins the WAR! ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
            { text: ' beats ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
        ];
        newComputerDeck.push(...newWarCards);
    }
    else {
        status = [
            { text: 'ANOTHER WAR! ', color: 'black' },
            { text: `${playerCard.rank}${playerCard.suit}`, color: playerCard.color },
            { text: ' ties ', color: 'black' },
            { text: `${computerCard.rank}${computerCard.suit}`, color: computerCard.color },
        ];
        isWar = true;
    }

    return {
        playerDeck: newPlayerDeck,
        computerDeck: newComputerDeck,
        playerCard: playerCard,
        computerCard: computerCard,
        warCards: isWar ? newWarCards : [],
        roundCount,
        status: status,
        isGameStarted: true,
        isWar: isWar,
        isGameOver: false,
    };
}

export const endgame = (state) => {

    const message = state.playerDeck.length === 0 ? 'Computer wins the game! Play Again?' : 'Player wins the game! Play again?'
    return {
        playerDeck: [],
        computerDeck: [],
        playerCard: '',
        computerCard: '',
        warCards: [],
        roundCount: 0,
        status: [{ text: message, color: 'black' }],
        isGameStarted: false,
        isWar: false,
        isGameOver: true,
        isGameEnded: true
    };
}

export const getCardCount = (state) => {
    return {
        playerCardCount: state.playerDeck.length,
        computerCardCount: state.computerDeck.length,
    };
}
