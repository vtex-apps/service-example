# Service Example

A reference app implementing a VTEX IO service with http route handlers and GraphQL resolvers.

Start from `node/index.ts` and follow the imports. :)

Creating a `node/globals.ts` file and importing it in your `index.ts` is a convenience to allow you to define a global `Context` type and use that on every route handler for the ctx param.


### TODO:

- Implement GraphQL Resolvers from `render-guide`.
- Implement automatic `Proxy-Authorization` header in HttpClient.forExternal (remove need for AuthType in options).
- Implement `minCacheMs` option in HttpClient cache middleware to forceably cache requests.
