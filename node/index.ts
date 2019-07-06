import { Service } from '@vtex/api'

export default new Service({
  graphql: {
    resolvers: {
      Query: {
        test: () => ({
          message: 'graphql',
        }),
      },
    },
  },
  routes: {
    test: (ctx) => {
      // ctx.set('transfer-encoding', 'chunked')
      ctx.set('cache-control', 'no-cache, no-store')
      ctx.body = {
        message: 'http',
      }
    }
  },
})
