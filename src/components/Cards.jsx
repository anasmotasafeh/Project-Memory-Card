import {Card} from "./Card.jsx"

export function Cards({cards, onClick, harder}){

  return(
    <div className="cards">
      {cards.map(cardInfo => <Card key={cardInfo.id} 
      id={cardInfo.id}  name={harder ? "" :cardInfo.name} url={cardInfo.url}
      onClick={onClick}/>)}
    </div>
  )

}