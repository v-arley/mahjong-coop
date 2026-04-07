import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import Lobby from './components/Lobby';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import LiveChart from './components/LlveChart';
import { useSocket } from './hooks/useSocket';

const App: React.FC = () => {
  const { gameState, joinGame, selectTile, socket, isConnected } = useSocket();
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = (name: string) => {
    joinGame(name);
    setHasJoined(true);
  };

  if (!hasJoined) {
    return <Lobby onJoin={handleJoin} />;
  }

  if (!gameState) {
    return (
      <div style={styles.loadingContainer}>
        <h2 style={styles.loadingTitle}>Connecting to game...</h2>
        <p style={styles.loadingText}>
          {isConnected ? 'Waiting for game state...' : 'Trying to reach server...'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🀄 MAHJONG COLLAB</h1>
        <div style={styles.badge}>
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </header>

      <main style={styles.mainLayout}>
        <section style={styles.boardSection}>
          <Board
            tiles={gameState.tiles}
            currentPlayerId={socket?.id ?? ''}
            onSelectTile={selectTile}
          />
        </section>

        <aside style={styles.sidebar}>
          <Scoreboard
            players={gameState.players}
            currentPlayerId={socket?.id ?? ''}
          />
          <LiveChart
            players={gameState.players}
            scoreHistory={gameState.scoreHistory}
          />
        </aside>
      </main>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#062c1e',
    backgroundImage: 'radial-gradient(circle, #0a3d2b 0%, #062c1e 100%)',
    color: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(0,0,0,0.3)',
    borderBottom: '2px solid #b4975a',
  },
  logo: {
    fontSize: '1.4rem',
    letterSpacing: '2px',
    color: '#b4975a',
    margin: 0,
  },
  badge: {
    color: '#b4975a',
    fontSize: '0.8rem',
    border: '1px solid #b4975a',
    padding: '4px 12px',
    borderRadius: '4px',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '20px',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  boardSection: {
    flex: 1,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#062c1e',
    backgroundImage: 'radial-gradient(circle, #0a3d2b 0%, #062c1e 100%)',
    color: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loadingTitle: {
    margin: 0,
    fontSize: '2rem',
    color: '#b4975a',
  },
  loadingText: {
    marginTop: '0.75rem',
    color: '#d1d5db',
    fontSize: '1rem',
  },
};

export default App;