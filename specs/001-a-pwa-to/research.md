# Phase 0 Research: Drink & Recipe Tracking PWA

Date: 2025-10-05
Branch: 001-a-pwa-to

## Resolved Unknowns
All clarifications satisfied in spec. No remaining NEEDS CLARIFICATION markers.

## Key Decisions
### Frontend Framework
- Decision: React 19.2 + Vite
- Rationale: Aligns with constitution; provides fast dev experience and modern APIs.
- Alternatives: Next.js (overhead for routing + SSR not needed), plain ES modules (slower DX, fewer guarantees), Astro (SSR/hybrid not required).

### State & Data Orchestration
- Decision: TanStack Query for Firestore reads/writes with option factories.
- Rationale: Caching + suspense integration, avoids custom global store.
- Alternatives: Direct Firestore SDK calls in components (harder to coordinate caching), custom context provider (reinvents query features).

### Firestore Usage Pattern
- Decision: Collections: `drinks` and `drinks/{drinkId}/recipes`. Deterministic IDs via slugs.
- Rationale: Natural hierarchical grouping, efficient queries per drink.
- Alternatives: Flat `drinks` + `recipes` with composite indexes (unnecessary complexity for scope).

### Offline Strategy
- Decision: Rely on Firestore persistence and PWA service worker caching (static assets + app shell) with `manifest.webmanifest`.
- Rationale: Built-in offline sync fits requirements; no custom queueing logic.
- Alternatives: Custom IndexedDB layer (over-engineering), localStorage (insufficient for structured data).

### Slug Normalization
- Decision: Utility function `normalizeSlug(input: string, max=255)`; rules per spec.
- Rationale: Centralized, testable, reused for Drink + Recipe.
- Alternatives: Ad-hoc regex in each form (risk divergence).

### Validation
- Decision: Zod schemas for inbound/outbound Firestore data: `DrinkSchema`, `RecipeSchema`, `IngredientSchema`.
- Rationale: Constitution mandates validated IO boundaries.
- Alternatives: TypeScript types only (no runtime safety), custom manual validation (more code, less consistency).

### Testing Approach
- Decision: Minimal targeted tests: slug normalization, duplicate prevention logic abstraction, and contract test placeholders referencing OpenAPI.
- Rationale: Constitution allows minimal tests; focus on critical logic.
- Alternatives: Full TDD across every component (unnecessary for small scope).

### Routing
- Decision: TanStack Router (file-based) with route loaders to prefetch TanStack Query caches.
- Rationale: Native integration with query prefetch, suspense-friendly, scales beyond 2 views while keeping code generation minimal.
- Alternatives: Hash-based custom router (less featureful, manual prefetch complexity), React Router (heavier, no first-class query loader alignment yet), minimal conditional rendering (would inhibit deep-linking and prefetch semantics).

### Loader Prefetch Strategy
- Decision: Invoke query option factories inside loaders and `queryClient.ensureQueryData` to seed cache before component render.
- Rationale: Eliminates loading flashes, ensures Suspense resolves immediately.
- Alternatives: Component-level `useSuspenseQuery` only (introduces transient fallback flashes), manual prefetch in `onMount` (race conditions).

### React Compiler
- Decision: Enable experimental React Compiler in Vite config.
- Rationale: Potential performance wins via memoization synthesis; low config cost.
- Alternatives: Manual memoization (more boilerplate), no compiler (baseline acceptable but misses optimization opportunity).

### Formatting & Linting
- Decision: Prettier for formatting + ESLint (recommended, typescript, react-hooks) with Prettier last.
- Rationale: Consistent code style and hooks rule enforcement; avoids style bikeshedding.
- Alternatives: ESLint formatting rules only (slower, inconsistent), no formatter (inconsistent diffs).

### Path Alias
- Decision: '@/' alias to `./src` via tsconfig paths + vite-tsconfig-paths plugin.
- Rationale: Improves import readability, reduces fragile relative paths when reorganizing directories.
- Alternatives: Raw relative imports (harder refactors), additional alias layers (unnecessary complexity).

### Performance Boundaries
- Decision: Keep bundle under 150KB gzip initial (achieved by avoiding large libs) and ensure queries are batched/suspended.
- Rationale: Fast load, good offline startup.
- Alternatives: Accept larger bundle (hurts initial offline caching speed).

### Accessibility
- Decision: Semantic HTML only; rely on native form elements and headings hierarchy.
- Rationale: Clarification: "semantic best effort only".
- Alternatives: Additional ARIA roles (unnecessary unless gap emerges).

## Data Access Layer Pattern
Provide thin functions: `getDrinks()`, `createDrink(dto)`, `getRecipes(drinkSlug)`, `createRecipe(drinkSlug, dto)` each performing Zod validation on read and write payloads.

## Security Considerations
Out of scope: auth, multi-user isolation. Assumed single-user personal usage; no rules elaboration required in plan.

## OpenAPI Contract Justification
Even with direct Firestore usage, a pseudo-API contract clarifies intent and supports test scaffolding. Can be future-aligned if a backend is introduced.

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Duplicate writes on double submit | Duplicate drinks/recipes | Disable submit while pending + slug uniqueness check client-side |
| Long instructions size | Potential local storage overhead | Accept (spec allows), rely on Firestore paging if scale grows |
| Offline conflict (two devices) | Duplicate similar recipes | Accept: last write wins; user can visually distinguish |

## Summary
No blockers. Proceeded to Phase 1 design artifacts.
