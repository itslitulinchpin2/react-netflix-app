import React from 'react'

const MovieCard = ({item}) => {
    console.log("아이템값:", item)
  return (
    <div 
    className="card"
    style={{backgroundImage:
    "url("
    +`https://www.themoviedb.org/t/p/w355_and_h200_face${item.poster_path}`
    +
    ")", height:"200px"}}>
    {item.title}
    </div>
  )
}

export default MovieCard
