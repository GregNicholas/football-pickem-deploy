import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { weekThreeGames } from '../matchupsData';
const deadline = new Date("Thu Sep 23 2021 17:20:00 GMT-0700 (Pacific Daylight Time)");
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
    const weeklyPicks = [];
    const pickedGames = [];

    const thisWeekGames = weekThreeGames;

    // React.useEffect(() => {
    //   const fetchData = async () => {
    //     const data = await db.collection("schedule").get()
    //     setSchedule(data.docs.map(doc => doc.data()));
    //   }
    //   fetchData()
    // }, [])

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
                  <tr key={away}>
                    <td className="picked">{away}</td>
                    <td>{home}</td>
                  </tr>)
                : pickedGames.push(
                  <tr key={home}>
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
      db.collection("week3").doc(currentUser.uid).set({name: currentUser.displayName, picks: games, MNFscore: MNFref.current.value});
    }

  
      Object.keys(thisWeekGames).map(g => {
        const game = thisWeekGames[g];
        const away = game["away"];
        const home = game["home"];
        weeklyPicks.push(
          <Form.Group className="gameLine" id={g} key={g}>
                  <Form.Check className="formCheck"
                    inline
                    label={away}
                    value={away}
                    name={g}
                    type={"radio"}
                    onChange={handleChange}
                    id={game.away}
                    required
                  /> <span>at &nbsp;&nbsp;</span>
                  <Form.Check className="formCheck"
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
    
      weeklyPicks.push(
      <Form.Group className="mb-3" key="mnf">
        <Form.Label>Monday Night Score</Form.Label>
        <Form.Control type="text" placeholder="enter score prediction" ref={MNFref} required />
      </Form.Group>
      )

    return (
        <>
          <Card>
            <Card.Body>
            <h2 className="text-center mb-4 vikings">Week 3 SKOL VIKES</h2>
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
              <Form onSubmit={handleSubmit} className="mb-3 weeklyPicks">
                {weeklyPicks}
                <Button disabled={loading || lockPicks} className="w-100" type="submit">{buttonName}</Button>
              </Form> 
            </>
          } 
            </Card.Body>
          </Card>
          <Link to={{pathname: "/standings"}} className="btn btn-success w-100 mt-3">
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