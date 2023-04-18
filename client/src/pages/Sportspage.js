import React from 'react';
import Sports from '../components/Sports';

function SportsPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#23272A',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ margin: '20px 0' }}>LIVE SCORES</h1>
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%'
      }}>
        <Sports />
      </div>
    </div>
  );
}

export default SportsPage;

