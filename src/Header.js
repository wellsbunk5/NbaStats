import {Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
      <header>
        <div id="title-block">
          <div className="title">NBA STATS</div>
          <div className="subtitle">By Wells Bunker</div>
        </div>
        <div id="nav-bar">
          <Link to="/" className='nav-bar-textStyle'>
            <span>Standings </span>
            <i className='inline-icon material-icons'>home</i>
          </Link>
        </div>
      </header>
    );
  }
  
  export default Header;