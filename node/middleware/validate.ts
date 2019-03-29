import InvalidStatus from '../errors/invalidStatus'

export const validate = async (ctx: Context, next: () => Promise<any>) => {
  const {vtex: {route: {params, params: {code}}}} = ctx

  console.log('Received params:', params)

  if (!code) {
    throw new InvalidStatus()
  }

  const codeNumber = parseInt(code as string, 10)

  if (isNaN(codeNumber) || codeNumber < 100 || codeNumber > 600) {
    throw new InvalidStatus()
  }

  ctx.state.code = codeNumber

  await next()
}
