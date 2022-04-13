import Standings from './Standings';
import TeamStatPage from './TeamStatPage';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {Route, Routes, useLocation} from 'react-router-dom';

function AnimatedTransition(props) {
    const location = useLocation();
    const teamsData = props.teamsData;
  
    return (
      <TransitionGroup component={null}>
        <CSSTransition
            key={location.key}
            timeout={350}
            classNames={"nav-unit"}
            unmountOnExit
        >
            <Routes location={location}>
                <Route path="/:conference/:ranking"  
                element={
                    <TeamStatPage teamsData={teamsData} />
                }/>
                
  
              <Route path="/"  
              element={
                  <Standings teamsData={teamsData} />               
               }/>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    );
}

export default AnimatedTransition;