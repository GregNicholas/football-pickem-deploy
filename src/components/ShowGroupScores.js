import React, { useState, useEffect } from 'react';
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
          const userScore = Object.values(groupScores[user]).filter((item) => typeof item === 'number').reduce((a, b) => (a + b), 0);
            nameScoresArray.push({name: name, userScore: userScore});    
            return null;
        })

        nameScoresArray.sort((a, b) => b.userScore - a.userScore);

        nameScoresArray.forEach(user => {
          
            standingsTable.push(
                <tr key={user.name}>
                <td key={user.name}>{user.name}</td>
                <td key={user.userScore}>{user.userScore}</td>
                </tr>) 
        })
        
    results = <Table className="standingsTable" striped bordered hover style={{borderColor: colortheme}}>
      <thead key={group}>
        <tr className="tableHead">
          <th key="name">Name</th>
          <th key="score">Score</th>
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

