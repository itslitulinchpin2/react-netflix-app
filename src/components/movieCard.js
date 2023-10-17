import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({item}) => {
  const navigate = useNavigate();
   
    const genreList=useSelector(state=>state.movie.genreList)
    //console.log("장르리스트 받아오기: ",genreList)
  
  //   let idList=[];
  //   for(let i=0;i<genreList.length;i++){
  //    for(let j=0;j<item.genre_ids.length;j++){
  //     if (item.genre_ids[j]==genreList[i].id){
  //       idList.push(genreList[i].name)
  //     }
  //   }
  // }
  // console.log("장르 글로 나오나? ", idList);

  
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
