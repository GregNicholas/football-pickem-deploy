import React, { useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../firebase';

const SetGroupScores = ({ week, finals, group }) => {
    week.map(user => {
      let numCorrect = 0;
        Object.keys(finals[0].results).map(game => {
          const userPick = user.picks[game];
          let winner = finals[0].results[game];
          if (userPick === winner){
            numCorrect++;
          }
             
        return null;
        });

        const setUserScore = async () => {
          //db.collection(group).collection("w1").doc(user.name).set({name: user.name, score: numCorrect});
          db.collection(group).doc(user.name).set({name: user.name, weeks: {week1: numCorrect}});
        }
        setUserScore();
        return 
      <>user score uploaded</>
    }) 
  
 
  return (
    <>
      group scores set
    </>)
}

export default SetGroupScores

