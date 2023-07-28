
export async function getProductDetails(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { trueFit },
    request:{query: {skuIds}}
  } = ctx
  console.log('skuIds',skuIds);
  const data = await trueFit.getProductDetails(skuIds.split(","))

  ctx.body = data

  await next()
}
