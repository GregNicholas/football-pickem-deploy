import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../firebase';
import WeeklyScores from './WeeklyScores';
 
 
const ShowGroupScores = ({ group, colortheme }) => {
   const [groupScores, setGroupScores] = useState([]);
 
   useEffect(() => {
       const fetchData = async () => {
         const data = await db.collection(group).get()
         setGroupScores(data.docs.map(doc => doc.data()));
       }
       fetchData()
     }, [])
 
 let cumulativeResults;
 // let weekResults;
   if(groupScores.length > 0){
     const nameScoresArray = [];
     const fullStandingsTable = [];
     const weekTwoScores = [];
     const weekTwoTable = [];
 
       Object.keys(groupScores).map(user => {
         const name = groupScores[user].name;
         const userScore = Object.values(groupScores[user]).filter((item) => typeof item === 'number').reduce((a, b) => (a + b), 0);
         nameScoresArray.push({name: name, userScore: userScore});   
 
           return null;
       })
 
       nameScoresArray.sort((a, b) => b.userScore - a.userScore);

       nameScoresArray.forEach(user => {
           fullStandingsTable.push(
               <tr key={user.name}>
               <td key={user.name}>{user.name}</td>
               <td key={user.userScore}>{user.userScore}</td>
               </tr>)
       })
 
   cumulativeResults = <Table className="fullStandingsTable" striped bordered hover style={{borderColor: colortheme.primary}}>
     <thead key={group}>
       <tr style={{backgroundColor: colortheme.secondary}}>
         <th key="name">Name</th>
         <th key="score">Score</th>
       </tr>
     </thead>
     <tbody>
     {fullStandingsTable}
     </tbody>
   </Table>
 
  }
 return (
   <>
   <h2>SEASON TOTALS</h2>
   {cumulativeResults}
   <h2>WEEKLY Results</h2>
   <WeeklyScores group={group} groupScores={groupScores} colortheme={colortheme} />
   </>)
}
 
export default ShowGroupScores
