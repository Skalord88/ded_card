export const FormattingText = (text: string): string => {
  const newText: string = text.replace(/_/g, " ").toLowerCase()
  return newText
}
