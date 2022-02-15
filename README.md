API Example
====================

The API example is a sample app that uses TBL's API and serves as an example of how to perform authentication and simple requests.

Installation
==================

If you don't have node.js installed you can get it at http://nodejs.org for your platform. 

Getting an API Key
===================

To make the sample application work you will need to add `.env` file, add variable `API_KEY` and set your Api key as value.

Running The Application
=========================

To run the application in your terminal window run `npm install` to ensure all dependencies are installed. Once these have been installed run: `npm run start` 

This will start a node server running on port 3000. You can view the app in your web browser by visiting http://localhost:3000

Application Architecture
==========================

The main entry point of the application is the `app.js` file. This is where all of the endpoints are defined for both get and post requests.

The implementation for the get list of sites can be found in `/routes/sites.js`

The implementation for the get IAQ data for sites can be found in `/routes/iaq.js`

Logic that speaks directly to the tblbuildings servers is all encapsulated in the `/services/api.js` file. This is an implementation of the api itself. For more API documentation please see https://api.orion.tblbuildings.com/external-api-ms/graphql

