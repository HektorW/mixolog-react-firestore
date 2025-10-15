import { normalizeSlug } from '@/data/slug'
import { describe, expect, it } from 'vitest'

// T010 slug normalization edge cases

describe('normalizeSlug', () => {
  const cases: Array<[string, string]> = [
    ['Simple Name', 'simple-name'],
    ['  Leading and trailing  ', 'leading-and-trailing'],
    ['Multiple   Spaces\tTabs', 'multiple-spaces-tabs'],
    ['Special#Chars*&^%Here', 'special-chars-here'],
    ['----Already---Hyphenated---', 'already-hyphenated'],
    ['Ünicode Café', 'unicode-cafe'],
    ['a'.repeat(300), 'a'.repeat(255)],
    ['MiXeD CaSe Name', 'mixed-case-name'],
    ['duplicate---hyphens----inside', 'duplicate-hyphens-inside'],
  ]

  it.each(cases)('normalizes %s → %s', (input, expected) => {
    expect(normalizeSlug(input)).toBe(expected)
  })

  it('returns empty string if only invalid chars', () => {
    expect(normalizeSlug('$$$$$')).toBe('')
  })
})
