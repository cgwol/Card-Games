import { useState } from "react";
import { startGame, playRound, playWar, endgame, getCardCount } from '../utils/war.js'

export default function War() {

    const [gameState, setGameState] = useState({
        playerDeck: [],
        computerDeck: [],
        playerCard: '?',
        computerCard: '?',
        warCards: [],
        roundCount: 0,
        status: 'Click "Play WAR!" to start!',
        isGameStarted: false,
        isWar: false,
        isGameOver: false,
        isGameEnded: false,
    });

    const { playerCardCount, computerCardCount } = getCardCount(gameState);

    const handleStartGame = () => {
        setGameState(startGame())
    }

    const handlePlayRound = () => {
        setGameState(playRound(gameState))
    }

    const handlePlayWar = () => {
        setGameState(playWar(gameState))
    }

    const handleEndGame = () => {
        setGameState(endgame(gameState))
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h1 className="fw-bold">WAR!</h1>

            <div className="d-flex justify-content-around w-50 mt-3" id="game-area">

                <div className="d-flex flex-column" id="player">
                    <h3 className="text-center">Player</h3>
                    <div className="card justify-content-center" style={{ width: '160px', height: '224px' }}>
                        <h5 className="text-center " id="player-card">{gameState.playerCard}</h5>
                    </div>
                    <p className="text-center mt-2">Cards left: <span id="player-card-count">{playerCardCount}</span></p>
                </div>

                <div className="d-flex flex-column" id="computer">
                    <h3 className="text-center">Computer</h3>
                    <div className="card justify-content-center" style={{ width: '160px', height: '224px' }}>
                        <h5 className="text-center" id="computer-card">{gameState.computerCard}</h5>
                    </div>
                    <p className=" text-center mt-2">Cards left: <span id="computer-card-count"></span>{computerCardCount}</p>
                </div>

            </div>

            <div className="mt-3" id="controls">

                <button
                    id="start-play"
                    onClick={handleStartGame}
                    className="btn btn-primary btn-lg"
                    style={{ display: gameState.isGameStarted ? 'none' : 'inline-block' }}
                >
                    Play WAR!
                </button>
                <button
                    id="round-play"
                    onClick={handlePlayRound}
                    className="btn btn-primary btn-lg"
                    style={{ display: gameState.isGameStarted && !gameState.isWar && !gameState.isGameOver ? 'inline-block' : 'none' }}
                >
                    Play round!
                </button>
                <button
                    id="war-play"
                    onClick={handlePlayWar}
                    className="btn btn-warning btn-lg"
                    style={{ display: gameState.isGameStarted && gameState.isWar && !gameState.isGameOver ? 'inline-block' : 'none' }}
                >
                    WAR!
                </button>
                <button
                    id="end-game"
                    onClick={handleEndGame}
                    className="btn btn-primary btn-lg"
                    style={{ display: gameState.isGameOver && !gameState.isGameEnded ? 'inline-block' : 'none' }}
                >
                    End Game
                </button>

            </div>

            <div className="mt-4" id="status">

                <h5>{gameState.status}</h5>

            </div>
        </div>
    )
}