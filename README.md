# api-nested-fetch
This is intended as a template for a nested API fetch (also supports GraphiQL) and URL search params, based on a search query. This template can act as the basis for more detailed calls and a search result page.

With this template, the following actions take place:

1) The user submits a search query
2) The search query is passed to an API fetch call (see search.js) to return an initial standardized result.
3) The standardized result is then passed into a nested API fetch call to return the final results.
4) The results are then transformed into a search URL string and displayed on-screen.
