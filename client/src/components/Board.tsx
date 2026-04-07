import React from 'react';
import type { CSSProperties } from 'react';
import type { Tile as TileType } from '../types';
import Tile from './Tile';

interface BoardProps {
  tiles: TileType[];
  currentPlayerId: string;
  onSelectTile: (id: string) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, currentPlayerId, onSelectTile }) => {
  return (
    <div style={styles.boardContainer}>
      <div style={styles.grid}>
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            currentPlayerId={currentPlayerId}
            onTileClick={onSelectTile}
          />
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  boardContainer: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
};

export default Board;