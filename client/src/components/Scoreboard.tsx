import React from 'react';
import type { CSSProperties } from 'react';
import type { Player } from '../types';

interface ScoreboardProps {
  players: Player[];
  currentPlayerId: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, currentPlayerId }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Leaderboard</h2>

      {players.length === 0 ? (
        <div style={styles.emptyState}>No players connected</div>
      ) : (
        <div style={styles.list}>
          {sortedPlayers.map((player, index) => {
            const isMe = player.id === currentPlayerId;

            return (
              <div
                key={player.id}
                style={{
                  ...styles.playerRow,
                  ...(isMe ? styles.currentPlayerRow : {}),
                }}
              >
                <div style={styles.rankSection}>
                  <span style={styles.rank}>#{index + 1}</span>

                  <div style={styles.nameContainer}>
                    <span style={styles.name}>
                      {player.name}
                      {isMe && <span style={styles.meTag}> (You)</span>}
                    </span>

                    <div style={styles.statusContainer}>
                      <span
                        style={{
                          ...styles.statusDot,
                          backgroundColor: player.isConnected ? '#22c55e' : '#64748b',
                        }}
                      />
                      <span style={styles.statusText}>
                        {player.isConnected ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={styles.scoreSection}>
                  <span style={styles.scoreValue}>{player.score}</span>
                  <span style={styles.scoreLabel}>pts</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #334155',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 1.25rem 0',
    fontSize: '1.25rem',
    color: '#f8fafc',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  playerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    border: '1px solid #334155',
    transition: 'transform 0.2s ease',
  },
  currentPlayerRow: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e293b',
    boxShadow: 'inset 0 0 0 1px #3b82f6',
  },
  rankSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  rank: {
    fontSize: '0.875rem',
    fontWeight: 800,
    color: '#94a3b8',
    minWidth: '24px',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#f1f5f9',
  },
  meTag: {
    fontSize: '0.75rem',
    color: '#3b82f6',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '2px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  statusText: {
    fontSize: '0.65rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  scoreSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#3b82f6',
  },
  scoreLabel: {
    fontSize: '0.65rem',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  emptyState: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.875rem',
    padding: '1rem',
  },
};

export default Scoreboard;