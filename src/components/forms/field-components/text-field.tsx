import { formField, input } from '@/design/recipes/form'
import { cx } from '@styled/css'
import { useId } from 'react'
import { useFieldContext } from '../app-form-context'
import { FieldErrors } from './field-errors'

interface TextFieldProps {
  readonly?: boolean
  id?: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'url'
}

export function TextField(props: TextFieldProps) {
  const componentId = useId()
  const id = props.id ?? componentId

  const field = useFieldContext<string>()

  const fieldStyles = formField()

  return (
    <div className={fieldStyles.container}>
      {props.label && (
        <label htmlFor={id} className={fieldStyles.label}>
          {props.label}
        </label>
      )}

      <input
        id={id}
        type={props.type ?? 'text'}
        name={field.name}
        value={field.state.value ?? ''}
        placeholder={props.placeholder}
        readOnly={props.readonly}
        className={cx(fieldStyles.control, input())}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
      />

      {field.state.meta.errors.length > 0 && (
        <FieldErrors errors={field.state.meta.errors} />
      )}
    </div>
  )
}
