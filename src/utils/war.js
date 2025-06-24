import { createDeck, shuffleDeck, splitDeck, getCardValue} from '../utils/deck.js'

export const startGame = () =>{
    console.log('Game Starting')
    let deck = [];
    deck = createDeck();
    deck = shuffleDeck(deck);

    const splitDeckArray = splitDeck(deck)
    // let { playerDeck, computerDeck } = splitDeck(deck);
    let playerDeck = splitDeckArray[0]
    let computerDeck = splitDeckArray[1]

    // console.log(playerDeck);
    // console.log(computerDeck);

    return{
        playerDeck,
        computerDeck,
        playerCard: '?',
        computerCard: '?',
        warCards: [],
        roundCount: 0,
        status: 'Game started! Click "Play Round!" to start!',
        isGameStarted: true,
        isWar: false,
        isGameOver: false,
        isGameEnded: false,
    };
};

export const playRound = (state) => {
    const  { playerDeck, computerDeck, warCards, roundCount } = state;

    if(playerDeck.length < 1 || computerDeck.length < 1) {
        return{
            ...state,
            status: playerDeck.length < 1 ? 'Computer wins the game!' : 'Player wins the game!',
            isGameOver: true,
            isGameEnded: false,
        }
    }

    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    const newWarCards = [...warCards, playerCard, computerCard]

    // console.log(newWarCards)

    let status = '';
    let isWar = false;

    let playerValue = getCardValue(playerCard);
    let computerValue = getCardValue(computerCard);

    if(playerValue > computerValue){
        status = `Player wins round! ${playerCard.rank}${playerCard.suit} beats ${computerCard.rank}${computerCard.suit}`
        newPlayerDeck.push(...newWarCards);
    }
    else if(playerValue < computerValue){
        status = `Computer wins round! ${computerCard.rank}${computerCard.suit} beats ${playerCard.rank}${playerCard.suit}`
        newComputerDeck.push(...newWarCards);
    }
    else{
        status = `WAR! ${playerCard.rank}${playerCard.suit} ties ${computerCard.rank}${computerCard.suit}`;
        isWar = true;
    }

    return{
        playerDeck: newPlayerDeck,
        computerDeck: newComputerDeck,
        playerCard: `${playerCard.rank}${playerCard.suit}`,
        computerCard: `${computerCard.rank}${computerCard.suit}`,
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
    const  { playerDeck, computerDeck, warCards, roundCount } = state;
    if(playerDeck.length < 1 || computerDeck.length < 1) {
        return{
            ...state,
            status: playerDeck.length < 1 ? 'Computer wins the game!' : 'Player wins the game!',
            isGameOver: true,
            isGameEnded: false,
        }
    }

    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    const newWarCards = [...warCards, playerCard, computerCard];

    // console.log(newWarCards);

    let status = '';
    let isWar = false;

    let playerValue = getCardValue(playerCard);
    let computerValue = getCardValue(computerCard);

    if(playerValue > computerValue){
        status = `Player wins the War! ${playerCard.rank}${playerCard.suit} beats ${computerCard.rank}${computerCard.suit}`
        newPlayerDeck.push(...newWarCards);
    }
    else if(playerValue < computerValue){
        status = `Computer wins the War! ${computerCard.rank}${computerCard.suit} beats ${playerCard.rank}${playerCard.suit}`
        newComputerDeck.push(...newWarCards);
    }
    else{
        status = `ANOTHER WAR! ${playerCard.rank}${playerCard.suit} ties ${computerCard.rank}${computerCard.suit}`;
        isWar = true;
    }

    return{
        playerDeck: newPlayerDeck,
        computerDeck: newComputerDeck,
        playerCard: `${playerCard.rank}${playerCard.suit}`,
        computerCard: `${computerCard.rank}${computerCard.suit}`,
        warCards: isWar ? newWarCards : [],
        roundCount,
        status: status,
        isGameStarted: true,
        isWar: isWar,
        isGameOver: false,
    };
}

export const endgame = (state) =>{

    const message = state.playerDeck.length === 0 ? 'Computer wins the game! Play Again?' : 'Player wins the game! Play again?'
    return{
        playerDeck: [],
        computerDeck: [],
        playerCard: '?',
        computerCard: '?',
        warCards: [],
        roundCount: 0,
        status: message,
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
