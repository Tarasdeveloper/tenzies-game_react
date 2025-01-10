import { useEffect, useRef, useState } from 'react';
import Die from './Die/Die';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const buttonRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);

    const gameWon =
        dice.every((die) => die.isHeld) &&
        dice.every((die) => die.value === dice[0].value);

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus();
        }
    }, [gameWon]);

    function generateAllNewDice() {
        // const nweDice = [];
        // for (let i = 0; i < 10; i++) {
        //     const rand = Math.ceil(Math.random() * 6);
        //     nweDice.push(rand);
        // }
        // return nweDice;
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    function rollDice() {
        if (!gameWon) {
            setClickCount((prevCount) => prevCount + 1);
            setDice((oldDice) =>
                oldDice.map((die) =>
                    die.isHeld
                        ? die
                        : { ...die, value: Math.ceil(Math.random() * 6) }
                )
            );
        } else {
            setClickCount(0);
            setDice(generateAllNewDice());
        }
    }

    function hold(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((dieObj) => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ));

    return (
        <main>
            {gameWon && <ReactConfetti />}
            <div className="sr-only" aria-live="polite">
                {gameWon && (
                    <p>
                        Congratulations! You won! Press New Game to start again.
                    </p>
                )}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <p className="click-counter">
                Number of rolls: <strong>{clickCount}</strong>
            </p>
            <div className="dice-container">{diceElements}</div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? 'New Game' : 'Roll'}
            </button>
        </main>
    );
}
