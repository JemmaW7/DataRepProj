import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavigationBar = () => {
  return (
        <Navbar bg="warning">
          <Container>
            <Navbar.Brand href="/" class="title">FurEver</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create">Put a dog up for adoption</Nav.Link>
              <Nav.Link href="/read">Pets</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;