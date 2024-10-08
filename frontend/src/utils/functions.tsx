export function stripText(text: string): string {
  return text.length > 150 ? text.slice(0, 150) + '...' : text
}
