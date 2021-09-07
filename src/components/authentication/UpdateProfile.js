import React, { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const UpdateProfile = () => {
    const emailRef = useRef();
   // const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword, updateUserName } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
		// if (nameRef.current.value) {
		// promises.push(updateUserName(nameRef.current.value));
		// }
		// <Form.Group id="name">
		// <Form.Label>User Name</Form.Label>
		// <Form.Control type="text" ref={nameRef} required 
		// defaultValue={currentUser.displayName}
		// />
		// </Form.Group>
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
          .then(() => {
            history.push("/")
          })
            .catch(() => {
              setError("Failed to update account")
          })
            .finally(() => {
              setLoading(false)
          })
    }

    return (
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required 
                    defaultValue={currentUser.email}
                />
              </Form.Group>
              
              <Form.Group id="password">
                <Form.Label>password</Form.Label>
                <Form.Control 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Leave blank to keep the same"
                    />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control 
                    type="password" 
                    ref={passwordConfirmRef} 
                    placeholder="Leave blank to keep the same"
                    />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">Update</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">cancel</Link>
        </div>
      </CenteredContainer>
    )
}

export default UpdateProfile
