export const FormattingText = (text: string): string => {
  const newText: string = text.replace(/_/g, " ").toLowerCase()

  return newText
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ')
}
