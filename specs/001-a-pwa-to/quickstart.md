# Quickstart: Drink & Recipe Tracking PWA

## Prerequisites
- Node.js LTS (≥18)
- Firestore project + web config (future step)

## Install
```
npm create vite@latest app -- --template react-ts
cd app
npm install @tanstack/react-query zod firebase
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

## Firestore Setup (outline)
1. Initialize Firebase app with config.
2. Enable offline persistence: `enableIndexedDbPersistence(db)`.
3. Collections: `drinks`, subcollection `drinks/{drinkSlug}/recipes`.

## Run Dev
```
npm run dev
```

## Build
```
npm run build && npm run preview
```

## Core Scripts (to add to package.json)
- `dev`: Vite dev server
- `build`: Vite build
- `test`: Vitest

## Key Modules (planned)
- `data/firestore.ts` – init + converters
- `data/queries.ts` – query option factories
- `data/slug.ts` – normalization + tests
- `schemas/*.ts` – Zod schemas

## Adding a Drink (Manual Test)
1. Open app, see empty state.
2. Enter drink name → slug auto-populates.
3. Submit → list updates alphabetically.

## Adding a Recipe
1. Click a drink.
2. Fill recipe form (name, ingredient rows, instructions, optional URL).
3. Submit → appears at top of recipe list.

## Offline Check
1. Load app online (cache + Firestore data).
2. Disconnect network, refresh.
3. Observe list still present.
4. Create drink offline → appears locally.
5. Reconnect → ensure no duplicates, data persists after refresh.

## Running Contract Tests (future)
```
vitest run tests/contract
```

## Next Steps
Run /tasks command (future) to generate implementation task list.
