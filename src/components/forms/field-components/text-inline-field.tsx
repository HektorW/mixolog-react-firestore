import { useId } from 'react'
import { useFieldContext } from '../app-form-context'

interface TextFieldProps {
  id?: string
  placeholder: string
}

export function TextInlineField(props: TextFieldProps) {
  const componentId = useId()
  const field = useFieldContext<string>()

  return (
    <input
      id={props.id ?? componentId}
      type="text"
      name={field.name}
      value={field.state.value}
      placeholder={props.placeholder}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.currentTarget.value)}
    />
  )
}
