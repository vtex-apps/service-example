export const status = async (ctx: Context, next: () => Promise<any>) => {
  const {state: {code}, clients: {status: statusClient}} = ctx
  console.log('Received code:', code)

  const statusResponse = await statusClient.getStatus(code)
  console.log('Status response:', statusResponse)

  const {headers, data, status: responseStatus} = await statusClient.getStatusWithHeaders(code)
  console.log('Status headers', headers)
  console.log('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
