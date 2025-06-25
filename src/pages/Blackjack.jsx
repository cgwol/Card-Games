import { useState } from 'react';
import { startGame } from '../utils/blackjack.js'
import cardBack from '../assets/card-back2.jpg'

startGame()


export default function Blackjack() {

    const [gameState, setGameState] = useState({
        dealerHand: [],
        playerHand: [],
        deck: [],
        bet: 0,
        status: [{ text: 'Get to 21!', color: 'black' }],
        isGameStarted: false,
        isGameEnded: false,

    });

    const handleStartGame = () => {
        setGameState(startGame())
    }

    return (
        <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className="fw-bold">Blackjack</h1>

            <div className="w-50 mt-5" id="game-area">

                <h3 className='text-center'>Dealer's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='dealer'>

                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>
                        {
                            !gameState.isGameStarted ? (<img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />)
                                : <h5 className='text-center' style={{ color: `${gameState.dealerHand[0].color}` }}>{gameState.dealerHand[0].rank}{gameState.dealerHand[0].suit}</h5>
                        }
                    </div>
                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>
                        {
                            !gameState.isGameStarted ? (<img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />)
                                : <h5 className='text-center' style={{ color: `${gameState.dealerHand[1].color}` }}>{gameState.dealerHand[1].rank}{gameState.dealerHand[1].suit}</h5>
                        }
                    </div>


                </div>

                <h3 className='text-center mt-5'>Player's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='dealer'>

                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>
                        {
                            !gameState.isGameStarted ? (<img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />)
                                : <h5 className='text-center' style={{ color: `${gameState.playerHand[0].color}` }}>{gameState.playerHand[0].rank}{gameState.playerHand[0].suit}</h5>
                        }
                    </div>
                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>
                        {
                            !gameState.isGameStarted ? (<img className="card-img" src={cardBack} alt="logo" style={{ width: '160px', height: '224px', objectFit: 'cover' }} />)
                                : <h5 className='text-center' style={{ color: `${gameState.playerHand[1].color}` }}>{gameState.playerHand[1].rank}{gameState.playerHand[1].suit}</h5>
                        }
                    </div>


                </div>

                <div className='d-flex flex-row justify-content-center mt-5'>

                    <div className='input-group' style={{ width: '180px' }}>
                        <input type="text" className='form-control' placeholder='credits' aria-label='credits' />
                        <div className='input-group-append'>
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
                        // onClick={}
                        className='btn btn-warning btn-lg'
                        style={{ width: '90px' }}
                        type='button'
                    >Hit
                    </button>

                    <button
                        id='stand-button'
                        // onClick={}
                        className='btn btn-secondary btn-lg'
                        style={{ width: '90px' }}
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

