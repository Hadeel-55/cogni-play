import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
function AppNavbar() {
  const {handleChengeTheme, handleIsDark ,isDark,theme ,textTheme,finalBlurCard,finalColor,btnTheme }=useContext(ThemeContext);


  return (
    <Navbar  expand="lg " style={{ 
backgroundColor: "transparent"
    }}>
    <Container>
        <Navbar.Brand
          style={{...btnTheme,
            color:finalColor,
            padding: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
            transition:'all 0.3s ease-in'
          }}
        >
          HA
        </Navbar.Brand>
        <h1>
          Hadil Alchamma
          <p style={{ fontSize: "12px", color: "#00000094" ,color:finalColor,transition:'all 0.3s ease-in' }}>
            React Advanced Hooks-Game-Router-LocalStorage
          </p>
        </h1>

        <Navbar.Toggle aria-colcount="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" >
            <Nav.Link style={{color:finalColor,}} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link style={{color:finalColor,}} as={Link} to="/play">
              Play
            </Nav.Link>
            <Nav.Link style={{color:finalColor,}} as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>

          <Button style={{...btnTheme,
             color:finalColor,
             transition:'all 0.3s ease-in'
          }} className="me-2 fw-bold" onClick={handleIsDark}> {isDark ? "Light" : "Dark"}</Button>
          <input type="color" onChange={ handleChengeTheme} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
