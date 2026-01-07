import { fieldset } from '@/design/recipes/form'
import { cx } from '@styled/css'

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend: string
}

export function Fieldset(props: FieldsetProps) {
  const fieldsetStyles = fieldset()

  return (
    <fieldset
      className={cx(fieldsetStyles.container, props.className)}
      {...props}
    >
      <legend className={fieldsetStyles.legend}>{props.legend}</legend>

      {props.children}
    </fieldset>
  )
}
