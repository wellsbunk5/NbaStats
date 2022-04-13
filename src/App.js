import React from 'react';
import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import Header from './Header';
import { useFetchTeamData } from './ServerApi';
import TeamList from './TeamList';
import AnimatedTransition from './AnimatedTransition';



function App() {
  const teamsData = useFetchTeamData();  

  if (!teamsData.eastTeams["14"] || !teamsData.westTeams["14"]) {
    
    return <LoadingIndicator />;

  } else {

    return (
      <Router>
        <div className='App'>
            <Header />
            <AnimatedTransition teamsData={teamsData}/>
          <div id="teamListArea">
            <div id="teamList">
              <TeamList teamsData={teamsData} />
            </div>
          </div>
        </div>
      </Router>
    );
    
  }

}

export default App;
