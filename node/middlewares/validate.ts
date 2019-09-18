import { UserInputError } from '@vtex/api'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const {vtex: {route: {params, params: {code}}}} = ctx

  console.log('Received params:', params)

  if (!code) {
    throw new UserInputError('Code is required')
  }

  const codeNumber = parseInt(code as string, 10)

  if (isNaN(codeNumber) || codeNumber < 100 || codeNumber > 600) {
    throw new UserInputError('Code must be a number')
  }

  ctx.state.code = codeNumber

  await next()
}
