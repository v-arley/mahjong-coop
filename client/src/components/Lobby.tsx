import React, { useState } from 'react';
import type { FormEvent } from 'react';

interface LobbyProps {
  onJoin: (name: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoin }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      onJoin(name.trim());
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Mahjong Memory</h1>
          <p style={styles.subtitle}>Enter your name to join the multiplayer session</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="playerName" style={styles.label}>
              Player Name
            </label>
            <input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DragonMaster"
              style={styles.input}
              maxLength={15}
              autoFocus
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            style={{
              ...styles.button,
              ...(name.trim() ? styles.buttonActive : styles.buttonDisabled),
            }}
          >
            Join Game
          </button>
        </form>

        <div style={styles.footer}>
          <span style={styles.statusBadge}>● Ready to join</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
    margin: 0,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #334155',
    textAlign: 'center',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 800,
    color: '#f8fafc',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    marginTop: '0.5rem',
    color: '#94a3b8',
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: '0.5rem',
    marginLeft: '0.25rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#ffffff',
  },
  buttonActive: {
    backgroundColor: '#3b82f6',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
  },
  buttonDisabled: {
    backgroundColor: '#334155',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  footer: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #334155',
  },
  statusBadge: {
    fontSize: '0.75rem',
    color: '#10b981',
    fontWeight: 500,
  },
};

export default Lobby;