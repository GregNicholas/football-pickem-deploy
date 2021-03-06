import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        setError('');

        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <>
          <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p><strong>Name: </strong> {currentUser.displayName}</p>
            <p><strong>Email: </strong> {currentUser.email}</p>
            <Link to="/update-profile">
                Update Profile
            </Link>
            <Link to="/make-picks" className="btn w-100 mt-3" style={{backgroundColor: "#4F2683", color: "#FFC62F", fontWeight: "bold"}}>
                Vikings Fans Make Picks
            </Link>
            <Link to={{pathname: "/standings"}} className="btn w-100 mt-3 vikingsButtons" style={{backgroundColor: "#4F2683", color: "#FFC62F", fontWeight: "bold"}}>
                Vikings Group Results
            </Link>
            
            <Link to="/hardcore-picks" className="btn w-100 mt-3" style={{backgroundColor: "#013369", color: "white", fontWeight: "bold"}}>
                HARDCORE NFL CHAT make picks
            </Link>
            <Link to={{pathname: "/hardcore-standings"}} className="btn w-100 mt-3" style={{backgroundColor: "#013369", color: "white", fontWeight: "bold"}}>
                HARDCORE Group Results
            </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Logout</Button>
          </div>
        </>
    )
}

export default Dashboard