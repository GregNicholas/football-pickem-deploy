import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../firebase';


const Standings = () => {
    const [week1, setWeek1] = useState([]);
    //const [showPicks, setShowPicks] = useState('false');
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);
    // const { currentUser, logout } = useAuth();
    // const history = useHistory();

    const finals = {
      game1: "Dallas",
      game2: "Pittsburgh",
      game3: "Carolina",
      game4: "Houston",
      game5: "Arizona",
      game6: "Washington",
      game7: "Atlanta",
      game8: "Indianapolis",
      game9: "Minnesota",
      game10: "Detroit",
      game11: "Cleveland",
      game12: "Miami",
      game13: "Denver",
      game14: "Green Bay",
      game15: "Chicago",
      game16: "Baltimore"
    };

    const thisWeekGames = {
        game1: {
          away: "Dallas",
          home: "Tampa Bay", 
          time: "Thursday, Sep. 9, 7:20pm CT",
        },
        game2: {
          away: "Pittsburgh", 
          home: "Buffalo", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
        game3: {
          away: "NY Jets", 
          home: "Carolina", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		      game4: {
          away: "Jacksonville", 
          home: "Houston", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		    game5: {
          away: "Arizona", 
          home: "Tennessee", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		    game6: {
          away: "LA Chargers", 
          home: "Washington", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		  game7: {
          away: "Philadelphia", 
          home: "Atlanta", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		  game8: {
          away: "Seattle", 
          home: "Indianapolis", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		  game9: {
          away: "Minnesota", 
          home: "Cincinnati", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		  game10: {
          away: "San Francisco", 
          home: "Detroit", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		  game11: {
          away: "Cleveland", 
          home: "Kansas City", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		  game12: {
          away: "Miami", 
          home: "New England", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		  game13: {
          away: "Denver", 
          home: "NY Giants", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		  game14: {
          away: "Green Bay", 
          home: "New Orleans", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
	    game15: {
          away: "Chicago", 
          home: "LA Rams", 
          time: "Sunday, Sep. 12, 7:20pm CT",
        },
		  game16: {
          away: "Baltimore", 
          home: "Las Vegas", 
          time: "Monday, Sep. 13, 7:15pm CT",
        },
      }

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("week1").get()
      setWeek1(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  let results;

  if(week1.length > 0){
    if(finals === null){
      
    }
    results = week1.map(user => {
      console.log(user);
      const userPicks = [];
      let numCorrect = 0;
      if (finals === null) {
        Object.keys(thisWeekGames).map(game => {
          const away = thisWeekGames[game]["away"];
          const home = thisWeekGames[game]["home"];
          const userPick = user.picks[game];
          userPick === away ?
            userPicks.push(
                <tr key={game}>
                  <td className="picked">{away}</td>
                  <td>{home}</td>
                </tr>)
            : userPicks.push(
              <tr key={game}>
                <td>{away}</td>
                <td className="picked">{home}</td>
              </tr>);     
        return null;
        })
      } else {
        Object.keys(thisWeekGames).map(game => {
          const away = thisWeekGames[game]["away"];
          const home = thisWeekGames[game]["home"];
          const userPick = user.picks[game];
          userPick === away ?
            userPicks.push(
                <tr key={game}>
                  <td className={`${userPick === finals[game] ? "pickCorrect" : "pickWrong"}`}>{away}</td>
                  <td>{home}</td>
                </tr>)
            : userPicks.push(
              <tr key={game}>
                <td>{away}</td>
                <td className={`${userPick === finals[game] ? "pickCorrect" : "pickWrong"}`}>{home}</td>
              </tr>);     
        return null;
        })
      }
      return <Table className="standingsTable" striped bordered hover key={user.name}>
      <thead>
        <tr className="userName">
          <th>{user.name}'s Picks</th>
          <th>#Correct: </th>
        </tr>
        <tr>
          <th>Away</th>
          <th>Home</th>
        </tr>
      </thead>
      <tbody>
      {userPicks}
      </tbody>
    </Table> 
    }) 
  } 
 
  return (
    <>
    <h1>Standings</h1>
    {results}

      
    </>)
}

export default Standings