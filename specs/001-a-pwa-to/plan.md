
# Implementation Plan: Drink & Recipe Tracking (Offline PWA)

**Branch**: `001-a-pwa-to` | **Date**: 2025-10-05 | **Spec**: `specs/001-a-pwa-to/spec.md`
**Input**: Feature specification from `specs/001-a-pwa-to/spec.md`
**Additional User Inputs**: use TanStack Router (file-based routing) + loaders, use React Compiler, Prettier formatting, ESLint (minimal + react-hooks), '@/' path alias with Vite tsconfig paths plugin.

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Offline-capable React (19.2) + TypeScript PWA to create and browse Drinks and associated Recipes (newest first). No editing or deletion. Offline persistence via Firestore local cache; semantic HTML only. Routing provided by TanStack Router with file-based route definitions, using route loaders to prefetch TanStack Query caches so components can rely on `useSuspenseQuery` without waterfalls. React Compiler (experimental) enabled to optimize render paths. Tooling includes ESLint (recommended + react-hooks), Prettier, strict TS config, Zod for runtime validation, and a '@/' import alias for cleaner module paths.

## Technical Context
**Language/Version**: TypeScript 5.x (strict) / React 19.2 + React Compiler (experimental)  
**Primary Dependencies**: React 19.2, TanStack Query, TanStack Router, Zod, Vite, Firestore Web SDK  
**Storage**: Cloud Firestore (offline persistence, last-write-wins)  
**Testing**: Vitest + @testing-library/react + contract placeholders; targeted logic/unit tests only  
**Target Platform**: Modern evergreen browsers (desktop + mobile)  
**Project Type**: Single web application (frontend only)  
**Performance Goals**: FCP < 1.5s / interactive < 2s mid-range; bundle < 150KB gzip; route transition data ready via loader-prefetch (no spinner flash); create action optimistic UI < 150ms  
**Constraints**: Offline-first PWA, semantic-only markup, no custom CSS, no edit/delete, no global state libs, minimal configuration overhead  
**Scale/Scope**: Personal scale (<5K drinks; each <50 recipes) well within Firestore & client memory  
**Formatting & Linting**: Prettier (opinionated defaults) + ESLint (eslint:recommended, @typescript-eslint/recommended, plugin:react-hooks/recommended) integrated; Prettier last-in pipeline  
**Path Aliases**: '@/' root src alias via tsconfig paths + vite-tsconfig-paths plugin  
**Routing Strategy**: TanStack Router file-based with route loaders prefetching query data (drinks list, drink detail + recipes) to hydrate cache for Suspense boundaries  
**Data Prefetch**: Route loaders call query option factories then prime TanStack Query cache (avoids double-fetch)  
**Build Optimizations**: React Compiler enable flag, tree-shake Firestore modular SDK imports  
**Error Handling**: Error Boundaries per route layout, native browser validation messages for forms  
**Security/Privacy**: Single-user assumption (no auth); no PII storage  
**Open Questions**: None (all clarifications resolved)

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Constraint | Compliance Strategy | Notes |
|------------------------|---------------------|-------|
| React 19.2 & modern APIs | Functional components, Suspense boundaries, React Compiler enabled | Compiler is additive; fall back if instability |
| Simplicity & Composition | Small focused components; avoid abstraction until duplication | Only slug util & query option factories upfront |
| TanStack Query | All data via query options factories; loaders pre-populate cache | No custom global store |
| Routing (extension) | TanStack Router file-based routes with loaders | Aligns with query prefetch requirement |
| Suspense & Error Boundaries | Boundary per route tree segment (root + detail) | Shared fallback components |
| Semantic Markup | Use appropriate landmark & structural elements | No non-semantic wrappers |
| Minimal Testing | Only complex logic & route/contract integration tests | Honors constitution principle 6 |
| Explicit Loading/Error States | Loader-prefetch minimizes loading; fallback still present | Avoid spinner-only states >3s |
| No Global State Libs | Query cache + component state only | Document if future need arises |
| Type Safety + Zod | Zod schemas at Firestore boundary + validated types inside | No `any` or non-null assertions |
| No Styling Beyond UA | Zero CSS; structural grouping only | Prettier handles formatting only |
| Build & Lint Discipline | ESLint + react-hooks + Prettier; path aliases to reduce relative imports | Keeps code clarity |

Initial Constitution Check: PASS. No deviations requiring Complexity Tracking.

directories captured above]
## Project Structure

### Documentation (this feature)
```
specs/001-a-pwa-to/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md (generated in Phase 2)
```

### Source Code (planned)
```
app/
├── src/
│   ├── routes/                      # File-based TanStack Router route modules
│   │   ├── __root.tsx               # Root route: provides QueryClientProvider, RouterProvider, ErrorBoundary, Suspense
│   │   ├── index.route.tsx          # '/' drinks list route (loader prefetch drinks)
│   │   └── drinks.$drinkSlug.route.tsx # '/drinks/:drinkSlug' recipe detail route (loader prefetch drink + recipes)
│   ├── components/
│   │   ├── DrinkList.tsx
│   │   ├── DrinkDetail.tsx
│   │   ├── CreateDrinkForm.tsx
│   │   ├── CreateRecipeForm.tsx
│   │   └── common/
│   │       ├── ErrorBoundary.tsx
│   │       └── SuspenseFallback.tsx
│   ├── data/
│   │   ├── firestore.ts             # Firestore init + persistence
│   │   ├── queries.ts               # query option factories
│   │   ├── loaders.ts               # route loader helper utilities
│   │   └── slug.ts                  # slug normalization + tests
│   ├── schemas/                     # Zod schemas
│   │   ├── drink.ts
│   │   ├── recipe.ts
│   │   └── ingredient.ts
│   ├── sw/                          # service worker & registration
│   │   ├── service-worker.ts
│   │   └── register-sw.ts
│   ├── index.html (via Vite public) # entry template (actually in public/)
│   ├── main.tsx                     # bootstrap React + Router
│   └── env.d.ts
├── public/
│   ├── index.html
│   ├── manifest.webmanifest
│   └── icons/
├── tsconfig.json
├── vite.config.ts
└── tests/
      ├── unit/
      │   └── slug.test.ts
      ├── contract/
      └── integration/
```

**Structure Decision**: Single web app under `app/` leveraging TanStack Router for file-based routing + loaders; no backend service needed.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved (complete)

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, quickstart.md, tests placeholders, agent file updated.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- Tooling & infrastructure first (TS config, alias, lint, formatting)
- Validation & utilities (schemas, slug util)
- Data layer (firestore init, query options, loaders)
- Routing & provider shell
- UI components & forms
- Offline & optimistic behaviors
- Tests (unit → contract → integration)
- PWA manifest/service worker finalization

**Estimated Output**: ~30 tasks in tasks.md

**Phase 2 executed**: tasks.md generated in this run.

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
No deviations currently.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (tasks.md created)
- [ ] Phase 3: Tasks generated (/tasks command) *N/A (already manually created here per prompt spec)*
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
