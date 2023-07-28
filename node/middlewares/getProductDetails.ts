export async function getProductDetails(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { product },
    request:{query: {skuIds}}
  } = ctx

  ctx.body = await product.getProductDetails(skuIds.split(","))

  await next()
}
