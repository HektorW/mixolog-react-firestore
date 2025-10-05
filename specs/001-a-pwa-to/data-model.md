# Data Model

Derived from spec functional requirements FR-001..FR-036.

## Entities
### Drink
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| name | string | required, trim, 1-255, unique case-insensitive | Display name |
| slug | string | required, 1-255, unique case-insensitive, normalized | Primary ID / doc id |
| createdAt | timestamp | set on create | Not user editable |

### Recipe
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| name | string | required, trim, 1-255 | |
| slug | string | required, 1-255, unique within drink, normalized | Used for in-drink lookups |
| instructions | string | required, unlimited length | Markdown-capable plain text |
| ingredients | Ingredient[] | ≥1 item | Stored order preserved |
| inspirationUrl | string | optional, valid URL | Display as link |
| createdAt | timestamp | set on create | |
| drinkSlug | string | fk to Drink.slug | Partition key |

### Ingredient
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| name | string | required, 1-255 | |
| amount | string | required, 1-255 | Free-form quantity/amount |
| unit | string | optional, ≤50 | Optional human unit |

## Relationships
Drink (1) ── (N) Recipe
Recipe (1) ── (N) Ingredient (embedded array)

## Zod Schemas (Planned)
- DrinkSchema
- RecipeSchema (with IngredientSchema)

## Slug Normalization Rules
1. Lowercase
2. Trim whitespace
3. Replace whitespace/disallowed chars with hyphen
4. Collapse multiple hyphens
5. Trim leading/trailing hyphens
6. Truncate to ≤255 chars

## Uniqueness Logic
- Drink: name (case-insensitive) OR slug collision prevents creation.
- Recipe: slug unique per parent drink.

## Offline Considerations
- Entire drink + recipe documents cached once queried; detail view preloads its recipes.

## Derived Behaviors
- Recipe ordering: newest first (createdAt desc).
- Drinks list: alphabetical by name (case-insensitive).

## Validation Flow
1. User input trimmed.
2. Slug auto-generated if blank.
3. Slug normalized.
4. Length + uniqueness checks.
5. Zod parse before persistence.

## Open Questions
None (all clarifications addressed).
