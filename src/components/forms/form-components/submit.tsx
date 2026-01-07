import { submit } from '@/design/recipes/form'
import { css, cx } from '@styled/css'
import { useFormContext } from '../app-form-context'

interface SubmitProps {
  label: string
}

export function Submit(props: SubmitProps) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => ({
        canSubmit: state.canSubmit,
        isSubmitting: state.isSubmitting,
      })}
    >
      {({ canSubmit, isSubmitting }) => (
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className={cx(
            submit(),
            css({
              marginBlockStart: '4',
            }),
          )}
        >
          {isSubmitting ? '...' : props.label}
        </button>
      )}
    </form.Subscribe>
  )
}
