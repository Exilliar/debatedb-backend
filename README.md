# debatedb-backend

backend for debatedb

## Running

`deno run --allow-env --allow-net --allow-read index.ts`

## Received data format

The data that is sent must contain the same fields that are contained in the table that the data is being added to. But without the id of the data (unless required in the url). The id for the new data will be added by the database when the data is inserted into the table. This is done to help prevent possible errors that could be generated from duplicate id's within the same table.

## Endpoints

### Account

```
GET /account // get all accounts
GET /account/:id // get single account. Here the id can either be the id of the account, or the email of the account
POST /account // add account
PUT /account/:id // update account
DELETE /account/:id // delete account
```

### Debate

```
GET /debate // get all debates
GET /debate/:id // get single debate
POST /debate // add debates
PUT /debate/:id // update debate
DELETE /debate/:id // delete debate
```

### Argument

```
GET /argument // get all arguments
GET /argument/:id // get single arguments
POST /argument // add argument
PUT /argument/:id // update argument
DELETE /argument/:id // delete argument
```

### Info

```
GET /info/ // get all infos
GET /info/:id // get single info
POST /info // add info
PUT /info/:id // update info
DELETE /info/:id // delete info
```

### Source

There is no method to get all sources, regardless of the argument, as it is not currently needed.

```
GET /argument/:argumentId/source // get all sources within an argument
GET /argument/source/:id // get single source
POST /argument/:argumentId/source // add source
PUT /argument/source/:id // update source
DELETE /argument/:argumentId/source/:id // delete source
```

### Quote

As with the Source endpoints, there is not method to get all quotes, regardless of source, as it is not currently needed.

```
GET /source/:sourceId/quote // get all quotes
GET /source/quote/:id // get single quote
POST /source/:sourceId/quote // add quote
PUT /source/quote/:id // update quote
DELETE /source/:sourceId/quote/:id // delete quote
```
