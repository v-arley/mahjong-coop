import { Tile, Player, GameState, ScoreSnapshot } from './types';

const BASE_SYMBOLS = [ 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5' ];

function shuffleTiles(tiles: Tile[]): Tile[] {
	const shuffled = [...tiles];

	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		const currentTile = shuffled[index];
		const randomTile = shuffled[randomIndex];

		if (!currentTile || !randomTile) {
			continue;
		}

		shuffled[index] = randomTile;
		shuffled[randomIndex] = currentTile;
	}

	return shuffled;
}

function getSymbols(pairCount: number): string[] {
	return Array.from({ length: pairCount }, (_, index) => BASE_SYMBOLS[index] ?? `T${index + 1}`);
}

function createScoreSnapshot(players: Player[]): ScoreSnapshot {
	return {
		timestamp: Date.now(),
		scores: players.reduce<Record<string, number>>((scores, player) => {
			scores[player.id] = player.score;
			return scores;
		}, {}),
	};
}

export function createGame(pairCount: number): GameState { 

	const tiles = getSymbols(pairCount).flatMap((symbol, index) => {
		const firstTile: Tile = {
			id: `tile-${index * 2 + 1}`,
			symbol,
			isFlipped: false,
			isMatched: false,
			lockedBy: null,
		};

		const secondTile: Tile = {
			id: `tile-${index * 2 + 2}`,
			symbol,
			isFlipped: false,
			isMatched: false,
			lockedBy: null,
		};

		return [firstTile, secondTile];
	});

	return {
		tiles: shuffleTiles(tiles),
		players: [],
		scoreHistory: [],
		isGameOver: false,
		startTime: null,
	};
}

export function addPlayer(state: GameState, id: string, name: string): GameState { 
	const existingPlayer = state.players.find((player) => player.id === id);

	if (existingPlayer) {
		return {
			...state,
			players: state.players.map((player) =>
				player.id === id
					? { ...player, name, isConnected: true }
					: player,
			),
		};
	}

	return {
		...state,
		players: [
			...state.players,
			{
				id,
				name,
				score: 0,
				isConnected: true,
			},
		],
	};
}

export function removePlayer(state: GameState, id: string): GameState { 
	return {
		...state,
		tiles: state.tiles.map((tile) =>
			tile.lockedBy === id && !tile.isMatched
				? { ...tile, isFlipped: false, lockedBy: null }
				: tile,
		),
		players: state.players.map((player) =>
			player.id === id
				? { ...player, isConnected: false }
				: player,
		),
	};
}

export function selectTile(state: GameState, tileId: string, playerId: string): { newState: GameState; event: string | null } { 
	const player = state.players.find((currentPlayer) => currentPlayer.id === playerId);
	const tile = state.tiles.find((currentTile) => currentTile.id === tileId);

	if (!player || !player.isConnected || !tile) {
		return { newState: state, event: null };
	}

	if (tile.isMatched || (tile.lockedBy !== null && tile.lockedBy !== playerId)) {
		return { newState: state, event: null };
	}

	const selectedTiles = state.tiles.filter(
		(currentTile) =>
			currentTile.lockedBy === playerId
			&& currentTile.isFlipped
			&& !currentTile.isMatched,
	);

	if (selectedTiles.some((currentTile) => currentTile.id === tileId) || selectedTiles.length >= 2) {
		return { newState: state, event: null };
	}

	if (selectedTiles.length === 0) {
		return {
			newState: {
				...state,
				startTime: state.startTime ?? Date.now(),
				tiles: state.tiles.map((currentTile) =>
					currentTile.id === tileId
						? { ...currentTile, isFlipped: true, lockedBy: playerId }
						: currentTile,
				),
			},
			event: null,
		};
	}

	const firstSelectedTile = selectedTiles[0];
	if (!firstSelectedTile) {
		return { newState: state, event: null };
	}

	const stateWithSecondTile = {
		...state,
		startTime: state.startTime ?? Date.now(),
		tiles: state.tiles.map((currentTile) =>
			currentTile.id === tileId
				? { ...currentTile, isFlipped: true, lockedBy: playerId }
				: currentTile,
		),
	};
	const result = checkMatch(stateWithSecondTile, firstSelectedTile.id, tileId, playerId);

	return {
		newState: result.newState,
		event: result.isMatch ? 'game:match' : 'game:mismatch',
	};
}

export function checkMatch(state: GameState, t1: string, t2: string, playerId: string): { newState: GameState; isMatch: boolean } { 
	if (t1 === t2) {
		return { newState: state, isMatch: false };
	}

	const firstTile = state.tiles.find((tile) => tile.id === t1);
	const secondTile = state.tiles.find((tile) => tile.id === t2);

	if (!firstTile || !secondTile) {
		return { newState: state, isMatch: false };
	}

	const isMatch = firstTile.symbol === secondTile.symbol;

	if (!isMatch) {
		return {
			newState: {
				...state,
				tiles: state.tiles.map((tile) =>
					tile.id === t1 || tile.id === t2
						? { ...tile, isFlipped: false, lockedBy: null }
						: tile,
				),
			},
			isMatch: false,
		};
	}

	const updatedPlayers = state.players.map((player) =>
		player.id === playerId
			? { ...player, score: player.score + 1 }
			: player,
	);
	const updatedTiles = state.tiles.map((tile) =>
		tile.id === t1 || tile.id === t2
			? { ...tile, isMatched: true, isFlipped: true, lockedBy: null }
			: tile,
	);
	const newState: GameState = {
		...state,
		tiles: updatedTiles,
		players: updatedPlayers,
		scoreHistory: [...state.scoreHistory, createScoreSnapshot(updatedPlayers)],
		isGameOver: updatedTiles.every((tile) => tile.isMatched),
	};

	return { newState, isMatch: true };
}
