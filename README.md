# Service Example

A reference app implementing a VTEX IO service with http route handlers and GraphQL resolvers.

Start from `node/index.ts` and follow the imports. :)

Creating a `node/globals.ts` file and importing it in your `index.ts` is a convenience to allow you to define a global `Context` type and use that on every route handler for the ctx param.

## Splunk Dashboard

We have an (for now, VTEX-only, internal) Splunk dashboard to show all metrics related to your app. You can find it at:

https://splunk7.vtex.com/en-US/app/vtex_colossus/node_app_metrics

After linking this app and making some requests, you can browse to `vtex.service-node` and see the metrics for your app. **Don't forget to check Development, as you are linking your app**. :)

For convenience, the link for the current version: https://splunk7.vtex.com/en-US/app/vtex_colossus/node_app_metrics?form.time.earliest=-30m%40m&form.time.latest=%40m&form.picked_context=false&form.picked_region=aws-us-east-*&form.picked_version=vtex.service-example%400.0.1


### TODO:

- Implement GraphQL Resolvers from `render-guide`.
- Implement automatic `Proxy-Authorization` header in HttpClient.forExternal (remove need for AuthType in options).
- Implement `minCacheMs` option in HttpClient cache middleware to forceably cache requests.
