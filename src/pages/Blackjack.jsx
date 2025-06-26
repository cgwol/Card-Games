import { useState } from 'react';
import { startGame, hitBlackJack, standBlackJack } from '../utils/blackjack.js'
import cardBack from '../assets/card-back2.jpg'

startGame()


export default function Blackjack() {

    const [gameState, setGameState] = useState({
        dealerHand: ['placeholder', 'placeholder'],
        playerHand: ['placeholder', 'placeholder'],
        deck: [],
        bet: 0,
        status: [{ text: 'Get to 21!', color: 'black' }],
        isGameStarted: false,
        isGameEnded: false,

    });

    const handleStartGame = () => {
        setGameState(startGame())
    }

    const handleHit = () => {
        setGameState(hitBlackJack(gameState))
    }

    const handleStand = () => {
        setGameState(standBlackJack(gameState))
    }

    // console.log(gameState)

    return (
        <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className="fw-bold">Blackjack</h1>

            <div className="w-50 mt-5" id="game-area">

                <h3 className='text-center'>Dealer's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='dealer'>

                    {
                        gameState.dealerHand.map((card, index) => (
                            gameState.isGameStarted ?
                                (<div
                                    key={index}
                                    className='card justify-content-center border-2 ms-1 me-1'
                                    style={{ width: '160px', height: '224px' }}
                                >
                                    {gameState.isGameStarted && (index === 0 || gameState.isGameEnded) && card !== 'placeholder' ? (
                                        <h5 className="text-center" style={{ color: card.color }}>
                                            {card.rank}{card.suit}
                                        </h5>
                                    ) : (
                                        <img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />
                                    )}
                                </div>)

                                :
                                (<div
                                    key={index}
                                    className='card justify-content-center border-2 ms-1 me-1'
                                    style={{ width: '160px', height: '224px' }}
                                >
                                    <img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />
                                </div>)
                        ))
                    }


                </div>

                <h3 className='text-center mt-5'>Player's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='player'>
                    {
                        gameState.playerHand.map((card, index) => (
                            gameState.isGameStarted ?
                                (<div
                                    key={index}
                                    className='card justify-content-center border-2 ms-1 me-1'
                                    style={{ width: '160px', height: '224px' }}
                                >
                                    <h5 className="text-center" style={{ color: card.color }}>
                                        {card.rank}{card.suit}
                                    </h5>
                                </div>)
                                :
                                (<div
                                    key={index}
                                    className='card justify-content-center border-2 ms-1 me-1'
                                    style={{ width: '160px', height: '224px' }}
                                >
                                    <img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />
                                </div>)
                        ))
                    }

                </div>

                <div className='d-flex flex-row justify-content-center mt-5'>

                    <div className='input-group'
                        style={{ width: !gameState.isGameStarted || gameState.isGameEnded ? '180px' : '0px' }}>
                        <input type="text"
                            className='form-control'
                            placeholder='credits'
                            aria-label='credits'
                            style={{ display: !gameState.isGameStarted || gameState.isGameEnded ? 'inline-block' : 'none' }}
                        />
                        <div className='input-group-append'
                            style={{ display: !gameState.isGameStarted || gameState.isGameEnded ? 'inline-block' : 'none' }}>
                            <button
                                id='start-game'
                                onClick={handleStartGame}
                                className='btn btn-primary btn-lg'
                                type='button'
                            >Bet
                            </button>
                        </div>
                    </div>

                    <button
                        id='hit-button'
                        onClick={handleHit}
                        className='btn btn-warning btn-lg'
                        style={{ width: '90px', display: !gameState.isGameStarted || gameState.isGameEnded ? 'none' : 'inline-block' }}
                        type='button'
                    >Hit
                    </button>

                    <button
                        id='stand-button'
                        onClick={handleStand}
                        className='btn btn-secondary btn-lg'
                        style={{ width: '90px', display: !gameState.isGameStarted || gameState.isGameEnded ? 'none' : 'inline-block' }}
                        type='button'
                    >Stand
                    </button>


                </div>
                <div className="mt-4 text-center" id="status">
                    <h5 aria-live="polite">
                        {gameState.status.map((part, index) => (
                            <span key={index} style={part.color ? { color: part.color } : {}}>
                                {part.text}
                            </span>
                        ))}
                    </h5>
                </div>

            </div>


        </div>
    );
}

