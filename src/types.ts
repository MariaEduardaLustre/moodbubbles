export type Mood = 'calm' | 'happy' | 'energetic' | 'dreamy' | 'zen';

export interface MoodConfig {
  name: string;
  colors: string[];
  music?: string;
}

export type GameMode = 'normal' | 'storm' | 'zen';

export interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}

export interface WaterDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  opacity: number;
}

export interface WaterPuddle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

