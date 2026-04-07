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
  const isRevealed = tile.isFlipped || tile.isMatched || Boolean(tile.lockedBy);

  const getSymbolColor = (symbol: string) => {
    if (['🀄', '🀇', '🀐', '🀙'].includes(symbol)) return '#d01010';
    if (['🀅', '🀑', '🀚', '🀈'].includes(symbol)) return '#0f7d12';
    return '#1049d0';
  };

  const handleClick = () => {
    if (!tile.isMatched && !isLockedByOther) {
      onTileClick(tile.id);
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        cursor: tile.isMatched || isLockedByOther ? 'default' : 'pointer',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          ...styles.tileInner,
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div style={styles.tileBack}>
          <div style={styles.jadeTexture} />
        </div>

        <div
          style={{
            ...styles.tileFront,
            ...(tile.isMatched ? styles.matchedState : {}),
            ...(isLockedByOther ? styles.lockedState : {}),
          }}
        >
          <span style={{ ...styles.symbol, color: getSymbolColor(tile.symbol) }}>
            {tile.symbol}
          </span>
          {isLockedByOther && <div style={styles.lockIcon}>🔒</div>}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    aspectRatio: '3 / 4',
    perspective: '1000px',
    width: '100%',
  },
  tileInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transformStyle: 'preserve-3d',
  },
  tileBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#065f46',
    border: '3px solid #047857',
    borderRadius: '6px',
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 4px 4px 0px #022c22',
  },
  jadeTexture: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
    backgroundImage:
      'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
    backgroundSize: '10px 10px',
  },
  tileFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    backgroundColor: '#fefae0',
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fefae0 100%)',
    border: '1px solid #d4d4d8',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-4px 4px 0px #d4d4d8, inset 0 0 10px rgba(0,0,0,0.05)',
  },
  symbol: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    userSelect: 'none',
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))',
  },
  matchedState: {
    backgroundColor: '#ecfdf5',
    boxShadow: '-4px 4px 0px #10b981',
    border: '2px solid #10b981',
  },
  lockedState: {
    boxShadow: '-4px 4px 0px #f59e0b',
    border: '2px solid #f59e0b',
  },
  lockIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    fontSize: '1rem',
  },
};

export default Tile;