import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Player, ScoreSnapshot } from '../types';

interface LiveChartProps {
  players: Player[];
  scoreHistory: ScoreSnapshot[];
}

const LiveChart: React.FC<LiveChartProps> = ({ players, scoreHistory }) => {
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  const chartData = useMemo(() => {
    return scoreHistory.map((snapshot) => {
      const dataPoint: Record<string, string | number> = {
        time: new Date(snapshot.timestamp).toLocaleTimeString([], {
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      players.forEach((player) => {
        dataPoint[player.name] = snapshot.scores[player.id] || 0;
      });

      return dataPoint;
    });
  }, [scoreHistory, players]);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Score History</h3>

      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={styles.tooltip}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />

            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="circle"
            />

            {players.map((player, index) => (
              <Line
                key={player.id}
                type="monotone"
                dataKey={player.name}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                animationDuration={300}
                isAnimationActive
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #334155',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '1.5rem',
  },
  title: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    color: '#f8fafc',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  chartWrapper: {
    width: '100%',
    height: '250px',
  },
  tooltip: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc',
  },
};

export default LiveChart;