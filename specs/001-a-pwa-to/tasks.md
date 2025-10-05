# Task Plan: Drink & Recipe Tracking (Offline PWA)

Generated for Phase 2 based on plan.md (includes TanStack Router, loaders, React Compiler, Prettier, ESLint, path alias).

Legend: [P] = parallelizable, (B) = blocking predecessor(s), (O) = optional/nice-to-have

## Foundational & Tooling
1. Initialize Vite React TS project in `app/` (remove default boilerplate). (B: none)
2. Add strict `tsconfig.json` with path alias '@/*'. (B:1)
3. Install dependencies: react, react-dom, @tanstack/react-query, @tanstack/router, firebase, zod. (B:1)
4. Install dev deps: typescript, vite, vitest, @testing-library/react, @testing-library/user-event, jsdom, eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-plugin-react-hooks, prettier, vite-tsconfig-paths. (B:1)
5. Configure ESLint (minimal recommended + typescript + react-hooks) and Prettier integration (no conflicting rules). (B:2,3,4)
6. Add vite.config.ts with React plugin, vite-tsconfig-paths, React Compiler enable flag (experimental). (B:2,3,4)
7. Add npm scripts: dev, build, preview, test, lint, format. (B:3,4)
8. Set up `.prettierrc` and `.eslintignore` / `.gitignore` entries. (B:5)

## Data Modeling & Validation
9. Implement Zod schemas: `DrinkSchema`, `RecipeSchema`, `IngredientSchema`. (B:3) [P]
10. Implement slug normalization utility `slug.ts` + unit tests (Vitest). (B:3) [P]
11. Implement Firestore init `firestore.ts` with offline persistence enablement. (B:3) [P]
12. Define TypeScript domain types from Zod inference (export) to ensure single source of truth. (B:9) [P]

## Query Layer
13. Implement query option factories in `queries.ts`: `drinkListQueryOpts`, `drinkDetailQueryOpts(drinkSlug)`, `recipesForDrinkQueryOpts(drinkSlug)`. (B:9,11)
14. Implement create mutation helpers: `createDrink`, `createRecipe` with Zod validation before write. (B:9,11)
15. Add optimistic update logic for create operations (query cache manual update) ensuring dedupe via slug. (B:13,14)
16. Add duplicate prevention utility invoked pre-write (checks normalized slug existence via cache then fallback Firestore query). (B:13)

## Routing & Loaders
17. Scaffold TanStack Router root route (`__root.tsx`) with QueryClientProvider, RouterProvider, ErrorBoundary, Suspense fallback. (B:13)
18. Create file-based route for `/` drinks list with loader prefetch of `drinkListQueryOpts`. (B:17)
19. Create file-based route for `/drinks/:drinkSlug` with loader prefetch of drink + recipes queries (parallel). (B:17)
20. Implement shared loader helper `primeQuery(client, opts)` to DRY prefetch logic. (B:13,17) [P]

## UI Components
21. Implement `CreateDrinkForm` (slug auto-generate, editable before submit, native validation). (B:16,18)
22. Implement `DrinkList` (alphabetical, links to detail routes). (B:18)
23. Implement `CreateRecipeForm` (ingredients dynamic list, slug generation). (B:19)
24. Implement `DrinkDetail` (shows drink + recipes newest first). (B:19)
25. Wire optimistic UI after create for drink/recipe (update caches, fallback to refetch on error). (B:21,23)

## Offline & PWA
26. Add `manifest.webmanifest` (name, short_name, icons placeholders). (B:1)
27. Implement service worker (`service-worker.ts`) caching strategy: precache app shell + runtime network-first for Firestore (delegated to SDK). (B:1,11)
28. Register SW via `register-sw.ts` in bootstrap sequence. (B:27)

## Error & Suspense Boundaries
29. Implement reusable `ErrorBoundary.tsx` and `SuspenseFallback.tsx` (semantic markup). (B:17) [P]
30. Add route-level boundaries to root and nested routes. (B:29,17)

## Testing
31. Add Vitest config + setup (jsdom). (B:4)
32. Unit tests for slug normalization edge cases (duplicates, trimming, length). (B:10)
33. Unit tests for duplicate prevention logic (cache hit vs Firestore simulated). (B:16)
34. Contract test stubs referencing OpenAPI to validate expected shapes (mapping pseudo endpoints to query/mutation functions). (B:13,14)
35. Integration test: create drink → appears in list (optimistic vs confirmed). (B:21,22)
36. Integration test: create recipe → appears newest first. (B:23,24)
37. Integration test: offline create then reconnect sync (mock Firestore offline). (B:11,21,23)

## Quality & Tooling Finalization
38. Lint pass & format all sources; fix issues. (B:21-37)
39. Bundle size check (<150KB gzip) and note in README; adjust imports if exceeded. (B:21-27)
40. Update quickstart.md with final scripts & routing notes. (B:38)
41. Update `.github/copilot-instructions.md` via script to reflect added Router + lint/format stack. (B:38)

## Optional Enhancements (Not in MVP)
42. (O) Basic offline indicator banner.
43. (O) Slug collision suggestions (append numeric suffix automatically).

## Completion Criteria
- All mandatory tasks (1-41) done, tests green, plan gates remain PASS.
- Optional tasks considered if time.
