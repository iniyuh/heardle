export interface GameSession {
  id: string;
  lobbyId: string;
  currentRound: number;
  totalRounds: number;
  status: 'waiting' | 'playing' | 'finished';
  currentTrack?: Track;
  roundStartTime?: Date;
  roundEndTime?: Date;
  guesses: Guess[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: number;
  streamUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  genre?: string;
}

export interface Guess {
  id: string;
  playerId: string;
  gameSessionId: string;
  round: number;
  guess: string;
  isCorrect: boolean;
  attemptNumber: number;
  points: number;
  submittedAt: Date;
} 