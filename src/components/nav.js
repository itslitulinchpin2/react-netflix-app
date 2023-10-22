import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const navigate=useNavigate();
  const [query,setQuery] = useState();
    

  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark" >
      <Container fluid>
        <Navbar.Brand href="/"><img width={100} alt ="" src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/movies" className="nav-item">Movies</Link>
          
          </Nav>
          <Form className="d-flex" 
              onSubmit={function(e){
              e.preventDefault();
              navigate(`/movies?query=${query}`)
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={
                function(e){
                  e.preventDefault();
                  setQuery(e.target.value)
                  //console.log(query);
                }
            } 
            />
            <Button type="submit" variant="danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar;
