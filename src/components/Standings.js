import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../firebase';
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';


const Standings = () => {
    const [week1, setWeek1] = useState([]);
    const [finals, setFinals] = useState([]);
    const [display, setDisplay] = useState('');
    const { currentUser } = useAuth();
    
  React.useEffect(() => {
    const fetchData = async () => {
      // const data = await db.collection("week1").get()
      // setWeek1(data.docs.map(doc => doc.data()));
      const data2 = await db.collection("finals").get()
      setFinals(data2.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  const showThisWeekPicks = () => {
    setDisplay(<UserPickTable week="week1" finals={finals} colortheme={"#4F2683"} />)
  }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="vikingsScores" colortheme={"#4F2683"} />)
  }

  const setGroupScores = () => {
    setDisplay(<SetGroupScores week={week1} finals={finals} group="vikingsScores" />)
  }

  
  return (
    <>
    <h1 className="vikings">VIKINGS Group Results</h1>
        <Button onClick={showThisWeekPicks}>See this week's picks</Button>
        <br /><br />
        <Button onClick={showGroupScores}>See Group Scores</Button>
        <br /><br />
        {currentUser.uid === '9tZfRxunq1cMckfGxU8B4pnh0OQ2' ? <Button onClick={setGroupScores}>SET Group Scores</Button> : null}

        {display}
    </>)
}

export default Standings

