export function FormattingText(text: string): string {
  return (text || "").replace("_", " ").toLowerCase()
}
