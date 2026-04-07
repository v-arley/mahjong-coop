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
  );
};

const styles: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '15px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(180, 151, 90, 0.2)',
  },
};

export default Board;