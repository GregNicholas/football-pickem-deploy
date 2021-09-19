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
 
         // const userWeekTwoScore = groupScores[user].week1;
         // if (userWeekTwoScore) {
         //   weekTwoScores.push({name: name, userScore: userWeekTwoScore})
         // }
 
           return null;
       })
 
       nameScoresArray.sort((a, b) => b.userScore - a.userScore);
       // weekTwoScores.sort((a, b) => b.userScore - a.userScore);
 
       nameScoresArray.forEach(user => {
           fullStandingsTable.push(
               <tr key={user.name}>
               <td key={user.name}>{user.name}</td>
               <td key={user.userScore}>{user.userScore}</td>
               </tr>)
       })
 
       // weekTwoScores.forEach(user => {
       //   weekTwoTable.push(
       //       <tr key={user.name}>
       //       <td key={user.name}>{user.name}</td>
       //       <td key={user.userScore}>{user.userScore}</td>
       //       </tr>)
       // })
      
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
 
 //   weekResults = <Table className="fullStandingsTable" striped bordered hover style={{borderColor: colortheme.primary}}>
 //   <thead key={group}>
 //     <tr style={{backgroundColor: colortheme.secondary, fontWeight: "bold", fontSize: "1.5rem"}}>Week2 Scores</tr>
 //     <tr style={{backgroundColor: colortheme.secondary}}>
 //       <th key="name">Name</th>
 //       <th key="score">Score</th>
 //     </tr>
 //   </thead>
 //   <tbody>
 //   {weekTwoTable}
 //   </tbody>
 // </Table>
  }
 return (
   <>
   <h2>SEASON TOTALS</h2>
   {cumulativeResults}
   <WeeklyScores group={group} groupScores={groupScores} colortheme={colortheme} />
   {/* <WeekScores groupScores={groupScores} group={group}/> */}
   </>)
}
 
export default ShowGroupScores
