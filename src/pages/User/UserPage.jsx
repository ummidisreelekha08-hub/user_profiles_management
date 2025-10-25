import { useState } from 'react';
import { Row, Col, Button, Table, Card, Offcanvas, Form } from 'react-bootstrap';
import { Eye, Trash, PencilSquare } from 'react-bootstrap-icons';
import { useUser } from '../../context/UserContext';

const defaultFormState = {
    name: '',
    email: '',
    contact: '',
};

export default function UserPage() {
    const {
        users,
        addUser,
        updateUser,
        deleteUser,
        currentUser
    } = useUser();

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('add');
    const [formData, setFormData] = useState(defaultFormState);
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShow(false);
        setFormData(defaultFormState);
        setMode('add');
    };

    const handleShowAdd = () => {
        setMode('add');
        setFormData(defaultFormState);
        setShow(true);
    };

   

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in at least Name and E-mail.');
            return;
        }

        if (mode === 'add') {
            addUser({
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                role: 'User',
                status: 'Active',
                lastActive: new Date().toISOString()
            });

        } else if (mode === 'edit') {
            updateUser({
                ...currentUser,
                ...formData
            });
        }

        handleClose();
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(userId);
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem' , height: '100vh' }}>
            <Card className="border-1">
                <Card.Body className="p-4">
                    <Row className="align-items-center mb-4 bg-#F5F6F7 ">
                        <Col>
                            <h4 className="mb-0 fw-bold">Users</h4>
                        </Col>
                        <Col className="text-end">
                            <Button
                                onClick={handleShowAdd}
                                style={{ backgroundColor: '#7367f0', borderColor: '#7367f0' }}
                            >
                                + Add user
                            </Button>
                        </Col>
                    </Row>

                    <Table responsive="sm" className="align-middle">
                        <thead className="user-table-header">
                            <tr>
                                <th className="fw-normal">Sr. No</th>
                                <th className="fw-normal">User name</th>
                                <th className="fw-normal">E-mail</th>
                                <th className="fw-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted py-3">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="link" className="text-secondary p-0 me-2" title="View">
                                                <Eye size={20} />
                                            </Button>
                                            <Button
                                                variant="link"
                                                className="text-secondary p-0 me-2"
                                                title="Delete"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                style={{ width: '700px', display: 'flex', flexDirection: 'column' }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title as="div">
                        <span style={{
                            padding: '0.3rem 0.8rem',
                            borderRadius: '5px',
                            fontWeight: '600',
                            fontSize: '1.4rem',
                        }}>
                            {mode === 'add' ? 'Add User' : 'Edit User'}
                        </span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                
                <Offcanvas.Body style={{ flexGrow: 1 }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name of the user</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type here"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Type here"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type here"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Offcanvas.Body>

                {/* Sticky Footer for Buttons */}
                <div className="text-end p-3 border-top">
                    <Button
                        variant="light"
                        className="me-2"
                        onClick={handleClose}
                        style={{ backgroundColor: '#f8f7fa', color: '#7367f0', borderColor: '#f8f7fa', fontWeight: '600' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        style={{ backgroundColor: '#7367f0', borderColor: '#7367f0', fontWeight: '600' }}
                    >
                        {mode === 'add' ? 'Add' : 'Save Changes'}
                    </Button>
                </div>
            </Offcanvas>
        </div>
    );
};