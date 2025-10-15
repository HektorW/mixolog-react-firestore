# Tasks: Drink & Recipe Tracking (Offline PWA)

Input: Design documents in `/specs/001-a-pwa-to/` (plan.md, data-model.md, quickstart.md, research.md)
Prerequisites: Current branch `001-a-pwa-to`, implementation plan approved, constitution checks PASS.

Format: `[ID] [P?] Description (Dependencies)`
Legend: `[P]` = may run in parallel (different file, no unmet deps). No `[P]` = must follow listed dependencies or shares file. Optional/nice-to-have tasks explicitly marked `(Optional)`.

Test Strategy (aligning with Constitution Principle 6 Minimal Testing): High‑value tests (critical logic & representative user flows) are recommended to be authored early. Not all tasks require tests; broad mandatory TDD is intentionally avoided. Where tests exist they should initially fail before corresponding implementation changes.

## Phase 3.1: Setup / Scaffolding
- [X] T001 Create base project structure `app/` with folders: `app/src/{routes,components/common,data,schemas,sw}` `app/tests/{unit,contract,integration}` and `app/public/` (index.html placeholder). (Deps: —)
- [X] T002 Initialize Vite React TS project in `app/` (remove boilerplate) producing `app/package.json`, `app/tsconfig.json`, `app/src/main.tsx`. (Deps: T001)
- [X] T003 Add strict `tsconfig.json` path alias '@/*' + `vite-env.d.ts`. (Deps: T002)
- [X] T004 Install runtime deps: react, react-dom, @tanstack/react-query, @tanstack/router, firebase, zod, vite-tsconfig-paths. (Deps: T002)
- [X] T005 Install dev deps: typescript, vite, vitest, @testing-library/react, @testing-library/user-event, jsdom, eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-plugin-react-hooks, prettier, @types/node. (Deps: T002)
- [X] T006 Configure ESLint + Prettier (.eslintrc, .prettierrc, `.eslintignore`) and npm scripts: dev, build, preview, test, lint, format, typecheck. (Deps: T003,T004,T005)
- [X] T007 Add `vite.config.ts` with React plugin, `vite-tsconfig-paths`, experimental React Compiler flag enabled, and build chunk size limits. (Deps: T006)
- [X] T008 Add PWA assets: `app/public/manifest.webmanifest` (name, short_name, offline display), stub icons dir, and stub service worker files `app/src/sw/service-worker.ts`, `app/src/sw/register-sw.ts`. (Deps: T001)

## Phase 3.2: Selective Tests (Optional Minimal Set)
Purpose: Align with Constitution Principle 6 (minimal testing). Only critical pure logic and one end‑to‑end smoke path are covered. All other behavior verified manually (see Manual Verification Checklist in Phase 3.5). Tests below are OPTIONAL but recommended.
- [X] T010 [P] Unit test slug normalization edge cases `app/tests/unit/slug.test.ts`. (Deps: T007)
- [X] T011 [P] Unit test uniqueness logic (drink & recipe slug) `app/tests/unit/uniqueness.test.ts`. (Deps: T007)
- [X] T012 [P] Integration smoke: create drink & recipe offline then reconnect (optimistic visibility, offline cache) `app/tests/integration/smoke-offline-create.int.test.ts`. (Deps: T007)

Deprecated / Pruned Former Test Tasks: (T009,T013–T023,T057–T068) intentionally removed to keep scope lean. Refer to git history if reactivation needed.

## Phase 3.3: Core Implementation
### Schemas / Models
- [X] T024 [P] Implement Drink schema & type in `app/src/schemas/drink.ts` (Zod + inferred TS). (Deps: —)
- [X] T025 [P] Implement Ingredient schema & type in `app/src/schemas/ingredient.ts`. (Deps: —)
- [X] T026 Implement Recipe schema & type (imports Ingredient) in `app/src/schemas/recipe.ts`. (Deps: T025)
### Utilities & Data Layer
 [X] T027 [P] Implement slug normalization utility in `app/src/data/slug.ts` (make T010 pass). (Deps: T010)
 [X] T028 [P] Firestore init with offline persistence in `app/src/data/firestore.ts`. (Deps: T007)
 [X] T029 Implement query option factories in `app/src/data/queries.ts` (drink list, drink detail(+recipes), recipes list). (Deps: T024,T026,T028)
 [X] T030 Implement uniqueness checks in `app/src/data/uniqueness.ts` (cache first, Firestore fallback) to satisfy T011. (Deps: T027,T028,T024,T026)
 [X] T031 Implement create mutations in `app/src/data/mutations.ts` (createDrink, createRecipe) w/ Zod validate + uniqueness. (Deps: T029,T030)
 [X] T032 Implement loaders helper `app/src/data/loaders.ts` (primeQuery wrapper). (Deps: T029)
### Routing
 [X] T033 Implement root route `app/src/routes/__root.tsx` (QueryClientProvider, RouterProvider, ErrorBoundary, SuspenseFallback). (Deps: T032)
 [X] T034 Implement index route `app/src/routes/index.route.tsx` with loader prefetch of drink list. (Deps: T033)
 [X] T035 Implement drink detail route `app/src/routes/drinks.$drinkSlug.route.tsx` prefetching drink + recipes queries. (Deps: T033)
### Components
 [X] T036 Implement DrinkList component `app/src/components/DrinkList.tsx` (alphabetical, links). (Deps: T034)
 [X] T037 Implement CreateDrinkForm `app/src/components/CreateDrinkForm.tsx` (slug auto + editable, native validation). (Deps: T027,T030,T031,T034)
 [X] T038 Implement DrinkDetail component `app/src/components/DrinkDetail.tsx` (shows drink + recipes newest-first). (Deps: T035)
 [X] T039 Implement CreateRecipeForm `app/src/components/CreateRecipeForm.tsx` (dynamic ingredients, slug auto). (Deps: T027,T030,T031,T035)
 [X] T040 Implement optimistic update helpers `app/src/data/optimistic.ts` integrate into mutations (cache insert + rollback). (Deps: T031)
- [ ] T043 [P] Implement SuspenseFallback component `app/src/components/common/SuspenseFallback.tsx`. (Deps: T033)
 [X] T041 Implement service worker caching (app shell + static assets) in `app/src/sw/service-worker.ts` + register in `app/src/sw/register-sw.ts`. (Deps: T008,T033)
- [X] T038 Implement DrinkDetail component `app/src/components/DrinkDetail.tsx` (shows drink + recipes newest-first). (Deps: T035)
 [X] T042 [P] Implement ErrorBoundary component `app/src/components/common/ErrorBoundary.tsx`. (Deps: T033)
 [X] T043 [P] Implement SuspenseFallback component `app/src/components/common/SuspenseFallback.tsx`. (Deps: T033)
### Wiring
- [X] T044 Wire routes & components in `app/src/main.tsx` (providers, service worker registration, route tree). (Deps: T036,T037,T038,T039,T042,T043)

## Phase 3.4: Integration Refinements
- [X] T045 Ensure recipe ordering newest-first at data layer (query sort) satisfying Story 3 test (adjust queries.ts). (Deps: T029,T038)
- [X] T046 Ensure drinks alphabetical ordering at query layer (case-insensitive) satisfying Story 1. (Deps: T029,T036)
- [X] T047 Ensure offline detail data available via prefetch + Firestore cache (adjust loader strategy) satisfying Story 5. (Deps: T032,T033,T035,T041)

## Phase 3.5: Polish & Quality
// Removed former T048 (contract enhancement) due to contract elimination
- [ ] T049 Add unit tests for optimistic update rollback logic `app/tests/unit/optimistic.test.ts`. (Deps: T040)
- [ ] T050 [P] Lint & format all code (eslint, prettier) fix violations. (Deps: T044)
- [ ] T051 Bundle size check (<150KB gzip) and adjust imports (analyze build output). (Deps: T044)
- [ ] T052 Update `specs/001-a-pwa-to/quickstart.md` with final scripts/routing/offline notes. (Deps: T050)
- [ ] T053 Run `.specify/scripts/bash/update-agent-context.sh copilot` to update `.github/copilot-instructions.md`. (Deps: T050)
- [ ] T054 Final verification: all tests green (unit, contract, integration) & manual offline scenario pass. (Deps: T045-T053)
- [ ] T069 Collect performance metrics (Lighthouse or web-vitals script) verifying NFR-001 & NFR-002 thresholds `app/tests/perf/performance-metrics.md`. (Deps: T044)

## Optional Enhancements (Post-MVP)
- [ ] T055 (Optional) Offline status banner component `app/src/components/OfflineIndicator.tsx`.
- [ ] T056 (Optional) Slug suggestion fallback (append numeric suffix) `app/src/data/slug-suggest.ts`.

## Dependencies Summary
Setup: T001 → T002 → T003 → (T004,T005) → T006 → T007 → T008
Tests: All optional tests (T010–T012) depend on environment (T007) and can run in parallel.
Schemas: T024,T025 parallel; T026 depends on T025.
Utilities: T027 independent (after T010); T028 independent (after setup); T029 depends on schemas + firestore; T030 depends on slug + firestore + schemas; T031 depends on queries + uniqueness; T032 depends on queries.
Routing: Root (T033) depends on loaders; index/detail (T034,T035) depend on root.
Components: DrinkList (T036) depends on index route; CreateDrinkForm (T037) depends on mutations + list; DrinkDetail (T038) depends on detail route; CreateRecipeForm (T039) depends on mutations + detail; Optimistic helpers (T040) depend on mutations.
PWA: Service worker (T041) after stub + root route.
Boundaries: T042,T043 parallel after root route.
Wiring: T044 after components + boundaries.
Refinements: Ordering & offline refinements (T045-T047) after core wiring.
Polish: Tests & quality tasks finalize (T048-T054).

## Parallel Execution Examples
Example 1 (after setup): Optional tests in parallel:
	Tasks: T010 T011 (add T012 if smoke desired)

Example 2 (schema phase):
	Run T024 and T025 together; once both complete, do T026.

Example 3 (early data layer):
	Run T027 and T028 concurrently; then proceed with T029.

Example 4 (components):
	After T035, implement T036 & T042 & T043 concurrently (separate files) before starting T037.

## Validation Checklist
- [ ] Each data access path mapped to implementation (T029-T031 + T033-T035)
- [ ] Entities Drink, Recipe, Ingredient have schema tasks (T024-T026)
- [ ] (If chosen) Minimal tests (T010–T012) authored before dependent logic to catch regressions
- [ ] Manual Verification Checklist executed for untested FRs
- [ ] Parallel tasks do not share files
- [ ] All tasks specify concrete file paths
- [ ] Uniqueness & slug logic tested before implementation (T010,T011)

## Completion Criteria
All mandatory tasks T001–T054 completed with passing tests and constitutional principles maintained. Optional tasks (T055–T056) may be done if time without jeopardizing scope.

---
Generated from design artifacts on 2025-10-05.
