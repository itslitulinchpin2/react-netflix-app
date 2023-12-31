import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {movieDetailAction} from '../redux/actions/movieDetailAction'
import ClipLoader from "react-spinners/ClipLoader";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import SimilarMovieCard from '../components/similarMovieCard';
import YouTube from 'react-youtube';
import Modal from 'react-bootstrap/Modal';

const MovieDetailPage = () => {
 
  const opts = {
    height: '390',
    width: '460',
    playerVars: {
      autoplay: 1,
    },
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onPlayerReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const [menuState,setmenuState]=useState("Reviews")

  const params=useParams()
  const movieId=params.id;
  console.log(movieId)
  const dispatch=useDispatch();
  
  const getMovieDetail = (movieId) => {
    dispatch(movieDetailAction.getMovie(movieId))
  }

const {movieReceivedDetail,movieReviewDetail,similarMovies,videoDetail,loading}=useSelector(state=>state.detail)
const genreList=useSelector(state=>state.movie.genreList)
const genreLoading=useSelector(state=>state.movie.loading)
 

  useEffect(()=>{
    getMovieDetail(movieId);
  },[movieId])

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
            
            {(videoDetail && videoDetail.results.length === 0) ? 
            
            <p><Button variant="danger">No trailer</Button></p>
    
            :
            <div>
            <p><Button variant="danger" onClick={handleShow}>예고편 보기</Button></p>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{movieReceivedDetail&&movieReceivedDetail.title} Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <YouTube videoId={videoDetail&&videoDetail.results[0].key} opts={opts} onReady={onPlayerReady} />

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal></div> 
          }
            
          </div>
        </Col>
      </Row>
      <Row>
      <div className="mb-2">
        <Button onClick={function(){
          setmenuState("Reviews")
        }}
        variant="primary" size="lg">
          Reviews
        </Button>
        <Button onClick={()=>{
          setmenuState("Similar")
        }} variant="secondary" size="lg">
          Similar films
        </Button>
      </div>
      </Row>
      <Row>
        {menuState=== "Reviews" ? 
        <div>
          {movieReviewDetail.results.map(data=>
            <div>
              <h2>{data.author}</h2>
              <p>{data.content}</p>

            </div>)}
        </div> :
        <div>
          {similarMovies.results.map(data=>
            <SimilarMovieCard data={data}></SimilarMovieCard>)}
        </div>
        
        }
  
      </Row>
    </Container>
    
    </div>
)
}




export default MovieDetailPage;
