import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import MoviesCard from '../components/moviesCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';

const Movies = () => {
  const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(movieAction.getMovies())
    },[])
    const movieList = useSelector(state=>state.movie.popularMovies.results)
    
    console.log(movieList);

  return (

    <div>
      <div>
        Sort
      </div>
      <div>
        Filter
      </div>
    <Container>
      <Row>
        {movieList&&movieList.map(data=>
        <Col lg={4}>
          <MoviesCard movie={data}>
          </MoviesCard>
        </Col>)}
       
        
      </Row>
    </Container>
    </div>
    
  )
}

export default Movies;
