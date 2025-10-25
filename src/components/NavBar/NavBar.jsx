import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { QuestionCircle, Bell, PersonFill } from 'react-bootstrap-icons';

export default function NavBar() {
    const logoStyle = {
        border: '2px solid black',
        padding: '4px 12px',
        textAlign: 'center',
        lineHeight: 1.1,
        color: 'black'
    };

    const avatarStyle = {
              backgroundColor: '#f0eefe',
        color: '#ab47bc',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    };

    return (
        <>
        
            <Navbar bg="white" expand="lg" className="border-bottom">
                <Container fluid className="px-3">
                    
                    <div className="d-flex flex-column align-items-center" style={{ gap: '0.5rem' }}>
                    <Navbar.Brand as={Link} to="/" style={logoStyle} className="me-0">
                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>LOGO</div>
                    </Navbar.Brand>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>ESTD 2025</div>
                    </div>
                    
                    <Nav className="ms-auto d-flex flex-row align-items-center" style={{ gap: '1.25rem' }}>
                        <Nav.Link as={Link} to="/support" className="text-dark p-0">
                            <QuestionCircle size={24} />
                        </Nav.Link>
                        <Nav.Link as={Link} to="/notifications" className="text-dark p-0">
                            <Bell size={24} />
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile" className="p-0">
                            <div style={avatarStyle}>
                                <PersonFill size={22} />
                            </div>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};