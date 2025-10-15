// T037 CreateDrinkForm
import { createDrink } from '@/data/mutations'
import { normalizeSlug } from '@/data/slug'
import { useState, type ChangeEvent, type FormEvent } from 'react'

export function CreateDrinkForm() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setName(v)
    if (!slug) setSlug(normalizeSlug(v))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      await createDrink({ name, slug })
      setName('')
      setSlug('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} aria-busy={pending}>
      <fieldset disabled={pending} style={{ border: 'none', padding: 0 }}>
        <legend>Add Drink</legend>
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
        <button type="submit">Create</button>
        {error && <p>{error}</p>}
      </fieldset>
    </form>
  )
}
