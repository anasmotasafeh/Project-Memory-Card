import { arabicFormatter } from '../utality';

export function Scoreboard({score, bestScore}){

  return(
    <div className="scoreboard">
      <h1>نقاطك: {arabicFormatter.format(score)}</h1>
      <h1>اعلى نقاط: {arabicFormatter.format(bestScore)}</h1>
    </div>
  )
}