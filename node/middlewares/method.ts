import { json } from 'co-body'
export async function method(ctx: Context, next: () => Promise<any>) {
  if (ctx.method.toUpperCase() !== 'GET') {
    // Or handle the request differently if you need it, maybe using a switch-case statement on ctx.method
    const body = await json(ctx.req)
    console.log('Received body:', body)
    ctx.status = 405
    return
  }

  await next()
}
