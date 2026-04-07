import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Player, Tile as TileType } from './types';
import Lobby from './components/Lobby';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import LiveChart from  './components/LlveChart';

const MAHJONG_SYMBOLS = [
  '🀄',
  '🀅',
  '🀆',
  '🀀',
  '🀁',
  '🀂',
  '🀃',
  '🀐',
  '🀙',
  '🀇',
  '🀕',
  '🀞',
  '🀌',
  '🀗',
  '🀠',
];

const INITIAL_MOCK_PLAYERS: Player[] = [
  { id: 'me', name: 'You', score: 120, isConnected: true },
  { id: 'p2', name: 'Sarah', score: 180, isConnected: true },
  { id: 'p3', name: 'Mike', score: 80, isConnected: true },
];

const MOCK_TILES: TileType[] = Array.from({ length: 30 }, (_, i) => ({
  id: `tile-${i}`,
  symbol: MAHJONG_SYMBOLS[i % 15],
  isFlipped: i === 7 || i === 12,
  isMatched: i < 4,
  lockedBy: i === 15 ? 'p2' : null,
}));

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  if (!userName) {
    return <Lobby onJoin={setUserName} />;
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🀄 MAHJONG COLLAB</h1>
        <div style={styles.badge}>ROOM: ORIENTAL_DRAGON_88</div>
      </header>

      <main style={styles.mainLayout}>
        <section style={styles.boardSection}>
          <Board
            tiles={MOCK_TILES}
            currentPlayerId="me"
            onSelectTile={(id) => console.log(id)}
          />
        </section>

        <aside style={styles.sidebar}>
          <Scoreboard players={INITIAL_MOCK_PLAYERS} currentPlayerId="me" />
          <LiveChart players={INITIAL_MOCK_PLAYERS} scoreHistory={[]} />
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
};

export default App;