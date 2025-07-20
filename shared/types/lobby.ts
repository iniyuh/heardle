import type { Player } from './player';

export interface Lobby {
  id: string;
  name: string;
  hostId: string;
  players: Player[];
  settings: LobbySettings;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}

export interface LobbySettings {
  maxPlayers: number;
  roundDuration: number; // in seconds
  totalRounds: number;
  difficulty: 'easy' | 'medium' | 'hard';
} 