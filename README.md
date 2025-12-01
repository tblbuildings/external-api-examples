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

## Webhook Event Types

The Orion platform sends specific event messages to your registered webhook endpoint whenever certain actions occur.
Below is a description of each event, when it is triggered, and the structure of the payload you will receive.

---

### 📘 `WEBHOOK_REGISTERED`

#### **When is this event sent?**

This event is delivered **immediately after a webhook is successfully registered** on the Orion platform.

This allows your system to verify that the webhook registration process has completed and that your endpoint is active.

#### **Example Payload**

```json
{
  "type": "WEBHOOK_REGISTERED",
  "message": "Successfully added webhook on Orion platform",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

---

### 📕 `WEBHOOK_DELETED`

#### **When is this event sent?**

This event is sent **after a webhook has been removed** from the Orion platform—either by a user action or an automated cleanup process.

Use this to disable integrations or stop expecting future events.

#### **Example Payload**

```json
{
  "type": "WEBHOOK_DELETED",
  "message": "Removed webhook from Orion platform",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

---

### 🔄 `SUBSCRIPTION_UPDATE`

#### **When is this event sent?**

This event is delivered **whenever asset subscriptions for your tenant change**.

Triggers include:

* A user adds or removes asset subscriptions
* A system process updates subscription rules
* Bulk updates to asset subscription lists

Your system can use this event to stay in sync with what assets it should track.

#### **Example Payload**

```json
{
  "type": "SUBSCRIPTION_UPDATE",
  "message": "Assets subscription was updated",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "currentAssetSubscriptions": [
    {
      assetId: 1,
      metricIds: [1,2,3]
    },
    {
      assetId: 2,
      metricIds: [4,5,6]
    },
    {
      assetId: 3,
      metricIds: [7,8,9]
    },
  ]
}
```

---

### Summary Table

| Event Type            | Trigger Moment                      | Contains Additional Data  |
| --------------------- | ----------------------------------- | ------------------------- |
| `WEBHOOK_REGISTERED`  | After webhook is successfully added | ❌ No                      |
| `WEBHOOK_DELETED`     | After webhook is removed            | ❌ No                      |
| `SUBSCRIPTION_UPDATE` | When asset subscriptions change     | ✅ Yes — subscription list |

---

If you want, I can also generate a diagram, add HMAC verification examples, or create a full README template including setup instructions.

