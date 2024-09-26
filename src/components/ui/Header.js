import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({title}) {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className='fw-bold text-success' href="#home">{title}</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
export default Header;