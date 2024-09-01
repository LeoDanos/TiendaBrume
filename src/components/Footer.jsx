import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

import logo from '../assets/brumeN-101x32.png';
import facebookIcon from '../assets/facebook_c.png';
import instagramIcon from '../assets/instagram_c.png';
import tiktokIcon from '../assets/tiktok_c.png';

export const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', position: 'relative', bottom: '0', width: '100%' }}>
            <Navbar>
                <Container>
                    <Navbar.Brand className="footFix" as={NavLink} to="/"><img src={logo} height={32} alt="Logo" /></Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link as={NavLink} to="/">Servicios</Nav.Link>
                        <Nav.Link as={NavLink} to="/category/Cosmetologia">Cosmetología</Nav.Link>
                        <Nav.Link as={NavLink} to="/category/Manicuria">Manicuría</Nav.Link>
                    </Nav>
                    <div className="d-flex footFix">
                        <a href="https://www.facebook.com/brume.skincare" target="_blank">
                            <img src={facebookIcon} alt="Facebook" height={18} style={{ marginRight: '10px' }} />
                        </a>
                        <a href="https://www.instagram.com/brume.skincare" target="_blank">
                            <img src={instagramIcon} alt="Instagram" height={18} style={{ marginRight: '10px' }} />
                        </a>
                        <a href="https://www.tiktok.com/@brume.skincare" target="_blank">
                            <img src={tiktokIcon} alt="TikTok" height={18} />
                        </a>
                    </div>
                </Container>
            </Navbar>
            <div style={{ textAlign: 'center', paddingTop: '10px', fontSize: '12px', color: '#6c757d' }}>
                © 2024 Brume Skincare. Diseñado por <a href="https://www.linkedin.com/in/leonardodanos/" target="_blank"><b>Leonardo Danos</b></a>.
            </div>
        </footer>
    );
}
