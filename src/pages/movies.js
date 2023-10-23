import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import MoviesCard from '../components/moviesCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import  { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

import Pagination from "react-js-pagination";
//import { useLocation } from "react-router";
import { movieSearch } from '../redux/actions/movieSearch';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  //기본 문자열은 null로 초기화되어있음.
  const navigate=useNavigate();
  let [query,setQuery] = useSearchParams()
  console.log("쿼리값: ",query.get('query'))
  let searchString=query.get('query')

  const [movieList,setMovieList] = useState(useSelector(state=>state.movie.topRatedMovies.results))
  const originalLoading=useSelector(state=>state.movie.loading)
  const searchedLoading=useSelector(state=>state.searched.loading);
  let newList=useSelector(state=>state.searched.searchedMovieList.results)
  console.log("무비리스트: ",movieList)
  console.log("뉴리스트: ",newList);
  
  console.log("오리지널로딩: ",originalLoading);
  console.log("서치드로딩: ",searchedLoading);

  const [toggleName,setToggleName]=useState("Sorted by nothing");
  const dispatch = useDispatch();

  const sortFilms = (sortby,query) =>{
    if(query===false){
      console.log("쿼리없을때")
      //이때는 무비리스트를 정렬
    if(sortby==="Sorted by popularity"){
      let sortedbyPopularList=[...movieList];
      sortedbyPopularList.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return -1;
        }
        if (a.popularity < b.popularity) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      
      setMovieList(sortedbyPopularList);
    } else if (sortby==="Sorted by IMDB SCORE"){
      let sortedbyIMDBList=[...movieList];
      sortedbyIMDBList.sort(function (a, b) {
        if (a.vote_average > b.vote_average) {
          return -1;
        }
        if (a.vote_average < b.vote_average) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      
      setMovieList(sortedbyIMDBList);

    }
  } 
  /*else if (query===true){
    //이때는 뉴리스트를 정렬
    console.log("쿼리있을때")
    if(sortby==="Sorted by popularity"){
      let sortedbyPopularList=[...newList];
      sortedbyPopularList.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return -1;
        }
        if (a.popularity < b.popularity) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });  
      newList=sortedbyPopularList;
      console.log("정렬된 뉴리스트: ",newList)
    } else if (sortby==="Sorted by IMDB SCORE"){
      let sortedbyIMDBList=[...newList];
      sortedbyIMDBList.sort(function (a, b) {
        if (a.vote_average > b.vote_average) {
          return -1;
        }
        if (a.vote_average < b.vote_average) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      
      newList=sortedbyIMDBList
      console.log("정렬된 뉴리스트: ",newList)
    }
  }*/
}

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
    <DropdownButton id="dropdown-basic-button" title={toggleName} >
      <Dropdown.Item onClick = {function(e){
        
        e.preventDefault();
        
        sortFilms(e.target.id,false)
        
        setToggleName(e.target.id)
      }
      }
       id="Sorted by popularity">popularity</Dropdown.Item>
      <Dropdown.Item 
         onClick = {function(e){
          e.preventDefault();
          
          sortFilms(e.target.id,false)
          
          setToggleName(e.target.id)
        }
        }
       id="Sorted by IMDB SCORE">IMDB SCORE</Dropdown.Item>
    </DropdownButton>
      
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
    
      We found {newList&&newList.length} results
        
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
