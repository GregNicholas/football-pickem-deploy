import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
 
const WeeklyScores = ({ group, groupScores, colortheme }) => {
 
 let weekResults;
   if(groupScores.length > 0){
     const nameScoresArray = [];
     const fullStandingsTable = [];
   //   const weekTwoScores = [];
   //   const weekTwoTable = [];
 
       Object.keys(groupScores).map(user => {
         const name = groupScores[user].name;
         const userScores = Object.values(groupScores[user]).filter((item) => typeof item !== 'string');
         console.log("USER: ", user);
         nameScoresArray.push({name: name, userScores: userScores});   
 
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
 
      
   weekResults = <Table className="fullStandingsTable" striped bordered hover style={{borderColor: colortheme.primary}}>
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
   {weekResults}
   </>)
}
 
export default WeeklyScores
 
