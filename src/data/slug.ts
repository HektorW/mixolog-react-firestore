// T027 slug normalization utility (implements logic required by spec & tests T010)

const MAX_SLUG_LENGTH = 255

function deburr(str: string): string {
  // Basic ASCII folding for common accented chars used in beverages context
  return str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
}

export function normalizeSlug(
  input: string,
  max: number = MAX_SLUG_LENGTH,
): string {
  let s = deburr(input)
  s = s.trim().toLowerCase()
  // Replace any sequence of non-alphanumeric characters with hyphen
  s = s.replace(/[^a-z0-9]+/g, '-')
  // Collapse multiple hyphens
  s = s.replace(/-+/g, '-')
  // Trim leading/trailing hyphens
  s = s.replace(/^-+|-+$/g, '')
  if (s.length > max) s = s.slice(0, max)
  return s
}
