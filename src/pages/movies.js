import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import MoviesCard from '../components/moviesCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import  { useState } from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";



const Movies = () => {
  const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(movieAction.getMovies())
    },[])
    const movieList = useSelector(state=>state.movie.popularMovies.results)
    // const allMovieList = useSelector(state=>state.movie.allMovieList);
    // console.log("올무비리스트: ",allMovieList)
   

    const[activePage,setActivePage]=useState(1);
    const handlePageChange = (pageNumber)=>{
      console.log(`active page is ${pageNumber}`);
      setActivePage(pageNumber);
    }

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
    <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
    </div>
    
  )
}


export default Movies;
