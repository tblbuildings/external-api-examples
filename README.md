## Table of Contents
- [API Example](#api-example)
- [Installation](#installation)
- [Getting an API Key](#getting-an-api-key)
- [Setting environment configuration](#setting-environment-configuration)
- [Running The Application](#running-the-application)
- [Application Architecture](#application-architecture)
- [Webhook Subscriptions](#webhook-subscriptions)
  - [WEBHOOK_ADDED](#webhook_added)
  - [WEBHOOK_REMOVED](#webhook_removed)
  - [SUBSCRIPTION_UPDATE](#subscription_update)

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
Below you’ll find details on when each event is triggered and what the payload looks like.

---

## `WEBHOOK_ADDED`

### **When is this event sent?**
This event is sent **immediately after your webhook has been successfully registered** on the Orion platform.  
Use this to confirm that your endpoint is active and ready to receive future events.

### **Example Payload**
```json
{
  "type": "WEBHOOK_ADDED",
  "message": "Successfully added webhook on Orion platform",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```


## `WEBHOOK_REMOVED`

### **When is this event sent?**
This event is delivered **whenever an existing webhook is removed**—either manually or by an automated system process.  
You can use this to clean up integrations or stop expecting further webhook communication.

### **Example Payload**
```json
{
  "type": "WEBHOOK_REMOVED",
  "message": "Removed webhook from Orion platform",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

---

## `SUBSCRIPTION_UPDATE`

### **When is this event sent?**
This event is triggered **any time asset subscription data changes** for your api-key.

Common triggers include:

- Adding or removing asset from subscription 
- Adding or removing metrics from asset subscription
- Bulk asset subscription changes

Use this event to keep your system in sync with the assets and metrics your api-key is tracking.

### **Example Payload**
```json
{
  "type": "SUBSCRIPTION_UPDATE",
  "message": "Assets subscription was updated",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "currentAssetSubscriptions": [
    {
      "assetId": 1,
      "metricIds": [1, 2, 3]
    },
    {
      "assetId": 2,
      "metricIds": [4, 5, 6]
    },
    {
      "assetId": 3,
      "metricIds": [7, 8, 9]
    }
  ]
}
```

