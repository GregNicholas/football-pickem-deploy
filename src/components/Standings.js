import React, { useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { weekOneGames, weekTwoGames, weekThreeGames, weekFourGames, weekFiveGames, 
        weekSixGames, weekSevenGames, weekEightGames, weekNineGames, weekTenGames, 
        weekElevenGames, weekTwelveGames, weekThirteenGames, weekFourteenGames, weekFifteenGames,
        weekSixteenGames, weekSeventeenGames, weekEighteenGames } from '../matchupsData';
import { ScheduleContext } from "../contexts/ScheduleContext";
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';
import CenteredContainer from './authentication/CenteredContainer';
import LoadingFootball from './LoadingFootball';

const Standings = () => {
    const [week1, setWeek1] = useState([]);
    const [week2, setWeek2] = useState([]);
    const [week3, setWeek3] = useState([]);
    const [week4, setWeek4] = useState([]);
    const [week5, setWeek5] = useState([]);
    const [week6, setWeek6] = useState([]);
    const [week7, setWeek7] = useState([]);
    const [week8, setWeek8] = useState([]);
    const [week9, setWeek9] = useState([]);
    const [week10, setWeek10] = useState([]);
    const [week11, setWeek11] = useState([]);
    const [week12, setWeek12] = useState([]);
    const [week13, setWeek13] = useState([]);
    const [week14, setWeek14] = useState([]);
    const [week15, setWeek15] = useState([]);
    const [week16, setWeek16] = useState([]);
    const [week17, setWeek17] = useState([]);
    const [week18, setWeek18] = useState([]);
    const [finals, setFinals] = useState([]);
    const [display, setDisplay] = useState('');
    const { currentUser } = useAuth();
    const {schedule} = useContext(ScheduleContext);

    let weekNumber = '0'
    let vikingsWeekScore = ''
    if (schedule.length > 0) {
      weekNumber = schedule[0].week.setScheduleWeek
      vikingsWeekScore = `week${weekNumber.toString()}`
      console.log("in Standings: ", weekNumber, vikingsWeekScore)
    }
    
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

      const w5 = await db.collection("week5").get()
      setWeek5(w5.docs.map(doc => doc.data()));

      const w6 = await db.collection("week6").get()
      setWeek6(w6.docs.map(doc => doc.data()));

      const w7 = await db.collection("week7").get()
      setWeek7(w7.docs.map(doc => doc.data()));

      const w8 = await db.collection("week8").get()
      setWeek8(w8.docs.map(doc => doc.data()));

      const w9 = await db.collection("week9").get()
      setWeek9(w9.docs.map(doc => doc.data()));

      const w10 = await db.collection("week10").get()
      setWeek10(w10.docs.map(doc => doc.data()));

      const w11 = await db.collection("week11").get()
      setWeek11(w11.docs.map(doc => doc.data()));

      const w12 = await db.collection("week12").get()
      setWeek12(w12.docs.map(doc => doc.data()));

      const w13 = await db.collection("week13").get()
      setWeek13(w13.docs.map(doc => doc.data()));

      const w14 = await db.collection("week14").get()
      setWeek14(w14.docs.map(doc => doc.data()));

      const w15 = await db.collection("week15").get()
      setWeek15(w15.docs.map(doc => doc.data()));

      const w16 = await db.collection("week16").get()
      setWeek16(w16.docs.map(doc => doc.data()));

      const w17 = await db.collection("week17").get()
      setWeek17(w17.docs.map(doc => doc.data()));

      const w18 = await db.collection("week18").get()
      setWeek18(w18.docs.map(doc => doc.data()));

      const fnls = await db.collection("finals").get()
      setFinals(fnls.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  
  const showWeekPicks = (weekText, week, weekGames) => {
    setDisplay(<UserPickTable week={week} weekText={weekText} group="vikingsScores" finals={finals[0][weekText]} thisWeekGames={weekGames} colortheme={{primary: "#4F2683", secondary: "#FFC62F", third: "black"}} />)
  }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="vikingsScores" colortheme={{primary: "#4F2683", secondary: "#FFC62F", third: "black"}} />)
  }
  
  const setGroupScores = () => {
    if(finals.length > 0) {
      setDisplay(<SetGroupScores groupWeek={vikingsWeekScore} weekText={vikingsWeekScore} finals={finals[0][vikingsWeekScore]} group="vikingsScores" />)
    } else {
      console.log("No FINALS")
    }
  }

  if (finals.length > 0 && week5.length > 0) {
    return (
      <>
      <h1 className="vikings">VIKINGS Group Results</h1>
      <CenteredContainer>
      <Card>
        <Card.Body style={{ textAlign: "center"}}>
          <section className="weekButtonGroup">
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week1", week1, weekOneGames)}>Week 1 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week2", week2, weekTwoGames)}>Week 2 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week3", week3, weekThreeGames)}>Week 3 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week4", week4, weekFourGames)}>Week 4 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week5", week5, weekFiveGames)}>Week 5 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week6", week6, weekSixGames)}>Week 6 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week7", week7, weekSevenGames)}>Week 7 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week8", week8, weekEightGames)}>Week 8 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week9", week9, weekNineGames)}>Week 9 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week10", week10, weekTenGames)}>Week 10 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week11", week11, weekElevenGames)}>Week 11 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week12", week12, weekTwelveGames)}>Week 12 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week13", week13, weekThirteenGames)}>Week 13 Picks</Button>
          <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week14", week14, weekFourteenGames)}>Week 14 Picks</Button>
          {+weekNumber > 14 && <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week15", week15, weekFifteenGames)}>Week 15 Picks</Button>}       
          {+weekNumber > 15 && <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week16", week16, weekSixteenGames)}>Week 16 Picks</Button>}        
          {+weekNumber > 16 && <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week17", week17, weekSeventeenGames)}>Week 17 Picks</Button>}   
          {+weekNumber > 17 && <Button className="weekButton" style={{color: "#FFC62F", backgroundColor: "#4F2683", border: "#4F2683", fontWeight: "bold"}} onClick={() => showWeekPicks("week18", week18, weekEighteenGames)}>Week 18 Picks</Button>}   
          </section>
          <Button style={{color: "#4F2683", backgroundColor: "#FFC62F", border: "#4F2683", fontWeight: "bold", width: "15rem", marginTop: "1rem"}} onClick={showGroupScores}>Cumulative Scores</Button>
          <br />
          {currentUser.uid === '9tZfRxunq1cMckfGxU8B4pnh0OQ2' ||
           currentUser.uid === '8sUrcN38ibMuKGN6kupGQ67Aq0y2' ? 
           <Button onClick={setGroupScores} variant="danger">SET Group Scores</Button> : null}
          {display}
        </Card.Body>
      </Card>
      </CenteredContainer>
      </>)
  } 
  return <LoadingFootball />
  
}

export default Standings

