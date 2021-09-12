import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import UserPickTable from './UserPickTable';
import SetGroupScores from './SetGroupScores';
import ShowGroupScores from './ShowGroupScores';


const Standings = () => {
    const [week1, setWeek1] = useState([]);
    const [week2, setWeek2] = useState([]);
    const [finals, setFinals] = useState([]);
    const [display, setDisplay] = useState('');
    const { currentUser } = useAuth();
    
  React.useEffect(() => {
    const fetchData = async () => {
      const w1 = await db.collection("week1").get()
      setWeek1(w1.docs.map(doc => doc.data()));

      const w2 = await db.collection("week2").get()
      setWeek2(w2.docs.map(doc => doc.data()));

      const fnls = await db.collection("finals").get()
      setFinals(fnls.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  const weekOneGames = {
    game1: {
      away: "Dallas",
      home: "Tampa Bay", 
    },
    game2: {
      away: "Pittsburgh", 
      home: "Buffalo", 
    },
    game3: {
      away: "NY Jets", 
      home: "Carolina", 
    },
    game4: {
      away: "Jacksonville", 
      home: "Houston", 
    },
    game5: {
      away: "Arizona", 
      home: "Tennessee", 
    },
    game6: {
      away: "LA Chargers", 
      home: "Washington", 
    },
    game7: {
      away: "Philadelphia", 
      home: "Atlanta", 
    },
    game8: {
      away: "Seattle", 
      home: "Indianapolis", 
    },
    game9: {
      away: "Minnesota", 
      home: "Cincinnati", 
    },
    game10: {
      away: "San Francisco", 
      home: "Detroit", 
    },
    game11: {
      away: "Cleveland", 
      home: "Kansas City", 
    },
    game12: {
      away: "Miami", 
      home: "New England", 
    },
    game13: {
      away: "Denver", 
      home: "NY Giants", 
    },
    game14: {
      away: "Green Bay", 
      home: "New Orleans", 
    },
    game15: {
      away: "Chicago", 
      home: "LA Rams", 
    },
    game16: {
      away: "Baltimore", 
      home: "Las Vegas", 
    },
  }

  const weekTwoGames = {
    game1: {
      away: "NY Giants",
      home: "Washington", 
    },
    game2: {
      away: "New England", 
      home: "NY Jets", 
    },
    game3: {
      away: "Denver", 
      home: "Jacksonville", 
    },
      game4: {
      away: "Buffalo", 
      home: "Miami", 
    },
    game5: {
      away: "San Francisco", 
      home: "Philadelphia", 
    },
    game6: {
      away: "LA Rams", 
      home: "Indianapolis", 
    },
    game7: {
      away: "Las Vegas", 
      home: "Pittsburgh", 
    },
    game8: {
      away: "Cincinnati", 
      home: "Chicago", 
    },
    game9: {
      away: "Houston", 
      home: "Cleveland", 
    },
    game10: {
      away: "New Orleans", 
      home: "Carolina", 
    },
    game11: {
      away: "Minnesota", 
      home: "Arizona", 
    },
    game12: {
      away: "Atlanta", 
      home: "Tampa Bay", 
    },
    game13: {
      away: "Tennessee", 
      home: "Seattle", 
    },
    game14: {
      away: "Dallas", 
      home: "LA Chargers", 
    },
    game15: {
      away: "Kansas City", 
      home: "Baltimore", 
    },
    game16: {
      away: "Detroit", 
      home: "Green Bay", 
    },
  }

  const showWeekOnePicks = () => {
    setDisplay(<UserPickTable week={week1} finals={finals[0].week1} thisWeekGames={weekOneGames} colortheme={"#4F2683"} />)
  }

  const showWeekTwoPicks = () => {
    setDisplay(<UserPickTable week={week2} finals={finals[0].week2} thisWeekGames={weekTwoGames} colortheme={"#4F2683"} />)
  }

  const showGroupScores = () => {
    setDisplay(<ShowGroupScores group="vikingsScores" colortheme={"#4F2683"} />)
  }

  const setGroupScores = () => {
    setDisplay(<SetGroupScores week="week1" finals={finals[0].week1} group="vikingsScores" />)
  }

  if (finals.length > 0 && week1.length > 0) {
    return (
      <>
      <h1 className="vikings">VIKINGS Group Results</h1>
          <Button onClick={showWeekOnePicks}>See week 1 picks</Button>
          <br /><br />
          <Button onClick={showWeekTwoPicks}>See week 2 picks</Button>
          <br /><br />
          <Button onClick={showGroupScores}>Cumulative Scores</Button>
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

