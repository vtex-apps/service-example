# Service Example

A reference app implementing a VTEX IO service with HTTP route handlers.

![Service Example Architecture](https://user-images.githubusercontent.com/18706156/77381360-72489680-6d5c-11ea-9da8-f4f03b6c5f4c.jpg)

We use [**KoaJS**](https://koajs.com/) as the web framework, so you might want to get into that

We also use the [**node-vtex-api**](https://github.com/vtex/node-vtex-api), a VTEX set of utilities for Node services. You can import this package using NPM from `@vtex/api` (already imported on this project)

- Start from `node/index.ts` and follow the comments and imports :)

## Defining routes on _service.json_ 
```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

The `service.json` file that sits on the root of the `node` folder holds information about this service, like the maximum timeout and number of replicas, but also sets its routes. 

Koa uses the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) format for defining routes and, as seen in the example, we use the `:code` notation for declaring a route param named `code`. An HTTP request for `https://{{workspace}}--{{account}}.myvtex.com/_v/status/500` will match the route we've defined. 

For each _key_ on the `routes` object, there should be a corresponding entry on the exported Service object on `node/index.ts`. This will hook your code to a specific route.

## Access Control
You can also provide a `public` option for each route. If `true`, that resource will be reachable to everyone on the internet. If `false`, VTEX credentials will be requested as well.

Another way of controlling access to specific routes is using **ReBACs (Resource-based access)**, which supports a more robust configuration. You can read more [on this document](https://docs.google.com/document/d/1ZxNHMFIXfXz3BgTN9xyrHL3V5dYz14wivYgQjRBZ6J8/edit#heading=h.z7pad3qd2qw7) (VTEX only).

### Query String
For `?accepting=query-string`, you **don't need to declare anything**, as any query provided to the URL will already be available for you to use on the code as `ctx.query`, already parsed as an object, or `ctx.queryString`, taken directly from the URL as a string.

### Route Params
Route Params will be available for you to use on the code as `ctx.vtex.params`, already parsed as an object.
For a path like `/_v/status/:code`, if you receive the request `/_v/status/200`, `ctx.vtex.params` will return `{ code: '200' }`

### HTTP methods

When you define a route on the `service.json`, your NodeJS handlers for that route will be triggered on every HTTP method (GET, POST, PUT...), so if you need to handle them separately, you need to implement a "sub-router". Fortunately, the _node-vtex-api_ provides a helper function `method`, exported from `@vtex/api`, to accomplish that behavior. Instead of passing your handlers directly to the corresponding route on `index.ts`, you pass a `method` call passing an object with the desired method as key and one handler as its corresponding value. 

Check this example:
```typescript
import { method } from '@vtex/api'
...

export default new Service<Clients, State>({
  clients,
  routes: {
    status: method({
      GET: statusGetHandler,
      POST: statusPostHandler,
    }),
  },
})
```

## Throwing errors

When building an HTTP service, we should follow HTTP rules regarding data types, cache, authorization, and status codes. Our example app sets a `ctx.status` value that will be used as an HTTP status code return value, but often, we also want to give proper information about errors.

The **node-vtex-api** already exports a handful of **custom error classes** that can be used for that purpose, like the `NotFoundError`. You just need to throw them inside one of the route handlers that the appropriate response will be sent to the server.

```typescript
import { UserInputError } from '@vtex/api'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { code } = ctx.vtex.route.params
  if (isNaN(code) || code < 100 || code > 600) {
    throw new UserInputError('Code must be a number between 100 and 600')
  }
...
```

You can check all the available errors [here](https://github.com/vtex/node-vtex-api/tree/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors), but some are not useful for just-HTTP services. Check the most useful ones:

|Error Class | HTTP Code |
|--|:--:|
| `UserInputError` | 400 |
| `AuthenticationError` | 401 |
| `ForbiddenError` | 403 |
| `NotFoundError` | 404 |

You can also **create your custom error**, just see how it's done above ;)

## Reading a JSON body

When writing POST or PUT handlers, for example, you often need to have access to the **request body** that comes in a JSON format, which is not provided directly by the handler function.

For this, you have to use the [co-body](https://www.npmjs.com/package/co-body) package that will parse the request into a readable JSON object, used as below: 
```typescript
import { json } from 'co-body'
export async function method(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req)
```

## Testing

`@vtex/test-tools` and `@types/jest` should be installed on `./node` package as `devDependencies`.

Run `vtex test` and [Jest](https://jestjs.io/) will do its thing.

Check the `node/__tests__/simple.test.ts` test case and also [Jest's Documentation](https://jestjs.io/docs/en/getting-started).
