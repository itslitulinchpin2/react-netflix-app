import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {movieDetailAction} from '../redux/actions/movieDetailAction'
import ClipLoader from "react-spinners/ClipLoader";
import Badge from 'react-bootstrap/Badge';

const MovieDetailPage = () => {
  
  const params=useParams()
  const movieId=params.id;
  console.log(movieId)
  const dispatch=useDispatch();
  
  const getMovieDetail = (movieId) => {
    console.log("이게안돼?")
    dispatch(movieDetailAction.getMovie(movieId))
  }

const {movieReceivedDetail,loading}=useSelector(state=>state.detail)
const genreList=useSelector(state=>state.movie.genreList)
  console.log("로딩값: ",movieReceivedDetail)
  console.log("받아온 디테일값: ",loading)

  useEffect(()=>{
    getMovieDetail(movieId);
  },[])

const baseURL="https://www.themoviedb.org/t/p/w300_and_h450_bestv2"

return (loading ? <ClipLoader
                  color="#ffff"
                  loading={loading}
                  size={150}
                /> : 
  <div className="detail">
    <Container >
      <Row>
        <Col style={{marginTop:"30px"}} >
          {<img style={{marginLeft:"80px"}} src={movieReceivedDetail && baseURL+movieReceivedDetail.backdrop_path} ></img>}
        </Col>
        <Col style={{marginTop:"30px"}}>
          <div>

          {movieReceivedDetail.genres.map(data=>
          <Badge bg="danger">{genreList&&genreList.find(item=>item.id===data.id).name}</Badge>)}

            <h1>{movieReceivedDetail&&movieReceivedDetail.title}</h1>
            <h2>{movieReceivedDetail&&movieReceivedDetail.tagline}</h2>
            <p>{movieReceivedDetail&&movieReceivedDetail.overview}</p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
)
}




export default MovieDetailPage;
