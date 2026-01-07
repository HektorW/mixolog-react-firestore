import {
  ViewTransition,
  type DialogHTMLAttributes,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'

interface DialogProps {
  closedby?: DialogHTMLAttributes<HTMLDialogElement>['closedby']

  children: ReactNode

  onClose?: () => void
}

export function Dialog({ closedby = 'any', children, onClose }: DialogProps) {
  function onCancel(event: FormEvent<HTMLDialogElement>) {
    event.preventDefault()
    onClose?.()
  }

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    const isClosedByBackdropClick = closedby === 'any'
    const isBackdropClick = event.target === event.currentTarget

    if (isClosedByBackdropClick && isBackdropClick) {
      onClose?.()
    }
  }

  return (
    <ViewTransition default="dialog">
      <dialog
        closedby={closedby}
        ref={(element) => {
          if (!element) return

          element.showModal()

          return () => {
            element.close()
          }
        }}
        style={{
          background: 'rgb(0 0 0 / 0.5)',
          border: 'none',
          padding: '0',
          margin: '0',
          display: 'grid',
          placeItems: 'center',
          maxWidth: 'none',
          maxHeight: 'none',
          width: '100%',
          height: '100%',
        }}
        onClose={onClose}
        onCancel={onCancel}
        onClick={onClick}
      >
        <DialogContent>
          <form>
            <header>
              <button onClick={onClose}>Close</button>
            </header>

            {children}
          </form>
        </DialogContent>
      </dialog>
    </ViewTransition>
  )
}

function DialogContent({ children }: { children: ReactNode }) {
  return (
    // <ViewTransition>
    <div
      style={{
        backgroundColor: 'white',
        viewTransitionName: 'dialog-content-hegge',
      }}
    >
      {children}
    </div>
    // </ViewTransition>
  )
}
