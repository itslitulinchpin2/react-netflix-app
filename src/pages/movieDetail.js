import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {movieDetailAction} from '../redux/actions/movieDetailAction'
import ClipLoader from "react-spinners/ClipLoader";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const MovieDetailPage = () => {
  
  const params=useParams()
  const movieId=params.id;
  console.log(movieId)
  const dispatch=useDispatch();
  
  const getMovieDetail = (movieId) => {
    console.log("이게안돼?")
    dispatch(movieDetailAction.getMovie(movieId))
  }

const {movieReceivedDetail,movieReviewDetail,loading}=useSelector(state=>state.detail)
const genreList=useSelector(state=>state.movie.genreList)
const genreLoading=useSelector(state=>state.movie.loading)
  console.log("디테일 로딩값: ",loading)
  console.log("받아온 무비 디테일값: ",movieReceivedDetail)
  console.log("받아온 무비 리뷰값: ",movieReviewDetail)
  console.log("장르 로딩값: ", genreLoading);
  console.log("받아온 장르값: ",genreList)
 

  useEffect(()=>{
    getMovieDetail(movieId);
  },[])

const baseURL="https://www.themoviedb.org/t/p/w300_and_h450_bestv2"

return ((loading||genreLoading) ? <ClipLoader
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

          {movieReceivedDetail&&movieReceivedDetail.genres.map(data=>
          <Badge bg="danger">{genreList&&genreList.find(item=>item.id===data.id).name}</Badge>)}

            <h1>{movieReceivedDetail&&movieReceivedDetail.title}</h1>
            <h2>{movieReceivedDetail&&movieReceivedDetail.tagline}</h2>
            <br></br>
            <p>{movieReceivedDetail&&movieReceivedDetail.overview}</p>
            <br></br>
            <p><Badge bg="danger">예산</Badge> ${movieReceivedDetail&&movieReceivedDetail.budget}</p>
            <p><Badge bg="danger">러닝타임</Badge> {movieReceivedDetail&&movieReceivedDetail.runtime}분</p>
            <p><Badge bg="danger">IMDB</Badge> {movieReceivedDetail&&movieReceivedDetail.vote_average}</p>
          </div>
        </Col>
      </Row>
      <Row>
      <div className="mb-2">
        <Button variant="primary" size="lg">
          Reviews
        </Button>{' '}
        <Button variant="secondary" size="lg">
          Similar films
        </Button>
      </div>
      </Row>
      <Row>
        hi
      </Row>
    </Container>
    </div>
)
}




export default MovieDetailPage;
