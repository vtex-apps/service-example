export async function getOrder(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { orders },
  } = ctx
  const data = await orders.order(String(code))
  ctx.body = data

  await next()
}
