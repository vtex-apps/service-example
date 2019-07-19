import { Service } from '@vtex/api'

console.log(process.env)

let count: number = 0

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
      console.log('This should not go to splunk. Tercio is a great guy.')
      console.log(JSON.stringify({message: 'This should also not go to splunk. Come on, Tercio!'}))
      console.error('This does not go to splunk either. Just a bork in console.')
      ctx.clients.logger.info('Wow. such info. Very log only string splunk')
      ctx.clients.logger.warn({message: 'Wow. such warn. Very danger!', count: count++})
      ctx.clients.logger.error(new Error('Wow. such eror. y u no bork??'))
      ctx.set('cache-control', 'no-cache, no-store')
      ctx.body = {
        message: 'http',
      }
    }
  },
})
