export async function verifyAddress(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { unigis: unigisClient },
  } = ctx
  const x: any = {"apiKey":"string", "latitud":"-34.603707", "longitud":"-58.38381649999999", "zonas":["COBERTURA TIENDAS", "ZONAS PELIGROSAS"], "tablas":{}}

  const statusResponse = await unigisClient.hitUnigis(x)

  console.info('UNIGIS:', statusResponse)

  ctx.status = 200
  ctx.body = {"response":"hola"}

  await next()
}