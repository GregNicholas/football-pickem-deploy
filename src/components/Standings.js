import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { weekOneGames, weekTwoGames, weekThreeGames, weekFourGames } from '../matchupsData';
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';
import CenteredContainer from './authentication/CenteredContainer';

const Standings = () => {
    const [week1, setWeek1] = useState([]);
    const [week2, setWeek2] = useState([]);
    const [week3, setWeek3] = useState([]);
    const [week4, setWeek4] = useState([]);
    const [week5, setWeek5] = useState([]);
    const [finals, setFinals] = useState([]);
    const [display, setDisplay] = useState('');
    const { currentUser } = useAuth();
    
  React.useEffect(() => {
    const fetchData = async () => {
      const w1 = await db.collection("week1").get()
      setWeek1(w1.docs.map(doc => doc.data()));

      const w2 = await db.collection("week2").get()
      setWeek2(w2.docs.map(doc => doc.data()));

      const w3 = await db.collection("week3").get()
      setWeek3(w3.docs.map(doc => doc.data()));

      const w4 = await db.collection("week4").get()
      setWeek4(w4.docs.map(doc => doc.data()));

      // const w5 = await db.collection("week5").get()
      // setWeek5(w5.docs.map(doc => doc.data()));

      const fnls = await db.collection("finals").get()
      setFinals(fnls.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])


  const showWeekPicks = (weekText, week, weekGames) => {
    setDisplay(<UserPickTable week={week} weekText={weekText} group="vikingsScores" finals={finals[0][weekText]} thisWeekGames={weekGames} colortheme={{primary: "#4F2683", secondary: "#FFC62F", third: "black"}} />)
  }
  // const showWeekTwoPicks = () => {
  //   setDisplay(<UserPickTable week={week2} finals={finals[0].week2} thisWeekGames={weekTwoGames} colortheme={{primary: "#4F2683", secondary: "#FFC62F", third: "black"}} />)
  // }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="vikingsScores" colortheme={{primary: "#4F2683", secondary: "#FFC62F", third: "black"}} />)
  }

  const setGroupScores = () => {
    setDisplay(<SetGroupScores groupWeek="week3" weekText="week3" finals={finals[0].week3} group="vikingsScores" />)
  }

  if (finals.length > 0 && week2.length > 0) {
    return (
      <>
      <h1 className="vikings">VIKINGS Group Results</h1>
      <CenteredContainer>
      <Card>
        <Card.Body>
          <section className="weekButtonGroup">
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week1", week1, weekOneGames)}>Week 1 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week2", week2, weekTwoGames)}>Week 2 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week3", week3, weekThreeGames)}>Week 3 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week4", week4, weekFourGames)}>Week 4 Picks</Button>
          </section>
          <Button style={{color: "#4F2683", backgroundColor: "#FFC62F", border: "#4F2683", fontWeight: "bold"}} onClick={showGroupScores}>Cumulative Scores</Button>
          <br /><br />
          {currentUser.uid === '9tZfRxunq1cMckfGxU8B4pnh0OQ2' ||
           currentUser.uid === '8sUrcN38ibMuKGN6kupGQ67Aq0y2' ? 
           <Button onClick={setGroupScores} variant="danger">SET Group Scores</Button> : null}
          {display}
        </Card.Body>
      </Card>
      </CenteredContainer>
      </>)
  } 
  return null
  
}

export default Standings

