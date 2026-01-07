import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './app-form-context'
import { TextField } from './field-components/text-field'
import { TextareaField } from './field-components/textarea-field'
import { Submit } from './form-components/submit'

export const {
  withFieldGroup,

  useAppForm,
} = createFormHook({
  formContext,
  fieldContext,
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    Submit,
  },
})
