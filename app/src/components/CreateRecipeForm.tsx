// T039 CreateRecipeForm component
import { createRecipe } from '@/data/mutations'
import { normalizeSlug } from '@/data/slug'
import type { Ingredient } from '@/schemas/ingredient'
import { useState, type ChangeEvent, type FormEvent } from 'react'

interface Props {
  drinkSlug: string
}

interface IngredientInput extends Omit<Ingredient, 'unit'> {
  unit?: string
}

export function CreateRecipeForm({ drinkSlug }: Props) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [instructions, setInstructions] = useState('')
  const [inspirationUrl, setInspirationUrl] = useState('')
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: '', amount: '', unit: '' },
  ])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setName(v)
    if (!slug) setSlug(normalizeSlug(v))
  }

  function updateIngredient(
    idx: number,
    field: keyof IngredientInput,
    value: string,
  ) {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing)),
    )
  }

  function addIngredientRow() {
    setIngredients((prev) => [...prev, { name: '', amount: '', unit: '' }])
  }

  function removeIngredientRow(idx: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== idx))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      const filtered = ingredients.filter((i) => i.name.trim())
      if (filtered.length === 0) {
        throw new Error('At least one ingredient required')
      }
      await createRecipe({
        drinkSlug,
        name,
        slug,
        instructions,
        inspirationUrl: inspirationUrl || undefined,
        ingredients: filtered.map((i) => ({
          name: i.name.trim(),
          amount: i.amount.trim(),
          unit: i.unit?.trim() || undefined,
        })),
      })
      setName('')
      setSlug('')
      setInstructions('')
      setInspirationUrl('')
      setIngredients([{ name: '', amount: '', unit: '' }])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} aria-busy={pending}>
      <fieldset disabled={pending} style={{ border: 'none', padding: 0 }}>
        <legend>Add Recipe</legend>
        <label>
          Name
          <input
            required
            maxLength={255}
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Slug
          <input
            required
            maxLength={255}
            value={slug}
            onChange={(e) => setSlug(normalizeSlug(e.target.value))}
          />
        </label>
        <label>
          Inspiration URL
          <input
            type="url"
            value={inspirationUrl}
            onChange={(e) => setInspirationUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </label>
        <label>
          Instructions
          <textarea
            required
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
          />
        </label>
        <fieldset style={{ border: '1px solid #ccc' }}>
          <legend>Ingredients</legend>
          {ingredients.map((ing, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                aria-label={`Ingredient name ${idx + 1}`}
                placeholder="Name"
                value={ing.name}
                onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                required
              />
              <input
                aria-label={`Ingredient amount ${idx + 1}`}
                placeholder="Amount"
                value={ing.amount}
                onChange={(e) =>
                  updateIngredient(idx, 'amount', e.target.value)
                }
                required
              />
              <input
                aria-label={`Ingredient unit ${idx + 1}`}
                placeholder="Unit"
                value={ing.unit}
                onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredientRow(idx)}
                  aria-label={`Remove ingredient ${idx + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredientRow}>
            Add Ingredient
          </button>
        </fieldset>
        <button type="submit">Create Recipe</button>
        {error && <p>{error}</p>}
      </fieldset>
    </form>
  )
}
