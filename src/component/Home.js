import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {

    const [userChoice, setUserChoice] = useState(null);
    const [compChoice, setCompChoice] = useState(null);
    const [status, setStatus] = useState(null);
    const [userScore, setUserScore] = useState(0);
    const [compScore, setCompScore] = useState(0);
    const [moves, setMoves] = useState(6);
    const [result, setResult] = useState(null);
    const [user, setUser] = useState(null);
    const [play, setPlay] = useState(null);

    let choice = ['Rock','Paper','Scissor'];

    // Code for pick one
    const pick = (value) =>{
        if ( moves === 0 ){
            finalResult();
        } else {
            setMoves((previousState) => {return previousState - 1});
            setUserChoice(value);
            
            const random = choice[Math.floor(Math.random()*3)];
            setCompChoice(random);
        }
    }

    useEffect(() => {
        switch (userChoice + compChoice) {
            case 'RockScissor':
            case 'PaperRock':
            case 'ScissorPaper':
              win();
              break;
            case 'RockPaper':
            case 'ScissorRock':
            case 'PaperScissor':
              lose();
              break;
            case 'RockRock':
            case 'ScissorScissor':
            case 'PaperPaper':
              draw();
              break;
          }
    },[userChoice, compChoice])

    const win = () => {
        setUserScore((previousState) => {return previousState + 1});
        setStatus('You win!');
        clearField();
      }

    const lose = () => {
        setCompScore((previousState) => {return previousState + 1});
        setStatus('Computer win!');
        clearField();
      }

    const draw = () => {
        setStatus('Match Draw!');
        clearField();
      }

    const clearField = () => {
        setTimeout(() => {
            setStatus("");
            setUserChoice("");
            setCompChoice("");
        }, 2000);
      }

    const finalResult = () => {
        if (compScore > userScore) {
            setResult('Computer wins the Game...');

        } else if (compScore < userScore) {
            setResult('You wins the Game...');

        } else {
            setResult('Match Tie...');

        }
        send();
        setMoves("...");
        
    }

    // Play Again
    const reload = () => {
        window.location.reload();
      }

    // Save User
    const saveUser = () => {
        localStorage.setItem('name', user);
    }

    useEffect(() => {
        const player = localStorage.getItem('name');
            if (player) {
                setPlay(player);
            }
    });

    // Post Data
    const send = () => {
        const data = {
            "name": play,
            "userScore": userScore,
            "status": status,
            "compScore": compScore
        }

        const url = "http://localhost:8080/game/add"
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
        .then (res => {
            console.log(res);
        })
    }
    

  return (
    <>
      <div className="container">

        {/* Scores */}
        <div className="score d-flex">
            <div className="scores">
                <p><span className="board">Computer</span>:
                    <span id="computer_score"> {compScore}</span>
                </p>
                <p>
                    <span className="board">Player</span>:
                    <span id="user_score"> {userScore}</span>
                </p>
            </div>
            <div className="knob pt-3">
                <p>
                    <span className="board">Moves Left</span>:
                    <span id="user_score"> {moves}</span>
                </p>
            </div>
        </div>

        {/* Game */}
        { play &&
        <div>
            <div id="game">
                <div>
                    <h2>Player</h2>
                    <div>
                        <p id="userBefore" className="pt-2">
                        {status ? <button className="btn btn-primary">{userChoice}</button> : <button className="btn btn-primary">...</button>}  
                        </p>
                    </div>
                </div>

                <div> Vs
                    <div className="pt-3">
                        {status === 'You win!' && <button className="btn btn-outline-success">{status}</button> }
                        {status === 'Computer win!' && <button className="btn btn-outline-warning">{status}</button> }
                        {status === 'Match Draw!' && <button className="btn btn-outline-info">{status}</button> }
                    </div>
                </div>

                <div>
                    <h2>Robot</h2>
                    <div>
                        <p id="computerBefore" className="pt-2">
                        {status ? <button className="btn btn-primary">{compChoice}</button> : <button className="btn btn-primary">...</button>} 
                        </p>
                    </div>
                </div>
            </div><br/>

            {/* Action Message */}
            { !result &&
            <div>
                { status ? <p id="action-message">Wait...</p> : <p id="action-message">Pick One...</p>}
            </div>}

            {/* Select Item */}
            { !result &&
            <div className="weapons">
                <button onClick={() => pick('Rock')}>
                    <i className="far fa-hand-rock"></i>
                </button>
                <button onClick={() => pick('Paper')}>
                    <i className="far fa-hand-paper"></i>
                </button>
                <button onClick={() => pick('Scissor')}>
                    <i className="far fa-hand-scissors"></i>
                </button>
            </div>}

            {/* Display */}
            {result && 
            <div className="details">
                <p id="action-message">{result}</p>
                <button onClick={reload} className="btn btn-primary">Restart</button>
            </div>}
        </div>
        }

        {/* Login */}
        { !play && 
        <form className="flex py-2 justify-content-center">
            <input type="text" placeholder="Username" onChange={(e) => {setUser(e.target.value)}}/> <br/><br/>
            <button  onClick={saveUser} className="btn btn-primary">Play Now</button>
        </form>}


      </div>
    </>
  );
}

export default Home;
