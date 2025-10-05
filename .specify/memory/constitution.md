# Mixolog Spec Kit Constitution
<!-- Sync Impact Report: v1.0.0 → v1.1.0 (MINOR) | Change: Strengthened Type Safety (mandatory TS + Zod) -->

## Core Principles

### 1. React 19.2 & Modern APIs
The UI layer MUST use React 19.2 (stable release) and prefer modern, concurrent‑safe APIs: functional
components, `use` hook where applicable, native Suspense for async boundaries, and `createRoot`.
Rationale: Ensures consistency, reduces legacy patterns, and unlocks Suspense/data streaming benefits.

### 2. Simplicity & Composition First
Implement features using the smallest viable component and compose upward. Avoid premature abstraction;
no indirection layers unless at least two concrete call sites require the generalization. Rationale:
Keeps cognitive load low and enables rapid refactors.

### 3. Data Fetching via TanStack Query (Declarative Options)
All remote data access MUST use TanStack Query with co-located `useSuspenseQuery` or `useQuery` calls
directly inside components. Provide reusable exported Query Options factories (pure functions returning
`queryKey`, `queryFn`, and config) instead of custom hooks that merely wrap query invocation. Rationale:
Promotes transparency of data dependencies and predictable caching.

### 4. Suspense & Error Boundaries Everywhere Async
Every route-level or major UI region that relies on async data MUST be wrapped in a Suspense boundary with
an adjacent Error Boundary to capture and present fallback UI. Fallbacks MUST be semantic (e.g., `main`
contains a `section` with a status message). Rationale: Guarantees resilient UX and consistent recovery.

### 5. Semantic Markup & Web Standards
All rendered HTML MUST use semantic elements (`main`, `nav`, `header`, `footer`, `section`, `article`,
`button`, `form`, etc.) instead of generic `div` containers when a semantic equivalent exists. ARIA
attributes are added only when semantics alone are insufficient. Rationale: Accessibility.

### 6. Minimal Testing (No Mandatory TDD Automation)
There is NO blanket requirement for automated tests or TDD. Tests MAY be added selectively for complex
logic, regression-prone utilities, or critical data transformations. When tests are written they MUST be
deterministic and fast. Rationale: Prioritizes velocity and reduces maintenance overhead for simple UI.

### 7. Explicit Error & Loading States
Components handling async data MUST visually differentiate: loading (Suspense fallback), resolved (normal
render), and error (Error Boundary UI). Avoid silent failures or spinner-only states beyond 3 seconds;
provide contextual messaging after that threshold. Rationale: User trust & debuggability.

### 8. No Unnecessary Client State Libraries
Do NOT introduce global state managers (Redux, Zustand, Jotai, etc.) unless a documented state scenario
cannot be solved by: (a) component state, (b) context, (c) TanStack Query cache, or (d) URL params.
Rationale: Prevents state sprawl and reduces bundle size.

## Technology & Architecture Constraints

1. Framework: React 19.2 with Vite or equivalent modern bundler (assumed; can revise when toolchain added).
2. Data Layer: TanStack Query; no ad-hoc `fetch` wrappers except inside query functions.
3. Styling: Prefer CSS (modules or vanilla-extract) or lightweight utility-first approach; avoid heavy UI
	frameworks that obscure semantic markup.
4. State & Effects: Side-effects isolated in query functions or event handlers; avoid effect waterfalls.
5. Type Safety: TypeScript REQUIRED for all production source (no `.js` except build/config scripts). Never
	use non-null assertions (`!`) or unchecked `as any` casts—if an escape hatch is unavoidable, isolate it
	in a boundary adapter with a justification comment. Minimize optional (`?`) and nullable (`| null | undefined`)
	properties; prefer discriminated unions to represent variant shapes explicitly. All external / IO data
	(network responses, localStorage, environment variables, parsed JSON) MUST be validated with Zod schemas
	at the boundary and transformed into internally trusted types before wider use. Resulting user-land code
	MUST operate on these validated types without additional defensive null checks.
6. Deployment: Static asset hosting.

## Workflow & Quality Gates

1. Planning: Feature specs define user value only (no implementation detail), aligning with Spec Template.
2. Constitution Check: Each plan MUST confirm adherence to core principles (especially Principles 2–4, 7–8).
3. Documentation: Complex data flows or unusual caching decisions documented inline (code comments) or in
	feature plan rationale sections.

## Governance

Authority: This constitution overrides ad-hoc preferences and prior undocumented conventions.

Amendment Process:
1. Open a PR modifying this file.
2. Include a Sync Impact Report (version delta, added/removed/changed principles, required template updates).
3. Obtain at least one maintainer approval.
4. Apply required template or tooling updates within two subsequent feature PRs (or same PR if breaking).

Versioning (Semantic):
- MAJOR: Principle removals or redefinitions that invalidate existing accepted implementations.
- MINOR: Addition or expansion (like today’s mandatory TypeScript/Zod enforcement).
- PATCH: Non-semantic clarifications (grammar, rewording without behavioral impact).

Compliance Review Checklist (for PR reviewers):
- React 19.2 APIs used (no legacy createRoot alternatives, no class components unless legacy migration).
- Query usage transparent: in-component `use(Query|SuspenseQuery)` + options factories; no hidden custom wrappers.
- Suspense + Error Boundary present for async rendering surface.
- Semantic elements preferred over divs; accessibility not regressed.
- Type Safety rules followed: no `!`, no gratuitous `as any`, boundary validation with Zod.
- No unnecessary global state library introduction.
- Optional tests (if present) fast & deterministic.

Deviation Handling:
- Temporary deviations MUST include: justification, planned removal date, and tracking issue/task ID.
- Unjustified deviations block merge.

Records:
- Keep ratification and amendment dates at footer.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-10-05