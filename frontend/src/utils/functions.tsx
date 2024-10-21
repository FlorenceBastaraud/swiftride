export function stripText(text: string, limit: number): string {
  if (limit < 0) return '...'
  return text.length > limit ? text.slice(0, limit) + '...' : text
}
