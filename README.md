# debatedb-backend

backend for debatedb

## Running

`deno run --allow-env --allow-net --allow-read index.ts`

## Endpoints

### Account

GET /account // get all accounts
GET /account/:id // get single account
POST /account // add account
PUT /account/:id // update account
DELETE /account/:id // delete account

### Debate

GET /debate // get all debates
GET /debate/:id // get single debate
POST /debate // add debates
PUT /debate/:id // update debate
DELETE /debate/:id // delete debate

### Argument

GET /argument // get all arguments
GET /argument/:id // get single arguments
POST /argument // add argument
PUT /argument/:id // update argument
DELETE /argument/:id // delete argument

### Info

GET /info/:id // get all infos
GET /info/:id // get single info
POST /info // add info
PUT /info/:id // update info
DELETE /info/:id // delete info

### Source

GET /argument/:id/source // get all sources
GET /argument/:id/source/:id // get single source
POST /argument/:id/source // add source
PUT /argument/:id/source/:id // update source
DELETE /argument/:id/source/:id // delete source

### Quote

GET /source/:id/quote // get all quotes
GET /source/:id/quote/:id // get single quote
POST /source/:id/quote // add quote
PUT /source/:id/quote/:id // update quote
DELETE /source/:id/quote/:id // delete quote
