import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from './CartWidget'

import logo from '../assets/brumeB-140x36.png'

export const NavBar = () => {
    return (
<Navbar style={{ backgroundColor: '#444' }} data-bs-theme="dark" >
        <Container>
          <Navbar.Brand as={NavLink} to="/"><img src={logo} height={32}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Servicios</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Cosmetologia">Cosmetología</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Manicuria">Manicuría</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
      )
}