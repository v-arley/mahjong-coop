import React from 'react';
import type { CSSProperties } from 'react';
import type { Tile as TileType } from '../types';

interface TileProps {
  tile: TileType;
  currentPlayerId: string;
  onTileClick: (id: string) => void;
}

const Tile: React.FC<TileProps> = ({ tile, currentPlayerId, onTileClick }) => {
  const isLockedByOther = tile.lockedBy !== null && tile.lockedBy !== currentPlayerId;
  const isLockedByMe = tile.lockedBy === currentPlayerId;
  const isRevealed = tile.isFlipped || tile.isMatched || tile.lockedBy !== null;

  const pulseKeyframes = `
    @keyframes pulse-border {
      0% { box-shadow: 0 0 0 0px rgba(245, 158, 11, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
      100% { box-shadow: 0 0 0 0px rgba(245, 158, 11, 0); }
    }
  `;

  const handleClick = () => {
    if (tile.isMatched) return;
    if (isLockedByOther) return;
    if (tile.isFlipped && !isLockedByMe) return;

    onTileClick(tile.id);
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <style>{pulseKeyframes}</style>

      <div
        style={{
          ...styles.tileInner,
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div style={styles.tileBack}>
          <span style={styles.backPattern}>?</span>
        </div>

        <div
          style={{
            ...styles.tileFront,
            ...(tile.isMatched ? styles.matchedState : {}),
            ...(isLockedByOther ? styles.lockedState : {}),
            ...(isLockedByMe ? styles.myTurnState : {}),
          }}
        >
          <span style={styles.symbol}>{tile.symbol}</span>
          {isLockedByOther && <div style={styles.lockBadge}>🔒</div>}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    aspectRatio: '1 / 1',
    perspective: '1000px',
    cursor: 'pointer',
    width: '100%',
  },
  tileInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
  },
  tileBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#334155',
    border: '2px solid #475569',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tileFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotateY(180deg)',
    boxSizing: 'border-box',
    fontSize: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  symbol: {
    userSelect: 'none',
  },
  backPattern: {
    fontSize: '1.5rem',
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  matchedState: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
    color: '#166534',
  },
  lockedState: {
    borderColor: '#f59e0b',
    animation: 'pulse-border 2s infinite',
    opacity: 0.8,
  },
  myTurnState: {
    borderColor: '#3b82f6',
    borderWidth: '3px',
  },
  lockBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    fontSize: '0.75rem',
    backgroundColor: '#f59e0b',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Tile;