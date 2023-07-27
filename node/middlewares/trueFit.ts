
export async function trueFit(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { trueFit },
  } = ctx

  const data = await trueFit.trueFit()

  ctx.body = data

  await next()
}
