import React from 'react'
import { useEffect } from 'react';
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch,useSelector } from 'react-redux';
import Banner from '../components/banner';
import MovieSlide from '../components/movieSlide';
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from 'react';
const Home = () => {

  const dispatch=useDispatch();
  const {popularMovies,topRatedMovies,upcomingMovies,genreList,loading}=useSelector(state=>state.movie)
  //console.log("Home에 진짜 왔나? ",popularMovies)
  
  useEffect(()=>{
    dispatch(movieAction.getMovies())
  },[])

//loading이 true이면 loading spinner 보여줌.
//loading이 false이면 data를 보여줌
//true일때? 데이터 도착 전.
//false? 데이터 도착 이후 또는 에러가 났을때.
//로딩 값은 리듀서 안에 추가해 주자.



  if (loading){
    return (
      <ClipLoader
        color="#ffff"
        loading={loading}
        size={150}
      />

    )

  }
  else return (
    <div className="home">
      <Banner movie={popularMovies&&popularMovies.results[0]}></Banner>
      <h1>Popular Movies</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top Rated Movies</h1>
      <MovieSlide movies={topRatedMovies}/>
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies}/>
    </div>
  )
}

export default Home;
