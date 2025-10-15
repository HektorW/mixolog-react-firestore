// T042 ErrorBoundary component
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {}
  static getDerivedStateFromError(error: Error): State {
    return { error }
  }
  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <section>
          <h1>Something went wrong</h1>
          <p>{this.state.error.message}</p>
        </section>
      )
    }
    return this.props.children
  }
}
