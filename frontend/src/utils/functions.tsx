export function stripText(text: string, limit: number): string {
  return text.length > limit ? text.slice(0, limit) + '...' : text
}

export const colors: string[] = [
  '#ffd6af',
  '#cbe896',
  '#b4cded',
  '#f7b2bd',
  '#9eb7e5',
]

export function shuffleColors(colors: string[]): string[] {
  return [...colors].sort(() => 0.5 - Math.random())
}
