import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>MyCommerce</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/Cart" className="nav-link">
              Cart
            </a>
            <a href="/Signin" className="nav-link">
              Sign
            </a>
          </Nav>
        </Navbar>
      </header>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App;
