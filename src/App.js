import "./App.css";
import Dice from "./componant/Dice";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [win, setWin] = useState(false);

  useEffect(() => {
    const HeldItems = dice.every((die) => die.isHeld);
    const FirstDiceValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === FirstDiceValue);

    if (HeldItems && allSameValue) {
      setWin(true);
    }
  }, [dice]);

  function generetNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice(id) {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generetNewDice());
    }
    return diceArray;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function RollDice() {
    if (!win) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generetNewDice();
        })
      );
    } else {
      setWin(false);
      setDice(allNewDice());
    }
  }

  const diceElement = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main className="App">
      {win && (
        <Confetti height={window.innerHeight} width={window.innerWidth} />
      )}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same.
        <br /> Click each Dice to freeze it at its current value between rolls.
      </p>

      <div className="DiceContainer">{diceElement} </div>
      <button className="BTNroll" onClick={RollDice}>
        {!win ? "Roll" : "Play again"}
      </button>
    </main>
  );
}

export default App;
