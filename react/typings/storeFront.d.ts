import type { Component, FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = Record<string, unknown>>
    extends FunctionComponent<P> {
    getSchema?(props: P): Record<string, unknown>
    schema?: Record<string, unknown>
  }

   interface StorefrontFC<P = GenericObject> extends FunctionComponent<P> {
    getSchema?(props: P): GenericObject
    schema?: GenericObject
  }
  interface StorefrontComponent<
    P = Record<string, unknown>,
    S = Record<string, unknown>
  > extends Component<P, S> {
    getSchema?(props: P): Record<string, unknown>
    schema: Record<string, unknown>
  }

}
