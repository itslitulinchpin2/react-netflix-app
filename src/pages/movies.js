import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import MoviesCard from '../components/moviesCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import  { useState } from 'react';

import Pagination from "react-js-pagination";
//import { useLocation } from "react-router";
import { movieSearch } from '../redux/actions/movieSearch';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  //기본 문자열은 null로 초기화되어있음.

  let [query,setQuery] = useSearchParams()
  console.log("쿼리값: ",query.get('query'))
  let searchString=query.get('query')

  const [movieList,setMovieList] = useState(useSelector(state=>state.movie.popularMovies.results))
  const originalLoading=useSelector(state=>state.movie.loading)
  const searchedLoading=useSelector(state=>state.searched.loading);
 
  let newList=useSelector(state=>state.searched.searchedMovieList.results)
  console.log("뉴리스트: ",newList);
  
  console.log("오리지널로딩: ",originalLoading);
  console.log("서치드로딩: ",searchedLoading);

  const dispatch = useDispatch();

    useEffect(()=>{
      console.log("아무것도 없는 화면이 렌더링 됨.")
      if(searchString===null||undefined||""){
        dispatch(movieAction.getMovies())
      } else {
        console.log("쿼리가 있는 경우에만 렌더링 됨.")
        dispatch(movieSearch.searchMovies(searchString));
      }
    },[searchString])

if (originalLoading||searchedLoading) {
  return <div>로딩중입니다.</div>
} else if (query.get('query')===null||undefined||""){
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
    {/* <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        /> */}
    </div>
    
  )
} 

else {

  return(
<div>
      
      <div>
        Sort
      </div>
      <div>
        Filter
      </div>
    <Container>
      <Row>
        {newList&&newList.map(data=>
        <Col lg={4}>
          <MoviesCard movie={data}>
          </MoviesCard>
        </Col>)}
       
        
      </Row>
    </Container>
</div>


  )


}
}


export default Movies;
