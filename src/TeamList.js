import {Link} from 'react-router-dom';
import './TeamList.css';

function TeamListItem (props) {
    let team = props.team;
  
    return (<li className='teamListItem'
        key={team.conference + team.ranking}>
        <span>
          <img src={team.logo} className="teamLogo" />
        </span>
        <Link className='teamNameSpan' to={`/${team.conference}/${team.ranking}`}>
          {team.teamName}
        </Link>
      </li>);
}

function TeamList(props) {
    let {eastTeams, westTeams} = props.teamsData;
    let allTeams = {};
  
    const alphabetizeAllTeams = function(teams, conference) {
      for (let i=1; i<=15; i++) {
        allTeams[teams[i].code] = {
          teamName: teams[i].teamName,
          logo: teams[i].logo,
          conference: conference,
          ranking: i
        }
      }
    };
  
  
      alphabetizeAllTeams(eastTeams, "east");
      alphabetizeAllTeams(westTeams,"west");
  
    return (
      <>
        <h1 className='teamListTitle'>NBA Teams</h1>
        <ul>
          {
            Object.keys(allTeams).map((oneKey,i)=>{
              return (
                  <TeamListItem  team={allTeams[oneKey]} />
                )
            })
          }
        </ul>
      </>
    );
}

export default TeamList;