export interface Player {
  id: string;
  name: string;
  lobbyId: string;
  score: number;
  isReady: boolean;
  isHost: boolean;
  avatar?: string;
  joinedAt: Date;
  lastSeen: Date;
} 