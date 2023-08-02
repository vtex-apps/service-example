export async function skuSpecifications(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { skuSpecifications },
    request:{query: {skuIds}}
  } = ctx

  ctx.body = await skuSpecifications.getSkuSpecifications(skuIds.split(","))

  await next()
}
