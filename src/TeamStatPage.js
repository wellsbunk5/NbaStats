import {useFetchPreviousGames} from './ServerApi';
import { useParams } from 'react-router';
import './TeamStatPage.css';
import './App.css'

function TeamStatHeader(props) {
    return (
      <div className="container">
        <div id="teamTitle">
        <img src={props.team.logo} />
        <div id="teamName"><b>{props.team.teamName}</b></div>
      </div>
    </div>
    );
}

function TeamStatBox (props) {
  const {statValue, label, stat} = props;
  let colorClass = "";
  let winOrLoss = "";

  if (props.winOrLoss) {
    winOrLoss = props.winOrLoss;

    if (winOrLoss === "W" ) {
      colorClass = "greentext";

    }
    else {
      colorClass = "redtext";
    }

  }

  return (
    <div className="statWrapper" id={stat}>
      <div className="statHeader"><b>{label}</b></div>
      <div className="statBox"><span className={colorClass}>{winOrLoss}</span>{statValue}</div>
  </div>
  );
}

function TeamGamesSection (props) {
    let previousGames = props.previousGames;
    let previousGameElements = [];
    let header;
    let value;
  
    previousGames.forEach(game => {
      header = `Vs ${game.opponentName}`;
      value = `${game.teamScore}-${game.opponentScore}`;
      
      previousGameElements.push(<TeamStatBox statValue={value} stat="" label={header} winOrLoss={game.winOrLoss}/>)
    });
  
    return (
      <div id="previousGames">
        <div className='statHeading'><b>Last 5 Games</b></div>
        <div id="gamesSection">
          {previousGameElements}
        </div>
      </div>
    );
}

function TeamStatSection (props) {
    const statLabels = ["Wins", "Losses", "Percentage", "Games Behind", "Home", "Away", "Streak", "Last 10"];
    const correctKeys = ["totalWins", "totalLosses", "winPercentage", "gamesBehind", "homeRecord", "awayRecord", "streak", "lastTen"];
    let correctKey;
    let statValue;
    let statBoxElements = [];
  
  
    statLabels.forEach((label, index) => {
      correctKey = correctKeys[index];
      statValue = props.team[correctKey];
      statBoxElements.push(<TeamStatBox stat={correctKey} statValue={statValue} label={label} />);
      });
  
    return (
      <div id="stats">
        <div className='statHeading'><b>Stats</b></div>
        <div id="statsSection">
          {statBoxElements}
        </div>
      </div>
    );
}

function TeamStatPage (props) {
    const params = useParams();
    const {eastTeams, westTeams} = props.teamsData;
    const EAST = "east";
    const WEST = "west";
    let team;
  
  
    const getCorrectTeam = function (conference, ranking) {
      if (conference === EAST) {
        return eastTeams[ranking];
      }
      if (conference === WEST) {
        return westTeams[ranking];
      }
    };
  
    team = getCorrectTeam(params.conference, params.ranking);
    
  
    const previousGames = useFetchPreviousGames(team);
  
  
    return (
      <div className='nav-unit' id='standings'>
        <TeamStatHeader team={team} />
        <br/>
        <TeamStatSection team={team}/>
        <br/>
        <TeamGamesSection previousGames={previousGames}/>
      </div>
    );
}

export default TeamStatPage;