import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../firebase';
import UserPickTable from './UserPickTable';


const Standings = () => {
    const [hcWeek1, setHcWeek1] = useState([]);
    
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("hcweek1").get()
      setHcWeek1(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  return (
    <>
    <h1 className="nflChat">HARDCORE Results</h1>
    <UserPickTable week={hcWeek1} colortheme={"black"} />
    </>)
}

export default Standings

