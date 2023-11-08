import React from 'react'
import { useNavigate } from 'react-router-dom'
const SimilarMovieCard = ({data}) => {
    const navigate=useNavigate();  
  return (
    <div className='similar-movie-name'
        onClick={()=>{
            navigate(`/movies/${data.id}`)
        }}>
      {data.title}
    </div>
  )
}

export default SimilarMovieCard
