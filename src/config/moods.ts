import { Mood, MoodConfig } from '../types';

export const MOODS: Record<Mood, MoodConfig> = {
  calm: {
    name: 'Calmo',
    colors: ['#87CEEB', '#B0E0E6', '#ADD8E6', '#E0F6FF', '#AFEEEE'],
  },
  happy: {
    name: 'Feliz',
    colors: ['#FFD700', '#FFA500', '#FF69B4', '#FFB6C1', '#FFE4B5'],
  },
  energetic: {
    name: 'Energético',
    colors: ['#FF4500', '#FF6347', '#FF1493', '#FF00FF', '#FF69B4'],
  },
  dreamy: {
    name: 'Sonhador',
    colors: ['#9370DB', '#BA55D3', '#DA70D6', '#DDA0DD', '#EE82EE'],
  },
  zen: {
    name: 'Zen',
    colors: ['#90EE90', '#98FB98', '#ADFF2F', '#7FFFD4', '#AFEEEE'],
  },
};

