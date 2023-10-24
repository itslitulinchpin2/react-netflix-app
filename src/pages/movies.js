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
  let searchString=(query.get('query'));
  console.log("쿼리값: ",query.get('query'))

const please = (string)=>{

  dispatch(movieSearch.searchMovies(string)) 
  //setFinalList(newList)
  console.log("작업완료")

}
  const newList=useSelector(state=>state.searched.searchedMovieList.results)
  const [movieList,setMovieList] = useState(useSelector(state=>state.movie.topRatedMovies.results))
  const originalLoading=useSelector(state=>state.movie.loading)
  const searchedLoading=useSelector(state=>state.searched.loading);
  const genreList=useSelector(state=>state.movie.genreList);
  console.log("장르리스트: ",genreList)
  
  
  //let newList=useSelector(state=>state.searched.searchedMovieList.results)
  //const [finalList,setFinalList] = useState()
  console.log("메인화면 무비리스트: ",movieList)
  console.log("메인화면 뉴리스트: ",newList);
 //console.log("메인화면 파이널리스트: ",finalList)
  

  const [toggleName,setToggleName]=useState("Sorted by nothing");
  const [filter,setFilter]=useState("Filter by genre")
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
  else if (query===true){
    //이때는 뉴리스트를 정렬
    //console.log("쿼리있을때")
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
      //setNewList(sortedbyPopularList);
      //console.log("정렬된 뉴리스트: ",newList)
      
      //setFinalList(newList)
      //console.log("파이널리스트: ",finalList)
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
      
      //setNewList(sortedbyIMDBList);
      //console.log("정렬된 뉴리스트: ",newList)
      
      //setFinalList(newList)
      //console.log("파이널리스트: ",finalList)

    }
  }
}
  const filterFunc = (genreId) => {
    console.log(genreId);
    let filterList=[];
    for (let i=0;i<movieList.length;i++){
      console.log("반복문 들어가긴 하냐?");
     for(let j=0;j<movieList[i].genre_ids.length;j++){
      console.log("두번째 반복문 들어갔을때 장르아이디: ",movieList[i].genre_ids[j])
      if (movieList[i].genre_ids[j]==genreId){
        console.log("지금 무비의 장르아이디: ",movieList[i].genre_ids[j])
        filterList.push(movieList[i]);
        console.log("필터리스트에 다음을 추가: ",movieList[i])
        break;
      }
     } 
    }
    if(filterList.length===0){
      alert("필터 결과가 없어 홈으로 돌아갑니다.")
      navigate("/")
      }
    console.log("필터리스트: ",filterList);
    setMovieList(filterList);
  }

    // useEffect(()=>{
    //   console.log("항상 실행되나?")
    //   if(searchString===null||undefined||""){
    //     console.log("쿼리 없을때 화면이 렌더링 됨.")
    //     dispatch(movieAction.getMovies())
    //   } else {
    //     console.log("쿼리가 있는 경우에만 렌더링 됨.")
    //     dispatch(movieSearch.searchMovies(searchString));
    //   }
    // },[searchString])

    // const Ssibal = () => {
    //   dispatch(movieSearch.searchMovies(searchString))
    //   setMovieList(useSelector(state=>state.searched.searchedMovieList.results))
    //   console.log("되나? ")
    // }
    useEffect(()=>{
      console.log("여기는 실행이 된다.")
      dispatch(movieAction.getMovies());
     
      if((query.get('query')!== null) ||(query.get('query')!== undefined) || (query.get('query')!=="")||(query.get('query')!=="undefined")){
        console.log("이아이를 이 쿼리스트링으로 실행해야지: ",query.get('query'))
      //dispatch(movieSearch.searchMovies(query.get('query'))) 
      const string=query.get('query')
      please(string)
      }
    },[query])

    // useEffect(()=>{
    //   console.log("유즈이펙트 내부 현재뉴리스트: ",newList);
    // },[newList])

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
      <DropdownButton id="dropdown-basic-button" title={filter} >
      {genreList&&genreList.map(genre=>
          <Dropdown.Item onClick = {function(e){
            e.preventDefault();
            filterFunc(e.target.id)
          }
          }
           id={genre.id}>{genre.name}</Dropdown.Item>
          )}
    </DropdownButton>
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
} else {
  return(
    <div>
          
          <div>
        
          We found {newList&&newList.length} results
    
          <DropdownButton id="dropdown-basic-button" title={toggleName} >
          <Dropdown.Item onClick = {function(e){
            
            e.preventDefault();
            
            sortFilms(e.target.id,true)
            
            setToggleName(e.target.id)
          }
          }
           id="Sorted by popularity">popularity</Dropdown.Item>
          <Dropdown.Item 
             onClick = {function(e){
              e.preventDefault();
              
              sortFilms(e.target.id,true)
              
              setToggleName(e.target.id)
            }
            }
           id="Sorted by IMDB SCORE">IMDB SCORE</Dropdown.Item>
        </DropdownButton>
    
    
            
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
