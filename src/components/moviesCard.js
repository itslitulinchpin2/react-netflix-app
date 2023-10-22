import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
const MoviesCard = ({movie}) => {
    const genreList=useSelector(state=>state.movie.genreList)
    const navigate = useNavigate();
  return (
    <div className="movies-card"
        style={{backgroundImage:
            "url("
            +`https://www.themoviedb.org/t/p/w355_and_h200_face${movie.backdrop_path}`
            +
            ")", height:"200px"}}
            onClick={()=>{navigate(`/movies/${movie.id}`)}}>
            
            
            <div className="movies-contents">
                <h3>{movie.title}</h3>
                
                <div className="movies-overlay">
                    <div>
                    imdb score : {movie.vote_average}
                    </div>
                    <div>
                    {movie.genre_ids.map(id=>
                    <Badge bg="danger">{genreList.find(item=>item.id===id).name}</Badge>)}
                    </div>
                </div>
            </div>
    </div>
    
    
  )
}

export default MoviesCard
