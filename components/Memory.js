import React, { useState, useEffect } from "react";
import "../public/css/memory.css";

const MemoryGame = () => {
  const [movesCount, setMovesCount] = useState(0);
  //   const [winCount, setWinCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  //   const [cards, setCards] = useState([]);
  //   const [firstCard, setFirstCard] = useState(null);
  //   const [secondCard, setSecondCard] = useState(null);
  const [result, setResult] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(8);
  const [cardValues, setCardValues] = useState([]);

  let firstCard = false;
  let secondCard = false;
  let firstCardValue = "";

  let winCount = 0;

  let winCountElement = document.querySelector(".winCountCon");

  // ... Import your images as needed
  const items = [
    { name: "oguzberkacar", image: "/img/memory/avatar.png" },
    { name: "cyberslogo", image: "/img/memory/cyberslogo.png" },
    { name: "coffee", image: "/img/memory/coffee.png" },
    { name: "curly", image: "/img/memory/curly.png" },
    { name: "dalle-1", image: "/img/memory/dalle-1.webp" },
    { name: "dalle-2", image: "/img/memory/dalle-2.webp" },
    { name: "marsh", image: "/img/memory/marsh.png" },
    { name: "boy", image: "/img/memory/boy.png" },
    { name: "dog", image: "/img/memory/dog.png" },
  ];

  const generateRandomCards = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    setNumberOfCards(cardValues.length);
    return cardValues;
  };

  //   ref for game container
  const gameContainer = React.createRef();
  const winCountRef = React.createRef();

  const matrixGenerator = (cardValues, size = 4) => {
    // gameContainer.innerHTML = "";
    gameContainer.current.innerHTML = "";

    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      /*
          Create Cards
          before => front side (contains question mark)
          after => back side (contains actual image);
          data-card-values is a custom attribute which stores the names of the cards to match later
        */

      gameContainer.current.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="image"/></div>
       </div>
       `;
    }
    //Grid

    // gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    gameContainer.current.style.gridTemplateColumns = `repeat(${size},auto)`;

    //Cards
    let cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
        if (!card.classList.contains("matched")) {
          //flip the cliked card
          card.classList.add("flipped");
          //if it is the firstcard (!firstCard since firstCard is initially false)
          if (!firstCard) {
            //so current card will become firstCard
            firstCard = card;
            // console.log(card);
            // setFirstCard(card);
            //current cards value becomes firstCardValue
            firstCardValue = card.getAttribute("data-card-value");
          } else {
            //increment moves since user selected second card
            // movesCounter();
            let movesCountContainer = document.querySelector(".moves-count");
            movesCountContainer.innerHTML =
              parseInt(movesCountContainer.innerHTML) + 1;
            setMovesCount(movesCount + 1);
            //secondCard and value
            secondCard = card;
            // setSecondCard(card);
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
              console.log("match");
              //if both cards match add matched class so these cards would beignored next time
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              //set firstCard to false since next card would be first now
              firstCard = false;
              //winCount increment as user found a correct match
              //   winCount += 1;
              //   console.log(winCount);
              //   console.log(parseInt(winCount) + 1);
              //   setWinCount(parseInt(winCount) + 1);
              winCount = parseInt(winCount) + 1;
              let winCountElement = document.querySelector(".winCountCon");

              winCountElement.innerHTML = winCount;

              console.log(movesCountContainer);

              //check if winCount ==half of cardValues
              if (winCount == Math.floor(cardValues.length / 2)) {
                let resultcon = document.querySelector("#result");

                resultcon.innerHTML = `<h2>You Won</h2>
              <h4>Moves: ${movesCountContainer.innerHTML}</h4>`;
                stopGame();
              }
            } else {
              //if the cards dont match
              //flip the cards back to normal
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 900);
            }
          }
        }
      });
    });
  };

  const initializer = () => {
    setResult("");
    // console.log("initializer");
    // console.log(winCount);
    // setWinCount(0);
    winCount = 0;
    let randomCards = generateRandomCards();
    matrixGenerator(randomCards);
  };

  useEffect(() => {
    // Your initialization logic here (e.g., card shuffling, event listeners)
    // wait 1 second before starting the game
    if (isGameStarted == true) {
      if (seconds >= 0 && seconds !== 59) {
        setTimeout(() => {
          let newSeconds = parseInt(seconds) + 1;
          newSeconds = newSeconds <= 9 ? `0${newSeconds}` : newSeconds;
          setSeconds(newSeconds);
        }, 1000);
      }

      // set minutes to 1 when seconds reach 60
      if (seconds === 59) {
        setTimeout(() => {
          setMinutes(parseInt(minutes) + 1);
          setSeconds(0);
        }, 1000);
      }
    } else {
      setSeconds(0);
      setMinutes(0);
    }
  }, [seconds, minutes]);

  const startGame = () => {
    setIsGameStarted(true);
    setSeconds(1);
    initializer();
    let winCountElement = document.querySelector(".winCountCon");

    winCountElement.innerHTML = 0;
  };

  const stopGame = () => {
    setIsGameStarted(false);
    // Stop the game logic here
  };

  const renderCards = () => {
    // Render your cards based on the state
    return cards.map((card, index) => (
      <div
        key={index}
        className={`card-container ${card.matched ? "matched" : ""} ${
          card.flipped ? "flipped" : ""
        }`}
        data-card-value={card.name}
        onClick={() => handleCardClick(card)}
      >
        <div className="card-before">?</div>
        <div className="card-after">
          <img src={card.image} className="image" alt={card.name} />
        </div>
      </div>
    ));
  };

  const handleCardClick = (clickedCard) => {
    // Handle card click logic here
    // console.log(clickedCard);
    // console.log(clickedCard.target);
  };

  return (
    <div
      className={`wrapper memoryWrapper ${
        isGameStarted ? "ml-[1.5rem] p-[10px]" : ""
      }`}
    >
      <div className="stats-container">
        <div id="moves-count flex gap-3">
          <div>
            <span>Matched </span>{" "}
            <span className="winCountCon">{winCount} </span>/ {numberOfCards}
          </div>
          <div>
            <span>Moves:</span>{" "}
            <span className="moves-count">{movesCount}</span>
          </div>
        </div>
        <div id="time">
          <span>Time:</span> {`${minutes}:${seconds}`}
        </div>
      </div>
      <div ref={gameContainer} className="game-container"></div>
      <button id="stop" className="hide" onClick={stopGame}>
        Stop Game
      </button>
      <div className={`controls-container ${isGameStarted ? "hide" : ""}`}>
        <p id="result">{result}</p>
        <button id="start" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
