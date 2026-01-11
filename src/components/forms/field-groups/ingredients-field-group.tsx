import { IconCross } from '@/design/icons/cross'
import { IconPlus } from '@/design/icons/plus'
import { button } from '@/design/recipes/buttons'
import type { Ingredient } from '@/schemas/ingredient'
import { css, cx } from '@styled/css'
import { hstack, stack } from '@styled/patterns'
import { useStore } from '@tanstack/react-form'
import { useState } from 'react'
import { withFieldGroup } from '../app-form'
import { Fieldset } from '../layout-components/fieldset-layout'

export const IngredientsFieldGroup = withFieldGroup({
  defaultValues: {
    ingredients: [{ name: '', amount: '', unit: '' }] as Ingredient[],
  },

  render: function Render({ group }) {
    const buttonStyles = button({ size: 'sm' })

    const ingredients = useStore(group.store, ($) => $.values.ingredients)
    const didJustAddIngredient = useDidJustAddIngredient(ingredients)

    return (
      <group.AppField name="ingredients" mode="array">
        {(field) => (
          <Fieldset legend="Ingredienser">
            <ul className={stack({ gap: '4' })}>
              {field.state.value.map((_, index) => {
                const isLastItem = index === field.state.value.length - 1
                const isJustAdded = didJustAddIngredient && isLastItem

                return (
                  <li key={index} className={hstack({ gap: '2' })}>
                    <group.AppField
                      name={`ingredients[${index}].name`}
                      children={(nameField) => (
                        <nameField.TextField
                          autoFocus={isJustAdded}
                          placeholder="Ingrediens"
                        />
                      )}
                    />

                    <group.AppField
                      name={`ingredients[${index}].amount`}
                      children={(amountField) => (
                        <amountField.TextField placeholder="Mängd" />
                      )}
                    />

                    <group.AppField
                      name={`ingredients[${index}].unit`}
                      children={(unitField) => (
                        <unitField.TextField placeholder="Enhet" />
                      )}
                    />

                    <button
                      type="button"
                      className={cx(
                        buttonStyles.button,
                        css({ alignSelf: 'stretch' }),
                      )}
                      onClick={() => field.removeValue(index)}
                    >
                      <IconCross className={buttonStyles.icon} />
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              className={buttonStyles.button}
              onClick={() =>
                field.pushValue({ name: '', amount: '', unit: '' })
              }
            >
              <span className={buttonStyles.text}>Lägg till ingrediens</span>
              <IconPlus className={buttonStyles.icon} />
            </button>
          </Fieldset>
        )}
      </group.AppField>
    )
  },
})

function useDidJustAddIngredient(items: unknown[]) {
  const prevLength = usePreviousValue(items.length)
  const didJustAdd = prevLength !== undefined && items.length > prevLength
  return didJustAdd
}

function usePreviousValue<T>(value: T): T | undefined {
  const [prevTrackedValue, setPrevTrackedValue] = useState<T | undefined>()
  const [prevValue, setPrevValue] = useState<T | undefined>()

  if (value !== prevTrackedValue) {
    setPrevTrackedValue(value)
    setPrevValue(prevTrackedValue)
  }

  return prevValue
}
