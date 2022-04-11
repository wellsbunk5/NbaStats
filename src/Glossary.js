import './Glossary.css'

function Glossary () {
    return (
      <div className='Glossary'>
        <br/>
        <div className='Glossary-Header'>Glossary</div>
        <div className='glossary-flex'>
          <div className='Left-Section'>
            <div className='GlossaryInfo'>W: <span className='no-bold'>Wins</span></div>
            <div className='GlossaryInfo'>L: <span className='no-bold'>Losses</span></div>
            <div className='GlossaryInfo'>Pct: <span className='no-bold'>Win Percentage</span></div>
            <div className='GlossaryInfo'>GB: <span className='no-bold'>Games Behind</span></div>
          </div>
          <div className='Right-Section'>
          <div className='GlossaryInfo'>Home: <span className='no-bold'>Home Record</span></div>
          <div className='GlossaryInfo'>Away: <span className='no-bold'>Away Record</span></div>
          <div className='GlossaryInfo'>Streak: <span className='no-bold'>Current Win/Lose Streak</span></div>
          <div className='GlossaryInfo'>Last 10: <span className='no-bold'>Record last 10 games</span></div>
          </div>
        </div>
      </div>
    );
}

export default Glossary;