import { startGame } from '../utils/blackjack.js'

startGame()


export default function Blackjack() {

    return (
        <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className="fw-bold">Blackjack</h1>

            <div className="w-50 mt-5" id="game-area">

                <h3 className='text-center'>Dealer's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='dealer'>

                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>

                    </div>
                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>

                    </div>


                </div>

                <h3 className='text-center mt-5'>Player's Hand</h3>
                <div className='d-flex flex-row justify-content-center' id='dealer'>

                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>

                    </div>
                    <div className='card justify-content-center border-2' style={{ width: '160px', height: '224px' }}>

                    </div>


                </div>

                <div className='d-flex flex-row justify-content-center mt-5'>

                    <div className='input-group' style={{ width: '180px' }}>
                        <input type="text" className='form-control' placeholder='credits' aria-label='credits' />
                        <div className='input-group-append'>
                            <button
                                id='start-game'
                                onClick={{}}
                                className='btn btn-primary btn-lg'
                                type='button'
                            >Bet
                            </button>
                        </div>
                    </div>

                    <button
                        id='hit-button'
                        onClick={{}}
                        className='btn btn-warning btn-lg'
                        style={{ width: '90px' }}
                        type='button'
                    >Hit
                    </button>

                    <button
                        id='stand-button'
                        onClick={{}}
                        className='btn btn-secondary btn-lg'
                        style={{ width: '90px' }}
                        type='button'
                    >Stand
                    </button>


                </div>

            </div>


        </div>
    );
}

