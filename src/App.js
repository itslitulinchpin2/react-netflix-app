import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import MovieDetailPage from './pages/movieDetail';
import Movies from './pages/movies';
import Nav from './components/nav';
import NavBar from './components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
//개발과정 총정리
//1. 3개의 페이지 - 홈페이지, movie페이지, movieDetail페이지

//2. 홈페이지에서 배너를 볼 수 있다. 
//3. 3가지 섹션 -popular,rated,upcoming movies
//4. 각 영화에 마우스를 올리면 제목,장르,점수,청불여부를 볼 수 있다.
//5. 영화목록을 슬라이드로 넘길 수 있다.

//6. 영화 디테일 페이지에서 포스터,제목,줄거리,점수,인기도,청불여부,예산,이익,러닝타임 등등
//7. trailer를 누르면 예고편을 볼 수 있다.
//8. 영화의 리뷰를 볼 수 있다.
//9. 관련 추천 영화를 볼 수 있다.

//10. 영화 검색을 할 수 있다.
//11. 영화 정렬을 할 수 있다.
//12. 영화 필터링을 할 수 있다.
function App() {

 

  return (
    <div className="main"> 
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="movies" element={<Movies></Movies>}></Route>
      <Route path="/movies/:id" element={<MovieDetailPage></MovieDetailPage>}></Route>
    </Routes>
    </div>
  );
}

export default App;
