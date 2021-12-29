import React from 'react';
import { Table } from 'react-bootstrap';
 
const WeeklyScores = ({ group, groupScores, colortheme }) => {
 
 let weekResults, weekResults2;
   if(groupScores.length > 0){
     const nameScoresArray = [];
     const fullStandingsTable = [];
     //const fullStandingsTable2 = [];
 
       Object.keys(groupScores).map(user => {
         const name = groupScores[user].name;
         //const userScores = Object.keys(groupScores[user]).filter((item) => item !== "name");
         nameScoresArray.push({name: name, 
          week1: groupScores[user].week1, 
          week2: groupScores[user].week2, 
          week3: groupScores[user].week3,
          week4: groupScores[user].week4,
          week5: groupScores[user].week5,
          week6: groupScores[user].week6,
          week7: groupScores[user].week7,
          week8: groupScores[user].week8,
          week9: groupScores[user].week9,
          week10: groupScores[user].week10,
          week11: groupScores[user].week11,
          week12: groupScores[user].week12,
          week13: groupScores[user].week13,
          week14: groupScores[user].week14,
          week15: groupScores[user].week15,
          week16: groupScores[user].week16,
          week17: groupScores[user].week17,
          week18: groupScores[user].week18
        });   
 
           return null;
       })
 
       nameScoresArray.forEach(user => {
           fullStandingsTable.push(
               <tr key={user.name}>
               <td className="sticky-col" style={{backgroundColor: "white"}} key={user.name}>{user.name}</td>
               <td>{user.week1}</td>
               <td>{user.week2}</td>
               <td>{user.week3}</td>
               <td>{user.week4}</td>
               <td>{user.week5}</td>
               <td>{user.week6}</td>
               <td>{user.week7}</td>
               <td>{user.week8}</td>
               <td>{user.week9}</td>
               <td>{user.week10}</td>
               <td>{user.week11}</td>
               <td>{user.week12}</td>
               <td>{user.week13}</td>
               <td>{user.week14}</td>
               <td>{user.week15}</td>
               <td>{user.week16}</td>
               <td>{user.week17}</td>
               <td>{user.week18}</td>
               </tr>)
       })
 
      
   weekResults = <div className="fullStandingsTable"><Table striped bordered hover style={{borderColor: colortheme.primary}}>
     <thead key={group}>
       <tr style={{backgroundColor: colortheme.secondary}}>
         <th className="sticky-col" style={{backgroundColor: colortheme.secondary}}></th>
         <th>1</th>
         <th>2</th>
         <th>3</th>
         <th>4</th>
         <th>5</th>
         <th>6</th>
         <th>7</th> 
         <th>8</th>
         <th>9</th>
         <th>10</th>
         <th>11</th>
         <th>12</th>
         <th>13</th>
         <th>14</th>
         <th>15</th>
         <th>16</th>
         <th>17</th> 
         <th>18</th> 
       </tr>
     </thead>
     <tbody>
     {fullStandingsTable}
     </tbody>
   </Table>
   </div>
 
  }
 return (
   <>
   {weekResults}
   </>)
}
 
export default WeeklyScores
 
