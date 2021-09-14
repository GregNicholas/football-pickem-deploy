import React from 'react';
import { Table } from 'react-bootstrap';

const UserPickTable = ({ week, finals, thisWeekGames, colortheme }) => {
//   const [thisWeek, setThisWeek] = useState([]);
// console.log("finals: ", finals)
//   React.useEffect(() => {
//     const fetchData = async () => {
//       const data = await db.collection(week).get()
//       setThisWeek(data.docs.map(doc => doc.data()));
//     }
//     fetchData()
//   }, [])
  let results;
  if(week.length > 0){
    results = week.map(user => {
      const userPicks = [];
      let numCorrect = 0;
     // if (finals.length > 0) {
        Object.keys(thisWeekGames).map(game => {
          const away = thisWeekGames[game]["away"];
          const home = thisWeekGames[game]["home"];
          const userPick = user.picks[game];
          let pickStatus;
          let winner = finals[game];
          if (userPick === winner){
            numCorrect++;
            pickStatus = true;
          } else {
            pickStatus = false;
          } 
          userPick === away ?
            userPicks.push(
                <tr key={game}>
                  <td className={`${pickStatus ? "pickCorrect" : "pickWrong"}`}>{userPick}</td>
                  <td>{home}</td>
                </tr>)
            : userPicks.push(
              <tr key={game}>
                <td>{away}</td>
                <td className={`${pickStatus ? "pickCorrect" : "pickWrong"}`}>{userPick}</td>
              </tr>);     
        return null;
        })
     // }

      return <Table className="standingsTable" striped bordered hover style={{borderColor: colortheme}} key={user.name}>
      <thead>
        <tr className="tableHead">
          <th><span className="userName">{user.name}</span> Score: {numCorrect}</th>
          <th>MNF: {user.MNFscore}  </th>
        </tr>
        <tr>
          <th className="homeAway">Away</th>
          <th className="homeAway">Home</th>
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

