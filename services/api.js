const axios = require("axios").create()
const { API_HOST, API_KEY } = require("../config");

const api = {
  authorize: async () => {
    try {
      console.log("Authorizing...");
      const response = await axios.post(`${API_HOST}/external-api-ms/graphql`, {
        query: `
			mutation authorize($apiKeyAuthorizeInput: ApiKeyAuthorizeInput!){
			  authorize(apiKeyAuthorizeInput: $apiKeyAuthorizeInput){
		     access_token
         expires_in
         token_type
		    }
      }`,
        variables: {
          apiKeyAuthorizeInput: {
            apiKey: API_KEY
          }
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Authorization successful");
      const accessToken = response?.data?.data?.authorize?.access_token;
      if (!accessToken) {
        throw new Error("Authorization failed: No access token received");
      }
      return accessToken;
    } catch (error) {
      console.dir(error);
      throw error
    }
  },

  getSites: async () => {
    try {
      const accessToken = await api.authorize();
      console.log("Fetching sites...");
      const response = await axios.post(`${API_HOST}/external-api-ms/graphql`, {
        query: `
					query getList {
					  sites {
				      id
						  name
						  city
						  state
						  streetName
				    }
		      }`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response?.data?.errors) {
        throw response.data.errors;
      }
      return response?.data?.data?.sites;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getSitesIaq: async () => {
    try {
      const accessToken = await api.authorize();
      console.log("Fetching iaqs...");
      const response = await axios.post(`${API_HOST}/external-api-ms/graphql`, {
        query: `
					query getList {
					  sites {
				      id
						  name
						  iaq {
                id
						    co
						    co2
						    ch2o
						    relativeHumidity
						    score
						    temperature
						  }
				    }
		      }`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response?.data?.errors) {
        throw response.data.errors;
      }
      return response?.data?.data?.sites;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getHistoricalDataV2: async (from, to, systemId) => {
    try {
      const accessToken = await api.authorize();
      console.log("Fetching iaq data...");
      const response = await axios.post(`${API_HOST}/external-api-ms/graphql`, {
        query: `
          query getHistoricalDataV2(
            $from: DateTimeISO! = "${from.toISOString()}",
            $systemId:Int! = ${systemId},
            $to: DateTimeISO! = "${to.toISOString()}"
          ) {
            iaqHistoricalDataV2(
              from: $from
              systemId: $systemId
              to: $to
            ) {
              ch2o
              co
              co2
              o3
              pm2_5
              pm10
              relativeHumidity
              score
              temperature
              timestamp
              tvoc
            }
          }
		      `
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response?.data?.errors) {
        throw response.data.errors;
      }
      return response?.data?.data?.iaqHistoricalDataV2;
    } catch (error) {
      console.dir(error);
      return null;
    }
  },

  errorExample: async () => {
    try {
      const accessToken = await api.authorize();
      return axios.post(`${API_HOST}/external-api-ms/graphql`, {
        query: `
				query IaqHistoricalData {
					iaqHistoricalData(systemId: 20, from: "2022-01-01T16:1:00.000Z", to: "2022-03-15T16:16:22.202Z") {
					  timestamp
					  co
					  co2
					  tvoc
					}
				}`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(({ data }) => data.errors);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = api;
