export function stripText(text: string, limit: number): string {
  return text.length > limit ? text.slice(0, limit) + '...' : text
}
