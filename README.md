# debatedb-backend

backend for debatedb

## Running

`denon start`

The direct `deno run` command can be found in the `denon.json` file.

## Deployment

To deploy the docker image must be built and pushed to docker hub. Once the image is there the server can pull down the image and run it.

The commands to build and push:

```
docker build -t exilliar/debatedb-backend:latest .
docker push exilliar/debatedb-backend:latest
```

## Received data format

The data that is sent must contain the same fields that are contained in the table that the data is being added to. But without the id of the data (unless required in the url). The id for the new data will be added by the database when the data is inserted into the table. This is done to help prevent possible errors that could be generated from duplicate id's within the same table.

## Endpoints

### Account

```
GET     /account // get all accounts
GET     /account/:id // get single account. Here the id can either be the id of the account, or the email of the account
POST    /account // add account
PUT     /account/:id // update account
DELETE  /account/:id // delete account
```

### Debate

```
GET     /account/:accountid/debate // get all debates
GET     /account/debate/:id // get single debate
POST    /account/debate // add debates
PUT     /account/debate/:id // update debate
DELETE  /account/debate/:id // delete debate
```

### Argument

```
GET     /debate/:debateId/argument // get all arguments
GET     /debate/argument/:id // get single arguments
POST    /debate/argument // add argument
PUT     /debate/argument/:id // update argument
DELETE  /debate/argument/:id // delete argument
```

### Info

```
GET     /info/ // get all infos
GET     /info/:id // get single info
POST    /info // add info
PUT     /info/:id // update info
DELETE  /info/:id // delete info
```

### Source

There is no method to get all sources, regardless of the argument, as it is not currently needed.

```
GET     /argument/:argumentId/source // get all sources within an argument
GET     /argument/source/:id // get single source
POST    /argument/:argumentId/source // add source
PUT     /argument/source/:id // update source
DELETE  /argument/:argumentId/source/:id // delete source
```

### Quote

As with the Source endpoints, there is not method to get all quotes, regardless of source, as it is not currently needed.

```
GET     /source/:sourceId/quote // get all quotes
GET     /source/quote/:id // get single quote
POST    /source/:sourceId/quote // add quote
PUT     /source/quote/:id // update quote
DELETE  /source/:sourceId/quote/:id // delete quote
```
