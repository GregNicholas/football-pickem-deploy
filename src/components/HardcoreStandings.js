import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { weekOneGames, weekTwoGames, weekThreeGames, weekFourGames, weekFiveGames, 
  weekSixGames, weekSevenGames, weekEightGames, weekNineGames, weekTenGames, 
  weekElevenGames, weekTwelveGames, weekThirteenGames, weekFourteeenGames, weekFifteenGames,
  weekSixteenGames, weekSeventeenGames, weekEighteenGames } from '../matchupsData';
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';
import CenteredContainer from './authentication/CenteredContainer';

const Standings = () => {
    const [hcweek1, setHcweek1] = useState([]);
    const [hcweek2, setHcweek2] = useState([]);
    const [hcweek3, setHcweek3] = useState([]);
    const [hcweek4, setHcweek4] = useState([]);
    const [hcweek5, setHcweek5] = useState([]);
    const [hcweek6, setHcweek6] = useState([]);
    const [hcweek7, setHcweek7] = useState([]);
    const [hcweek8, setHcweek8] = useState([]);
    const [hcweek9, setHcweek9] = useState([]);
    const [hcweek10, setHcweek10] = useState([]);
    const [hcweek11, setHcweek11] = useState([]);
    const [hcweek12, setHcweek12] = useState([]);
    const [hcweek13, setHcweek13] = useState([]);
    const [hcweek14, setHcweek14] = useState([]);
    const [hcweek15, setHcweek15] = useState([]);
    const [hcweek16, setHcweek16] = useState([]);
    const [hcweek17, setHcweek17] = useState([]);
    const [hcweek18, setHcweek18] = useState([]);
    const [finals, setFinals] = useState([]);
    const [display, setDisplay] = useState('');
    const { currentUser } = useAuth();
    
  React.useEffect(() => {
    const fetchData = async () => {
      const w1 = await db.collection("hcweek1").get()
      setHcweek1(w1.docs.map(doc => doc.data()));

      const w2 = await db.collection("hcweek2").get()
      setHcweek2(w2.docs.map(doc => doc.data()));

      const w3 = await db.collection("hcweek3").get()
      setHcweek3(w3.docs.map(doc => doc.data()));

      const w4 = await db.collection("hcweek4").get()
      setHcweek4(w4.docs.map(doc => doc.data()));

      const w5 = await db.collection("hcweek5").get()
      setHcweek5(w5.docs.map(doc => doc.data()));

      const w6 = await db.collection("hcweek6").get()
      setHcweek6(w6.docs.map(doc => doc.data()));

      const w7 = await db.collection("hcweek7").get()
      setHcweek7(w7.docs.map(doc => doc.data()));

      const w8 = await db.collection("hcweek8").get()
      setHcweek8(w8.docs.map(doc => doc.data()));

      const w9 = await db.collection("hcweek9").get()
      setHcweek9(w9.docs.map(doc => doc.data()));

      const w10 = await db.collection("hcweek10").get()
      setHcweek10(w10.docs.map(doc => doc.data()));

      const w11 = await db.collection("hcweek11").get()
      setHcweek11(w11.docs.map(doc => doc.data()));

      const fnls = await db.collection("finals").get()
      setFinals(fnls.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  const showWeekPicks = (weektext, week, weekGames) => {
    setDisplay(<UserPickTable week={week} finals={finals[0][weektext]} thisWeekGames={weekGames} colortheme={{primary: "#013369", secondary: "#D50A0A", third: "white"}} />)
  }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="hcScores" colortheme={{primary: "#013369", secondary: "#D50A0A", third: "white"}} />)
  }

  const setGroupScores = () => {
    setDisplay(<SetGroupScores groupWeek="hcweek10" weekText="week10" finals={finals[0].week10} group="hcScores" />)
  }

  if (finals.length > 0 && hcweek10.length > 0) {
    return (  
      <>
      <h1 className="nflChat">HARDCORE Group Results</h1>
      <CenteredContainer>
      <Card>
        <Card.Body>
          <section className="weekButtonGroup">
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week1", hcweek1, weekOneGames)}>WEEK 1 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week2", hcweek2, weekTwoGames)}>WEEK 2 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week3", hcweek3, weekThreeGames)}>WEEK 3 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week4", hcweek4, weekFourGames)}>WEEK 4 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week5", hcweek5, weekFiveGames)}>WEEK 5 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week6", hcweek6, weekSixGames)}>WEEK 6 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week7", hcweek7, weekSevenGames)}>WEEK 7 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week8", hcweek8, weekEightGames)}>WEEK 8 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week9", hcweek9, weekNineGames)}>WEEK 9 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week10", hcweek10, weekTenGames)}>WEEK 10 PICKS</Button>
            <Button className="weekButton" style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week11", hcweek11, weekElevenGames)}>WEEK 11 PICKS</Button>
          </section>
          <Button style={{color: "white", backgroundColor: "#D50A0A", fontWeight: "bold"}} onClick={showGroupScores}>CUMULATIVE SCORES</Button>
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

