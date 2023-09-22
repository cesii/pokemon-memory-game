import { useState, useEffect } from "react";
import Card from "./components/Card";

const cardList = [
  { path: "/img/card-1.png", matched: false },
  { path: "/img/card-2.png", matched: false },
  { path: "/img/card-3.png", matched: false },
  { path: "/img/card-4.png", matched: false },
  { path: "/img/card-5.png", matched: false },
  { path: "/img/card-6.png", matched: false },
  { path: "/img/card-7.png", matched: false },
  { path: "/img/card-8.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const prepareCards = () => {
    // random sıralama ve random id
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({...card, id: Math.random()}));
    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);

      if (selectedOne.path === selectedTwo.path) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setSelectedOne(null);
        setSelectedTwo(null);
        setDisabled(false);
        setScore(prevScore => prevScore + 1);
      } else {
        setTimeout(() => {
          setSelectedOne(null);
          setSelectedTwo(null);
          setDisabled(false);
          setScore(prevScore => prevScore + 1);
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  return (
    <div className="container" style={{backgroundImage: 'url(/img/pokeball.png)'}}>
    <div className="app">
      <img className="logo" src="/img/pokemon-logo.svg" alt="pokemon-logo" />
      <h1>memory game</h1>
      <button onClick={prepareCards}>Play the Game</button>
      <p>Score: {score}</p>

      <div className="cards">
        {cards.map((card) => (
          <Card 
            card={card} 
            key={card.id} 
            handleSelected={handleSelected} 
            disabled={disabled} 
            rotated={card === selectedOne || card === selectedTwo || card.matched}
            />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
