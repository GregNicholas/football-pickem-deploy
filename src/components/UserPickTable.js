import React, { useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../firebase';


const UserPickTable = ({ week, finals, colortheme }) => {
  const [thisWeek, setThisWeek] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection(week).get()
      setThisWeek(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

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

  let results;
  if(thisWeek.length > 0){
    console.log(thisWeek)
    results = thisWeek.map(user => {
      const userPicks = [];
      let numCorrect = 0;
      if (finals.length > 0) {
        Object.keys(thisWeekGames).map(game => {
          const away = thisWeekGames[game]["away"];
          const home = thisWeekGames[game]["home"];
          const userPick = user.picks[game];
          console.log(away, home, userPick)
          let pickStatus;
          let winner = finals[0].results[game];
          if (userPick === winner){
            numCorrect++;
            pickStatus = true;
          } else {
            pickStatus = false;
          } 
          userPick === away ?
            userPicks.push(
                <tr key={game}>
                  <td className={`${pickStatus ? "pickCorrect" : "pickWrong"}`}>{away}</td>
                  <td>{home}</td>
                </tr>)
            : userPicks.push(
              <tr key={game}>
                <td>{away}</td>
                <td className={`${pickStatus ? "pickCorrect" : "pickWrong"}`}>{home}</td>
              </tr>);     
        return null;
        })
      }

      return <Table className="standingsTable" striped bordered hover style={{borderColor: colortheme}} key={user.name}>
      <thead>
        <tr className="tableHead">
          <th><span className="userName">{user.name}</span> Score: {numCorrect}</th>
          <th>MNF: {user.MNFscore}  </th>
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
    {results}
    </>)
}

export default UserPickTable

