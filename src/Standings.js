import './Standings.css';
import Glossary from './Glossary';

function TableRow (props) {
    let team = props.team;
    let teamRanking = props.rank;
  
    return (
      <tr>
        <td style={{textAlign: "left"}}><span>{teamRanking}.</span> {team.teamName}</td>
        <td>{team.totalWins}</td>
        <td>{team.totalLosses}</td>
        <td>{team.winPercentage}</td>
        <td>{team.gamesBehind}</td>
        <td>{team.homeRecord}</td>
        <td>{team.awayRecord}</td>
        <td>{team.streak}</td>
        <td>{team.lastTen}</td>
      </tr>
    )
  
}

function Table(props) {
    let conference = props.conference;
    let tableRows = [];
  
    const createTableRows = function (conferenceData) {
      let rows = [];
  
      for (let i=1; i<=15; i++) {
        rows.push(<TableRow team={conferenceData[i]} rank={i} />)
      }
   
      return rows;
    };
  
    tableRows = createTableRows(conference);
  
    return (
    <table className='striped centered responsive-table'>
      <thead>
        <tr>
          <th></th>
          <th>W</th>
          <th>L</th>
          <th>Pct</th>
          <th>GB</th>
          <th>Home</th>
          <th>Away</th>
          <th>Streak</th>
          <th>Last 10</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>);
}

function Standings(props) {
    let {eastTeams, westTeams} = props.teamsData;
  
    return (
      <>
        <h1 className='StandingsHeading'>NBA Standings 2021-22</h1>
        <br/>
        <div className='ConferenceHeading'><b>Eastern Conference</b></div>
        <Table conference={eastTeams} />
        <br/>
        <div className='ConferenceHeading'><b>Western Conference</b></div>
        <Table conference={westTeams} />
        <br/>
        <Glossary />
      </>
    )
}

export default Standings;