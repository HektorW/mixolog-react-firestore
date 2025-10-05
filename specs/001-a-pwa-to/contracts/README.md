# Contracts

Although the current implementation directly uses Firestore from the client, this directory contains a pseudo OpenAPI contract (`openapi.yaml`) to:
- Provide a stable semantic surface for future backend extraction.
- Enable contract test scaffolding verifying expected shapes.

## Endpoints (Conceptual)
- GET /drinks
- POST /drinks
- GET /drinks/{drinkSlug}
- GET /drinks/{drinkSlug}/recipes
- POST /drinks/{drinkSlug}/recipes

All responses and payloads reference schemas defined in `openapi.yaml`.
