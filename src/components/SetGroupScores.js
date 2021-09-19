import React, { useState, useRef } from 'react';
import { db } from '../firebase';

const SetGroupScores = ({ week, finals, group }) => {
  const [thisWeek, setThisWeek] = useState([]);
  const [groupScores, setGroupScores] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection(week).get()
      setThisWeek(data.docs.map(doc => doc.data()));
      const gScores = await db.collection(group).get()
      setGroupScores(gScores.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  if(thisWeek.length > 0 && groupScores.length > 0) {
    console.log(finals)
    thisWeek.map(user => {
      let numCorrect = 0;
        Object.keys(finals).map(game => {
          const userPick = user.picks[game];
          let winner = finals[game];
          if (userPick === winner){
            numCorrect++;
          }
             
        return null;
        });

        const setUserScore = async () => {
          //db.collection(group).collection("w1").doc(user.name).set({name: user.name, score: numCorrect});
          //db.collection(group).collection(user.name).doc("week2").set({score: numCorrect});
          const userObj = {};
          userObj.name = user.name;
          userObj[week] = numCorrect;
          if (groupScores.filter(e => e.name === user.name).length > 0) {
            return db.collection(group).doc(user.name).update(userObj)
            .then(() => {
              console.log("Updated document")
            })
            .catch((error) => {
              console.error("Error updating document", error);
            });
          } else {
            return db.collection(group).doc(user.name).set(userObj)
            .then(() => {
              console.log("created document")
            })
            .catch((error) => {
              console.error("Error creating document", error);
            });
          }
        }
        setUserScore();
        
        return <>user score uploaded</>
    })
  }
   
 
  return (
    <>
      group scores 
    </>)
}

export default SetGroupScores

