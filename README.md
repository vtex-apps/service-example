# Service Example

A reference app implementing a VTEX IO service with http route handlers.

Start from `node/index.ts` and follow the comments and imports. :)

## Splunk Dashboard

We have an (for now, VTEX-only, internal) Splunk dashboard to show all metrics related to your app. You can find it at:

https://splunk7.vtex.com/en-US/app/vtex_colossus/node_app_metrics

After linking this app and making some requests, you can select `vtex.service-example` and see the metrics for your app. **Don't forget to check the box Development, as you are linking your app in a development workspace**.

For convenience, the link for the current version: https://splunk7.vtex.com/en-US/app/vtex_colossus/node_app_metrics?form.time.earliest=-30m%40m&form.time.latest=%40m&form.picked_context=false&form.picked_region=aws-us-east-*&form.picked_service=vtex.service-example
