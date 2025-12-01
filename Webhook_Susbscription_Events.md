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
