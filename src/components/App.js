import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { myContext } from "../index";
import Welcome from "./Welcome";
import ConnectionController from "./Controller/ConnectionController";
import OrdersController from "./Controller/OrdersController";
import CatalogController from "./Controller/CatalogController";
import RegisterController from "./Controller/RegisterController";

export default function App(){

  const [user, setUser] = useState(null);


  function userName() {
    return user !== null ? `${user.name}` : "";
  }

  return (
    <myContext.Provider value={[user, setUser]}>
      <header className="d-flex justify-content-center align-items-center">
        <h1>Portail commande de verre</h1>
      </header>

      <BrowserRouter>

        <Navbar
          className='mb-5'
          collapseOnSelect="true"
          bg='black'
          variant='dark'
          sticky='top'
          expand='md'
        >
          <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav>
                <Nav.Link as={Link} eventKey='1' to="/welcome">
                  <i className='fa fa-home me-2 navbar-icon'></i>
                  Accueil 
                </Nav.Link>
                <Nav.Link as={Link} eventKey='2' to="/orders" /* hidden={user === null || user.role !== "OPTICIAN"} */>
                  <i className='fa fa-eye me-2  navbar-icon'></i>
                  Commander
                </Nav.Link>
                <Nav.Link as={Link} eventKey='4' to="/catalog" hidden={user === null || user.role !== "ADMIN"}>
                  <i className='fa fa-table-list me-2 navbar-icon'></i>
                  Catalogue
                </Nav.Link>
                <Nav.Link as={Link} eventKey='4' to="/connection" hidden={user !== null}>
                  <i className='fa fa-key me-2 navbar-icon'></i>
                  Connexion
                </Nav.Link>
                <Nav.Link as={Link} eventKey='5' to="/register" hidden={user !== null}>
                  <i className='fa fa-user-plus me-2 navbar-icon'></i>
                  Inscription
                </Nav.Link>
                <Nav.Link as={Link} eventKey='6' to="/welcome" hidden={user === null} onClick={() => {
                  setUser(null);
                }}>
                  <i className='fa fa-unlock me-2 navbar-icon'></i>
                  Déconnexion
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Brand className='fst-italic'>{userName()}</Navbar.Brand>

          </Container>
        </Navbar>

        <article>
          <Container>
            <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route exact path="/welcome" element={<Welcome />} />
              <Route exact path="/connection" element={<ConnectionController />} />
              <Route exact path="/register" element={<RegisterController />} />
              <Route exact path="/orders" element={<OrdersController/>} />
              <Route exact path="/catalog" element={<CatalogController/>} />
            </Routes>
          </Container>
        </article>
      </BrowserRouter>

      <footer className="d-flex justify-content-center align-items-center">
        <h6>Portail commande de verre - 2025</h6>
      </footer>

    </myContext.Provider>
  );
};