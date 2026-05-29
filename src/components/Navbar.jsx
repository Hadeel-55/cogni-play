import { Navbar, Nav, Button, Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>HA</Navbar.Brand>
        <h1>Hadil Alchamma
            <p style={{fontSize:'12px' ,color:'#00000094'}}>React Advanced Hooks-Game-Router-LocalStorage</p>
        </h1>
       
        <Navbar.Toggle aria-colcount="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/play">Play</Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
          </Nav>

          <Button className="me-2">Light</Button>
          <Button>≡</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
