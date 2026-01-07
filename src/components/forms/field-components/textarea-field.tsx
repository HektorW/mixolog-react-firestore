import { formField, input } from '@/design/recipes/form'
import { css, cx } from '@styled/css'
import { useId } from 'react'
import { useFieldContext } from '../app-form-context'
import { FieldErrors } from './field-errors'

interface TextareaFieldProps {
  id?: string
  label: string
}

export function TextareaField(props: TextareaFieldProps) {
  const componentId = useId()
  const id = props.id ?? componentId

  const field = useFieldContext<string>()

  const fieldStyles = formField()

  return (
    <div className={fieldStyles.container}>
      <label htmlFor={id} className={fieldStyles.label}>
        {props.label}
      </label>

      <textarea
        id={id}
        name={field.name}
        value={field.state.value ?? ''}
        className={cx(
          fieldStyles.control,
          input(),
          css({
            minHeight: '6lh',
            resize: 'vertical',
            fieldSizing: 'content',
          }),
        )}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
      />

      {field.state.meta.errors.length > 0 && (
        <FieldErrors errors={field.state.meta.errors} />
      )}
    </div>
  )
}
