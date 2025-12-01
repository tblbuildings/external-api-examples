## Table of Contents
- [API Example](#api-example)
- [Installation](#installation)
- [Getting an API Key](#getting-an-api-key)
- [Setting environment configuration](#setting-environment-configuration)
- [Running The Application](#running-the-application)
- [Application Architecture](#application-architecture)
- [Webhook Subscriptions](#webhook-subscriptions)

# API Example

The API example is a sample app that uses TBL's API and serves as an example of how to perform authentication and simple requests.

For more API documentation please see https://api.orion.tblbuildings.com/external-api-ms/graphql

# Installation

Ensure that you installed the version specified in `.nvmrc` file.
If you don't have node.js installed you can get it at http://nodejs.org for your platform.

# Getting an API Key

To make the sample application work you will need to add `.env` file, add variable `API_KEY` and set your Api key as value.

# Setting environment configuration

If the `API_KEY` was created for the development environment then the `API_HOST` variable in `config.js` file should be changed to below
`API_HOST='https://api.dev-orion.tblbuildings.com'`

If the `API_KEY` was created for the production environment then the `API_HOST` variable in `config.js` file should be changed to below
`API_HOST='https://api.orion.tblbuildings.com'`

# Running The Application

To run the application in your terminal window run `npm install` to ensure all dependencies are installed. Once these have been installed run: `npm run start`

This will start a node server running on port 3000. You can view the app in your web browser by visiting http://localhost:3000

# Application Architecture

The main entry point of the application is the `app.js` file. This is where all of the endpoints are defined for both get and post requests.

The implementation for the get list of sites can be found in `/routes/sites.js`

The implementation for the get IAQ data for sites can be found in `/routes/iaq.js`

Logic that speaks directly to the tblbuildings servers is all encapsulated in the `/services/api.js` file. This is an implementation of the api itself. For more API documentation please see https://api.orion.tblbuildings.com/external-api-ms/graphql

# Webhook Subscriptions

Your Orion webhook will receive events whenever key actions occur within your api-key.  
Each event includes a `type`, human-readable `message`, and a `timestamp`.  
[`Here`](./Webhook_Susbscription_Events.md) you’ll find details on when each event is triggered and what the payload looks like.
