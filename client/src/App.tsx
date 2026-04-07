import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import type { GameState, Player, Tile as TileType } from './types';
import Lobby from './components/Lobby';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import LiveChart from './components/LlveChart';
const INITIAL_MOCK_PLAYERS: Player[] = [
  { id: 'me', name: 'You', score: 12, isConnected: true },
  { id: 'p2', name: 'Sarah', score: 18, isConnected: true },
  { id: 'p3', name: 'Mike', score: 8, isConnected: true },
  { id: 'p4', name: 'D-Bot', score: 4, isConnected: false },
];

const SYMBOLS = [
  '🍎',
  '🍌',
  '🍇',
  '🍉',
  '🍓',
  '🍒',
  '🍍',
  '🥝',
  '🥭',
  '🥥',
  '🥑',
  '🥦',
  '🥕',
  '🌽',
  '🍄',
];

const MOCK_TILES: TileType[] = Array.from({ length: 30 }, (_, i) => ({
  id: `tile-${i}`,
  symbol: SYMBOLS[i % 15],
  isFlipped: i === 7 || i === 12,
  isMatched: i < 4,
  lockedBy: i === 15 ? 'p2' : null,
}));

const MOCK_HISTORY = [
  { timestamp: Date.now() - 120000, scores: { me: 0, p2: 0, p3: 0, p4: 0 } },
  { timestamp: Date.now() - 90000, scores: { me: 4, p2: 6, p3: 2, p4: 0 } },
  { timestamp: Date.now() - 60000, scores: { me: 8, p2: 12, p3: 4, p4: 2 } },
  { timestamp: Date.now() - 30000, scores: { me: 12, p2: 18, p3: 8, p4: 4 } },
];

const GAME_START_TIME = Date.now();

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const [gameState] = useState<GameState>({
    tiles: MOCK_TILES,
    players: INITIAL_MOCK_PLAYERS,
    scoreHistory: MOCK_HISTORY,
    isGameOver: false,
    startTime: GAME_START_TIME,
  });

  const handleJoin = (name: string) => {
    setUserName(name);
  };

  const handleSelectTile = (tileId: string) => {
    console.log(`Player ${userName} selected tile: ${tileId}`);
  };

  if (!userName) {
    return <Lobby onJoin={handleJoin} />;
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>Mahjong Memory</h1>

          <div style={styles.gameMeta}>
            <span style={styles.badge}>Session: #8821</span>
            <span style={styles.badge}>Status: In Progress</span>
          </div>
        </div>
      </header>

      <main style={styles.mainLayout}>
        <section style={styles.boardSection}>
          <Board
            tiles={gameState.tiles}
            currentPlayerId="me"
            onSelectTile={handleSelectTile}
          />
        </section>

        <aside style={styles.sidebar}>
          <Scoreboard
            players={gameState.players}
            currentPlayerId="me"
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
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    padding: '1rem 2rem',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 800,
    margin: 0,
    background: 'linear-gradient(to right, #3b82f6, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  gameMeta: {
    display: 'flex',
    gap: '1rem',
  },
  badge: {
    backgroundColor: '#334155',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#94a3b8',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    flex: 1,
  },
  boardSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
};

export default App;