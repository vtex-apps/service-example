import { json } from "co-body"

//import { changeItemsQuery } from './node/graphql/changeOrder.gql'

//const { gql, useMutation } = require('graphql-import-node/register');
const fetch = require("node-fetch")

const apiCallMasterdata = async (addressName: any, authToken: any, accountName: any) => {
    const url = "http://portal.myvtex.com/api/dataentities/AD/search?an="+accountName+"&_fields=geoCoordinate&_where=addressName=" + String(addressName)
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'VtexIdclientAutCookie': authToken
        }
    })
    let responseJson = null
    //console.log("response in apiCallMasterdata", response.ok)
    //console.log("RESPONSE: ", response)
    if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        responseJson = await response.json()
    } else {
        responseJson = 'HTTP-Error: ' + response.status
    }
    return responseJson
}

export async function getMasterdataInfo(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
    } = ctx

    const { addressName } = params

    const authToken = ctx.vtex.authToken
    const accountName = ctx.vtex.account

    const body = await json(ctx.req)
    console.log("body", body)

    const response = await apiCallMasterdata(addressName, authToken, accountName)

    //console.log("GET MASTER DATA INFO", response)

    ctx.body = response

    await next()
}
