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
         //const userScores = Object.keys(groupScores[user]).filter((item) => item !== "name");
         nameScoresArray.push({name: name, week1: groupScores[user].week1, week2: groupScores[user].week2, week3: groupScores[user].week3});   
 
           return null;
       })
 
       nameScoresArray.forEach(user => {
           fullStandingsTable.push(
               <tr key={user.name}>
               <td key={user.name}>{user.name}</td>
               <td>{user.week1}</td>
               <td>{user.week2}</td>
               <td>{user.week3}</td>
               </tr>)
       })
 
      
   weekResults = <Table className="fullStandingsTable" striped bordered hover style={{borderColor: colortheme.primary}}>
     <thead key={group}>
       <tr style={{backgroundColor: colortheme.secondary}}>
         <th></th>
         <th>1</th>
         <th>2</th>
         <th>3</th>
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
 
