export async function configuration(ctx: Context, next: () => Promise<any>) {
  console.log('HMMMMMMMM')
  ctx.state.code = 200
  ctx.body = 'asdf'
  console.log('CTX', ctx.vtex)

  await next()
}
