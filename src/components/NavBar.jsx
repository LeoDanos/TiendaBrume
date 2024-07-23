import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from './CartWidget'

import logo from '../assets/brumeB-140x36.png'

export const NavBar = () => {
    return (
<Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={logo} height={32}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#treatments">Tratamientos</Nav.Link>
            <Nav.Link href="#products">Productos</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
      )
}