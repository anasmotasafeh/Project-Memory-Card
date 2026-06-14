
export function Card({id, name, url, onClick}) {

  return (
    <div className="card" onClick={() => onClick(id)}>
      <h2>{name}</h2>
      <img src={url} />
    </div>
  )
}