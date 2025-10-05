
# Implementation Plan: Drink & Recipe Tracking (Offline PWA)

**Branch**: `001-a-pwa-to` | **Date**: 2025-10-05 | **Spec**: `specs/001-a-pwa-to/spec.md`
**Input**: Feature specification from `/specs/001-a-pwa-to/spec.md`

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
Lightweight offline-capable single-page web application for tracking Drinks (beverage concepts) and their multiple Recipes (preparation variants). Users can: (1) view alphabetically sorted drinks, (2) create new drinks with normalized unique slugs, (3) navigate to a drink detail view listing its recipes (newest first), and (4) create new recipes (with ingredients and optional inspiration URL). No edit or delete operations exist. Offline-first behavior relies on Firestore's local persistence; queued creations sync automatically when connectivity returns. Technical approach: React 19.2 + TypeScript + Vite, TanStack Query for remote/cache orchestration (abstracting Firestore interactions), Zod for boundary validation, semantic HTML only (no custom styling) and a minimal service worker + manifest for PWA installability/offline shell.

## Technical Context
**Language/Version**: TypeScript 5.x (strict) / React 19.2
**Primary Dependencies**: React 19.2, TanStack Query, Zod, Vite, Firestore Web SDK
**Storage**: Cloud Firestore (with built‑in offline persistence + last-write-wins conflict resolution)
**Testing**: Vitest + @testing-library/react (unit/integration as needed), Contract test stubs only initially
**Target Platform**: Modern evergreen desktop & mobile browsers (Chromium, Firefox, Safari)
**Project Type**: Single web application (frontend only – no custom backend)
**Performance Goals**: First interactive < 2s on mid‑range device; initial JS < 150KB (gzipped); navigation & create actions visible update < 150ms; offline shell available on 1st visit after assets cached
**Constraints**: Offline-capable PWA, semantic-only markup, no custom styling beyond UA defaults, no global state libs, no edit/delete scope
**Scale/Scope**: Personal / hobby scale (< 5K drinks, < 50 recipes per drink) – fits comfortably in Firestore free tier and local persistence

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Constraint | Compliance Strategy | Notes |
|------------------------|---------------------|-------|
| React 19.2 & modern APIs | Use createRoot, functional components, Suspense boundaries for async drink/recipe loads | No legacy class components |
| Simplicity & Composition | Flat feature components: `DrinkList`, `CreateDrinkForm`, `DrinkDetail`, `CreateRecipeForm` | Avoid over-abstraction until duplication appears |
| TanStack Query for data | Query options factories: `drinkListQueryOpts()`, `drinkDetailQueryOpts(slug)` | Firestore SDK wrapped in lightweight data access layer |
| Suspense + Error Boundaries | Wrap list & detail regions with `<Suspense fallback>` + error boundary | Ensures resilient offline/online transitions |
| Semantic Markup | Use `<main>`, `<section>`, `<article>`, `<ul>/<li>`, `<form>`, `<fieldset>`, `<legend>` | No div soup, no ARIA unless needed |
| Minimal Testing Requirement | Only complex logic (slug normalization, dedupe) + future contract/integration tests | Keeps velocity high |
| Explicit Loading/Error States | Suspense fallback text + error boundary message; offline detection messaging optional | Follows principle 7 |
| No Unnecessary Global State | Local component state + TanStack Query caches; no Redux/Zustand | Simplicity maintained |
| Type Safety + Zod | Zod schemas for Drink, Recipe, Ingredient at Firestore boundary, transform to internal types | No `any` / non-null assertions |
| No styling beyond UA | Zero custom CSS; rely on semantic grouping and line breaks | Clarification accepted |

Initial review: PASS – no violations requiring Complexity Tracking.

## Project Structure

### Documentation (this feature)
```
specs/001-a-pwa-to/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── (future) tasks.md
```

### Source Code (planned)
```
app/
├── src/
│   ├── components/
│   │   ├── DrinkList.tsx
│   │   ├── DrinkDetail.tsx
│   │   ├── CreateDrinkForm.tsx
│   │   ├── CreateRecipeForm.tsx
│   │   └── common/ (ErrorBoundary, SuspenseFallback)
│   ├── data/
│   │   ├── firestore.ts (init + converters)
│   │   ├── queries.ts (TanStack Query option factories)
│   │   └── slug.ts (normalization util + tests)
│   ├── schemas/ (zod definitions)
│   ├── pages/
│   │   ├── DrinksPage.tsx
│   │   └── DrinkDetailPage.tsx
│   ├── router/ (simple client router or hash routing)
│   ├── service-worker.ts
│   └── main.tsx
├── public/
│   ├── index.html
│   ├── manifest.webmanifest
│   └── icons/
└── tests/
      ├── contract/
      ├── unit/
      └── integration/
```

**Structure Decision**: Single web app (`app/`) — no backend service needed because Firestore direct client usage satisfies persistence + offline. Directory focuses on clear separation: components, data access/query configs, schemas, utilities, and routing. Tests segregated by type.

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

**Output**: research.md with all NEEDS CLARIFICATION resolved (created – see `specs/001-a-pwa-to/research.md`).

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

**Output**: data-model.md, /contracts/* (OpenAPI + README), quickstart.md, contract test stub (failing until code exists), agent file will be updated via script.

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
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
No deviations currently. Table retained for future use.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
