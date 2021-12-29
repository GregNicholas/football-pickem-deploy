import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { weekSixteenGames, weekSeventeenGames, weekEighteenGames } from '../matchupsData';

const ScheduleContext = React.createContext();

function ScheduleContextProvider({ children }) {
  const [schedule, setSchedule] = useState({})
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("schedule").get()
      setSchedule(data.docs.map(doc => doc.data()));
      console.log(data)
    }
    if(currentUser) {
      fetchData()
    }
  }, [currentUser])

  // deadline = schedule[0].deadline
  // weekGames = schedule[0].schedule
  // weekNumber = schedule[0].week.number


//   let thisWeekGames
//   switch(weekGames){
//   case "weekSixteenGames":
//     thisWeekGames = weekSixteenGames;
//     // setThisWeekGames(weekSixteenGames)
//     break;
//   case "weekSeventeenGames":
//     thisWeekGames = weekSixteenGames;
//     // setThisWeekGames(weekSeventeenGames)
//     break;
//   case "weekEighteenGames":
//     thisWeekGames = weekSixteenGames;
//     // setThisWeekGames(weekEighteenGames)
//     break;
// } 
    

  return (
    <ScheduleContext.Provider
      value={{
        schedule
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export { ScheduleContextProvider, ScheduleContext };
