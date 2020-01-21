export async function status(ctx: Context, next: () => Promise<any>) {
  console.log('REQUESTED STATUS')
  const {state: {code}, clients: {status: statusClient}} = ctx

  const {headers, data, status: responseStatus} = await statusClient.getStatusWithHeaders(code)
  console.log('CONTEXT VTEX', ctx.vtex)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
