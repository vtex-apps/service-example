import type { ServiceContext } from '@vtex/api'
import type { Clients } from '../clients/index'

export async function getEntitiesHandler(ctx: ServiceContext<Clients>, next: () => Promise<any>) {
  const {clients: { contactClient }} = ctx
  try {
    const data = await contactClient.getEntities()

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    console.log('Running getEntitiesHandler')

    ctx.status = 500
    ctx.body = { error: 'Failed to fetch contact data', details: (err as Error).message }
  }

  await next()
}
