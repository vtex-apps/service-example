export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { status: statusClient },
  } = ctx
  console.log('Received code:', code)

  const statusResponse = await statusClient.getStatus(code).then(result => result,
    error => {
      if (error.response === undefined) {
        return { code:400, description:"Bad Request" }
      }
      else {
        if(error.response.data != undefined){
          return error.response.data
        }
        return { code: error.response.status, description:error.response.statusResponseText}
      }
    })
  console.log('Status response:', statusResponse)

  console.log('Code:', code)

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(code).then(result => {
    if(typeof result.data == "string") {
      return statusClient.getStatusWithHeaders(400).catch(error => error.response)
    }
    return result
  },
    error => {
      if(error.response == undefined || typeof error.response.data == "string" || code < 100 || code > 599) {
        return statusClient.getStatusWithHeaders(400).catch(error => error.response)
      }
      else {
        return error.response
      }
    })
  console.log('Status headers', headers)
  console.log('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
