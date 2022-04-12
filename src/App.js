import React from 'react';
import './App.css';
import { Route,  Routes, HashRouter as Router} from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import Header from './Header';
import { useFetchTeamData } from './ServerApi';
import TeamList from './TeamList';
import Standings from './Standings';
import TeamStatPage from './TeamStatPage';

function App() {
  const teamsData = useFetchTeamData();

  

  if (!teamsData.eastTeams["14"] || !teamsData.westTeams["14"]) {
    
    return <LoadingIndicator />;

  } else {

    return (
      <Router>
        <div className='App'>
            <Header />
          <div id="standings">
              <Routes>
                  <Route path="/:conference/:ranking"  
                  element={
                    <TeamStatPage teamsData={teamsData} />
                  }/>
                  

                <Route path="/"  element={
                    <Standings teamsData={teamsData} />
                  }/>
              </Routes>
          </div>
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
