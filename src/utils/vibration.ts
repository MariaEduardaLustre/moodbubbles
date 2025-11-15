// Vibração leve no toque
export function vibrate(duration: number = 10): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

