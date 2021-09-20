import React, { useState } from 'react';
import {Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { weekOneGames, weekTwoGames, weekThreeGames } from '../matchupsData';
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';


const Standings = () => {
    const [hcweek1, setHcweek1] = useState([]);
    const [hcweek2, setHcweek2] = useState([]);
    const [hcweek3, setHcweek3] = useState([]);
    const [hcweek4, setHcweek4] = useState([]);
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

      // const w4 = await db.collection("hcweek4").get()
      // setHcweek4(w4.docs.map(doc => doc.data()));

      const fnls = await db.collection("finals").get()
      setFinals(fnls.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  const showWeekPicks = (weektext, week, weekGames) => {
    setDisplay(<UserPickTable week={week} finals={finals[0][weektext]} thisWeekGames={weekGames} colortheme={{primary: "#013369", secondary: "#D50A0A", third: "white"}} />)
  }

  // const showWeekTwoPicks = () => {
  //   setDisplay(<UserPickTable week={hcweek2} finals={finals[0].week2} thisWeekGames={weekTwoGames} colortheme={{primary: "#013369", secondary: "#D50A0A", third: "white"}} />)
  // }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="hcScores" colortheme={{primary: "#013369", secondary: "#D50A0A", third: "white"}} />)
  }

  const setGroupScores = () => {
    setDisplay(<SetGroupScores groupWeek="hcweek2" weekText="week2" finals={finals[0].week2} group="hcScores" />)
  }

  if (finals.length > 0 && hcweek2.length > 0) {
    return (  
      <>
      <h1 className="nflChat">HARDCORE Group Results</h1>
          <Button style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week1", hcweek1, weekOneGames)}>WEEK 1 PICKS</Button>
          <br /><br />
          <Button style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week2", hcweek2, weekTwoGames)}>WEEK 2 PICKS</Button>
          <br /><br />
          <Button style={{color: "white", backgroundColor: "#013369", fontWeight: "bold"}} onClick={() => showWeekPicks("week3", hcweek3, weekThreeGames)}>WEEK 3 PICKS</Button>
          <br /><br />
          <Button style={{color: "white", backgroundColor: "#D50A0A", fontWeight: "bold"}} onClick={showGroupScores}>CUMULATIVE SCORES</Button>
          <br /><br />
          {currentUser.uid === '9tZfRxunq1cMckfGxU8B4pnh0OQ2' ||
           currentUser.uid === '8sUrcN38ibMuKGN6kupGQ67Aq0y2' ? 
           <Button onClick={setGroupScores} variant="danger">SET Group Scores</Button> : null}
  
          {display}
      </>)
  } 
  return null
  
}

export default Standings

