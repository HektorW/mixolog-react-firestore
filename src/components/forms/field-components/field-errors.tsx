import { css } from '@styled/css'

interface FieldErrorsProps {
  errors: unknown[]
}

export function FieldErrors(props: FieldErrorsProps) {
  return props.errors.map((error) => (
    <p key={String(error)} className={css({ color: 'red.500' })}>
      {error.message}
    </p>
  ))
}
