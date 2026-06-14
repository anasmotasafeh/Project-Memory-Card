import './App.css'
import { useState } from 'react'
import { Cards } from './components/Cards'
import { Scoreboard } from './components/Scoreboard';
import { arabicFormatter } from './utality';

const names = [
  "تيتان",
  "ديون",
  "المريخ",
  "المشتري",
  "زحل",
  "عطارد",
  "الزهرة",
  "ميراندا",
  "أوبيرون",
  "ديموس",
  "سديم",
  "بلوتو",
];

function App() {

  const cardsInfo = names.map((name, index) => ({
    id: index,
    name,
    url: `https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`,
  }));

  const [cards, setCards] = useState(cardsInfo);
  const [clickedCardsIds, setClickedCardsIds] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const score = clickedCardsIds.length;
  const [bestScore, setBestScore] = useState(0)
  const [won, setWon] = useState(false)


  function shuffleCards(){
  const indexies = []
  let nextIndex;
  const newCards = []
  while(newCards.length < cards.length){
    do{
      nextIndex = Math.floor(Math.random() * cards.length)
    } while (indexies.includes(nextIndex))
    indexies.push(nextIndex);
    newCards.push(cards[nextIndex]);
  }
  setCards(newCards);

  }

  function handleClick(id){
    if(clickedCardsIds.includes(id))
    {
      setGameOver(true)
    } else{
      setClickedCardsIds([...clickedCardsIds, id])
      const nextScore = clickedCardsIds.length + 1;
      if (nextScore > bestScore) setBestScore(nextScore)
      if (nextScore === cards.length){
        setWon(true);
        setGameOver(true)
      }
      shuffleCards()
    }
  }

  function restartGame(){
    setClickedCardsIds([]);
    setGameOver(false);
    setWon(false)
    shuffleCards()

  }

  return (
    <>
      {gameOver 
      ?
      won
      ?
      <div>
        <h1>أنت رائع، لقد فزت</h1>
        <h2>{arabicFormatter.format(score)}/{arabicFormatter.format(cards.length)}</h2>
        <div className='button' onClick={restartGame}>العب مرة اخرى</div>
      </div>
      :
      <div>
        <h1>اعلى نقاط: {arabicFormatter.format(bestScore)}</h1>
        <h1>نقاطك: {arabicFormatter.format(score)}</h1>
        <h2>{arabicFormatter.format(cards.length)}/{arabicFormatter.format(score)}</h2>
        <div className='button' onClick={restartGame}>اعد المحاولة</div>
      </div> 
      : 
      <div>
        <h4>اضغط على الصور لكسب نقاط، لكن لا تضغط على صورة اكثر من مره.</h4>
        <Scoreboard score={score} bestScore={bestScore}/>
        <Cards cards={cards} setGameOver={setGameOver} onClick={handleClick}/>
  
      </div>}
    </>
  )
}
export default App
