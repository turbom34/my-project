import React, { useState, useEffect } from 'react';

function Sports() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/sports')
      .then(response => response.json())
      .then(data => setScores(data))
      .catch(error => console.error(error));
  }, []);

  const teamCellStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #dcdcdc',
    textTransform: 'uppercase',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white'
  };

  const scoreCellStyle = {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #dcdcdc',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  const homeTeamCellStyle = {
    ...teamCellStyle,
    borderRight: '1px solid #dcdcdc',
    backgroundColor: 'blue'
  };

  const awayTeamCellStyle = {
    ...teamCellStyle,
    backgroundColor: 'red'
  };

  const homeScoreCellStyle = {
    ...scoreCellStyle,
    borderRight: '1px solid #dcdcdc',
    backgroundColor: 'blue'
  };

  const awayScoreCellStyle = {
    ...scoreCellStyle,
    backgroundColor: 'red'
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: '#23272A',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      <div style={{ 
        background: 'none',
        justifyContent: 'center', 
        padding: '20px', 
        borderRadius: '20px',
        boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 2fr',
        gap: '10px',
        alignItems: 'center',
        width: '63%',
        textAlign: 'center'
      }}>
        <div style={homeTeamCellStyle}>HOME TEAM</div>
        <div style={homeScoreCellStyle}>HOME SCORE</div>
        <div style={awayScoreCellStyle}>AWAY SCORE</div>
        <div style={awayTeamCellStyle}>AWAY TEAM</div>
        {scores.map((game, index) => (
          <React.Fragment key={index}>
            <div style={homeTeamCellStyle}>{game.home_team}</div>
            <div style={homeScoreCellStyle}>{game.home_score}</div>
            <div style={awayScoreCellStyle}>{game.away_score}</div>
            <div style={awayTeamCellStyle}>{game.away_team}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Sports;







