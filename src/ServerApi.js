import { useState, useEffect } from 'react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'ab4da2b0c6msh2f8566576f12cb4p1c0022jsn8b6cb24e4d85'
    }
}

function useFetchPreviousGames(team) {
    const [previousGames, setPreviousGames] = useState([]);
  
    useEffect(() => {
  
      const cacheGames = function (gameData, teamName) {
        const STARTING_GAME = 86;
        let previousFiveGames = [];
        let gamesCached = 0;
        let currentGameNumber = STARTING_GAME;
        let game;
  
        const createPreviousGameObject = function (game, teamName) {
          let opponentName;
          let opponentScore;
          let teamScore;
          let winOrLoss;
  
          if (game.teams.home.name === teamName) {
            opponentName = game.teams.visitors.name;
            opponentScore = game.scores.visitors.points;
            teamScore = game.scores.home.points;
          } else {
            opponentName = game.teams.home.name;
            opponentScore = game.scores.home.points;
            teamScore = game.scores.visitors.points; 
          }
  
          winOrLoss = teamScore > opponentScore ? "W" : "L";
  
          return { opponentName, opponentScore, teamScore, winOrLoss}
        };
  
        while (gamesCached < 5) {
     
          game = gameData.response[currentGameNumber];
  
          if (game.date.end) {
            previousFiveGames.push(createPreviousGameObject(game, teamName));
            gamesCached += 1;
          }
  
          currentGameNumber -= 1;
        }
  
        setPreviousGames(previousFiveGames);
      }
  
      let mounted = true;
  
      fetch(`https://api-nba-v1.p.rapidapi.com/games?season=2021&team=${team.id}`, options)
      .then(response => response.json())
      .then(jsonResults => {
        if (mounted) {
          cacheGames(jsonResults, team.teamName);
  
        }
      });
  
      return () => mounted = false;
    }, [team]);
  
    return previousGames;
}


  
function useFetchTeamData() {
  
    const East_URL = "https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2021&conference=east"
    const WEST_URL = "https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2021&conference=west"
    
    const [eastTeams, setEastTeams] = useState({});
    const [westTeams, setWestTeams] = useState({});
  
    useEffect(() => {
      const createTeamObject = function(teamsArray) {
        let confRank;
        let output = {};
        
  
        teamsArray.response.forEach(teamInArray => {
          confRank = teamInArray.conference.rank;
  
          let streak = teamInArray.winStreak ? `W${teamInArray.streak}` : `L${teamInArray.streak}`;
          let lastTen = `${teamInArray.win.lastTen}-${teamInArray.loss.lastTen}`;
  
          output[confRank] = {
            teamName: teamInArray.team.name,
            code: teamInArray.team.code,
            id: teamInArray.team.id,
            logo: teamInArray.team.logo,
            confName: teamInArray.conference.name,
            totalWins: teamInArray.win.total,
            winPercentage: teamInArray.win.percentage,
            lastTen: lastTen,
            homeRecord: `${teamInArray.win.home}-${teamInArray.loss.home}`,
            awayRecord: `${teamInArray.win.away}-${teamInArray.loss.away}`,
            totalLosses: teamInArray.loss.total,
            gamesBehind: teamInArray.gamesBehind,
            streak: streak,
            winStreak: teamInArray.winStreak
          }
        });
  
        return output;
      };
  
      const cacheTeams = function([eastData, westData]) {
        let outputEast = {};
        let outputWest = {};
  
       outputEast = createTeamObject(eastData);
       outputWest = createTeamObject(westData);
  
       setEastTeams(outputEast);
       setWestTeams(outputWest);
  
      };
  
      let mounted = true;
  
      Promise.all([East_URL,WEST_URL].map(url =>
        fetch(url,options).then(response => response.json())
      )).then(jsonResults => {
          if (mounted) {
            cacheTeams(jsonResults);
  
          }
        });
  
        return () => mounted = false;
    }, []);
  
    return {eastTeams, westTeams}
}

export {useFetchPreviousGames, useFetchTeamData };