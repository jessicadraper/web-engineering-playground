// src/lib/utils/highlight.ts
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Returns an array of { text, highlight } objects for reactive rendering
export function getHighlightedParts(
  text: string,
  query: string | null
): Array<Record<string, unknown>> {
  if (query == null) return [{ text, highlight: false }];
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part) => ({ text: part, highlight: regex.test(part) }));
}
