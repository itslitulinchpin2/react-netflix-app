import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({item}) => {
  const navigate = useNavigate();
   
    const genreList=useSelector(state=>state.movie.genreList)
  
  return (
    <div 
    className="card"
    style={{backgroundImage:
    "url("
    +`https://www.themoviedb.org/t/p/w355_and_h200_face${item.poster_path}`
    +
    ")", height:"200px"}}
    onClick={()=>{navigate(`/movies/${item.id}`)}}>
    <div className="overlay">
      <div>
        <h1>{item.title}</h1>
        {item.genre_ids.map(id=>
          <Badge bg="danger">{genreList.find(item=>item.id===id).name}</Badge>)}
      </div>
      <div>
        <span>{item.vote_average+" "}</span>
        <span>{item.adult ?"청불":"Under 18" }</span>
      </div>
    </div>
    </div>
  )
}

export default MovieCard
