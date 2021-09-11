import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
//import { doc, setDoc } from "firebase/firestore";
const deadline = new Date("Thu Sep 09 2021 17:15:00 GMT-0700 (Pacific Daylight Time)");
const now = new Date()
const lockPicks = deadline < now;

const MakePicks = () => {
    let buttonName;
    lockPicks ? buttonName = "Too Late!" : buttonName = "Submit Picks!";
    const [games, setGames] = useState({});
    const [userPicks, setUserPicks] = useState([]);
    const [error, setError] = useState("");
    const [picksMade, setPicksMade] = useState();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const MNFref = useRef();
    const schedule = [];
    const pickedGames = [];

      const thisWeekGames = {
        game1: {
          away: "Dallas",
          home: "Tampa Bay", 
          time: "Thursday, Sep. 9, 7:20pm CT",
        },
        game2: {
          away: "Pittsburgh", 
          home: "Buffalo", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
        game3: {
          away: "NY Jets", 
          home: "Carolina", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game4: {
          away: "Jacksonville", 
          home: "Houston", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game5: {
          away: "Arizona", 
          home: "Tennessee", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game6: {
          away: "LA Chargers", 
          home: "Washington", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game7: {
          away: "Philadelphia", 
          home: "Atlanta", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game8: {
          away: "Seattle", 
          home: "Indianapolis", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game9: {
          away: "Minnesota", 
          home: "Cincinnati", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game10: {
          away: "San Francisco", 
          home: "Detroit", 
          time: "Sunday, Sep. 12, 12:00pm CT",
        },
		game11: {
          away: "Cleveland", 
          home: "Kansas City", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		game12: {
          away: "Miami", 
          home: "New England", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		game13: {
          away: "Denver", 
          home: "NY Giants", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
		game14: {
          away: "Green Bay", 
          home: "New Orleans", 
          time: "Sunday, Sep. 12, 3:25pm CT",
        },
	    game15: {
          away: "Chicago", 
          home: "LA Rams", 
          time: "Sunday, Sep. 12, 7:20pm CT",
        },
		game16: {
          away: "Baltimore", 
          home: "Las Vegas", 
          time: "Monday, Sep. 13, 7:15pm CT",
        },
      }

    const handleChange = (e) => {
      const game = e.target.name;
      const winner = e.target.value;
      const updated = JSON.parse(JSON.stringify(games));
      updated[game] = winner;
      setGames(updated)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            setPicksMade(true);
            Object.keys(games).map(g => {
              const game = thisWeekGames[g];
              const away = game["away"];
              const home = game["home"];
              const userPick = games[g];
              userPick === away ?
                pickedGames.push(
                  <tr>
                    <td className="picked">{away}</td>
                    <td>{home}</td>
                  </tr>)
                : pickedGames.push(
                  <tr>
                    <td>{away}</td>
                    <td className="picked">{home}</td>
                  </tr>);

            setUserPicks(pickedGames);
              
              return null;
            });
            uploadPicks();
        } catch {
            setError('Picks not submitted');
        }
        setLoading(false);
    }

    const uploadPicks = async () => {
      db.collection("hcweek1").doc(currentUser.uid).set({name: currentUser.displayName, picks: games, MNFscore: MNFref.current.value});
    }

      Object.keys(thisWeekGames).map(g => {
        const game = thisWeekGames[g];
        const away = game["away"];
        const home = game["home"];
        const time = game["time"];
        schedule.push(
          <Form.Group className="gameLine" id={g} key={g}>
                  <Form.Check
                    inline
                    label={away}
                    value={away}
                    name={g}
                    type={"radio"}
                    onChange={handleChange}
                    id={game.away}
                    required
                  /> <span>at &nbsp;&nbsp;</span>
                  <Form.Check
                    inline
                    label={home}
                    value={home}
                    name={g}
                    type={"radio"}
                    onChange={handleChange}
                    id={home}
                    required
                  />
                </Form.Group>
        )
        return null;
      });
    
      schedule.push(
      <Form.Group className="mb-3" key="mnf">
        <Form.Label>Monday Night Score</Form.Label>
        <Form.Control type="text" placeholder="enter score prediction" ref={MNFref} required />
      </Form.Group>
      )

    return (
        <>
          <Card>
            <Card.Body>
            <h2 className="text-center mb-4 nflChat">Make HARDCORE Picks</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {picksMade && <Alert variant="success">Picks Submitted!</Alert> }
            <p><strong>Name: </strong> {currentUser.displayName}</p>
          {!picksMade && <>
            <Table striped bordered hover>
            <thead>
                <tr>
                  <th>AWAY</th>
                  <th>HOME</th>
                </tr>
              </thead>
            </Table>
              <Form onSubmit={handleSubmit} className="mb-3">
                {schedule}
                <Button disabled={loading || lockPicks} className="w-100" type="submit">{buttonName}</Button>
              </Form> 
            </>
          } 
            </Card.Body>
          </Card>
          <Link to={{pathname: "/hardcore-standings"}} className="btn btn-success w-100 mt-3">
                Press to View Group Results
          </Link>
          {picksMade && <Table className="submittedTable" striped bordered hover>
            <thead>
              <tr>
                <th>Away</th>
                <th>Home</th>
              </tr>
            </thead>
            <tbody>
              {userPicks}
            </tbody>
          </Table> }   
        </>
    )
}

export default MakePicks