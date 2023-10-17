import React from 'react'
import { useEffect } from 'react';
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch,useSelector } from 'react-redux';
import Banner from '../components/banner';

const Home = () => {

  const dispatch=useDispatch();
  const {popularMovies,topRatedMovies,upcomingMovies}=useSelector(state=>state.movie)
  //console.log("Home에 진짜 왔나? ",popularMovies)
  
  useEffect(()=>{
    dispatch(movieAction.getMovies())
  },[])
  
  return (
    <div>
      {popularMovies.results && <Banner movie={popularMovies.results[0]}></Banner>}
    </div>
  )
}

export default Home;
