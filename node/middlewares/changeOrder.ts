import { json } from "co-body"

//import { changeItemsQuery } from './node/graphql/changeOrder.gql'

//const { gql, useMutation } = require('graphql-import-node/register');
const fetch = require("node-fetch")

const apiCallChangeOrder = async (code: any, reqBody: any, authToken: any) => {
  const url2 =
    //'https://gbonacchi.vtexcommercestable.com.br/api/oms/pvt/orders/' + String(code) + '/changes'
    'https://portal.vtexcommercestable.com.br/api/oms/pvt/orders/' + String(code) + '/changes?an=gbonacchi'
  //changeItemsQuery
  let response = await fetch(url2, {
    method: 'POST',
    body: reqBody,//JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'VtexIdclientAutCookie': authToken
    }
  })
  let responseJson = null

  console.log("response in apiCallChangeOrder", response.ok)

  if ( response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    responseJson = await response.json()
  } else {
    responseJson = 'HTTP-Error: ' + response.status
  }
  return responseJson
}

export async function changeOrder(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    //clients: { orders },
  } = ctx

  const authToken = ctx.vtex.authToken
  console.log("authToken", authToken)

  const body = await json(ctx.req)
  console.log("body", body)

  const response = await apiCallChangeOrder(code, body, authToken)

  console.log(response)

  ctx.body = response

  /*
    const ADD_TODO = gql`
      mutation changeItemsQuery($orderId: ID!, $data: ChangeItemsInput!){
        changeItems(orderId: $orderId, data: $data) @context(provider: "vtex.orders-graphql") {
          date,
          orderId,
          receipt
        }
      }
    `;

    const [addTodo, { data }] = useMutation(ADD_TODO);
    addTodo({ variables: { orderId: String(code), data : body} });
    console.log("resultAddTodo", data)
  */
  await next()
}
