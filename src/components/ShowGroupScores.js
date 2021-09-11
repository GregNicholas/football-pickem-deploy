import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../firebase';


const ShowGroupScores = ({ group, colortheme }) => {
    const [groupScores, setGroupScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await db.collection(group).get()
          setGroupScores(data.docs.map(doc => doc.data()));
        }
        fetchData()
      }, [])

  let results;
   if(groupScores.length > 0){
      const nameScoresArray = [];
      const standingsTable = [];

        Object.keys(groupScores).map(user => {
          const name = groupScores[user].name;
          const userScore = Object.values(groupScores[user].weeks).reduce((a, b) => a + b);;
            nameScoresArray.push({name: name, userScore: userScore});    
            return null;
        })

        nameScoresArray.sort((a, b) => b.userScore - a.userScore);

        nameScoresArray.forEach(user => {
            standingsTable.push(
                <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.userScore}</td>
                </tr>) 
        })
        
    results = <Table className="standingsTable" striped bordered hover style={{borderColor: colortheme}}>
      <thead>
        <tr className="tableHead">
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      {standingsTable}
      </tbody>
    </Table> 
   } 
 
  return (
    <>
    {results}
    </>)
}

export default ShowGroupScores

