const axios = require("axios").create()
const {API_HOST, API_KEY} = require("../config");

const api = {
	authorize: () => {
		return axios.post(`${API_HOST}/external-api-ms/graphql`, {
			query: `
			mutation authorize($apiKeyAuthorizeInput: ApiKeyAuthorizeInput!){
			  authorize(apiKeyAuthorizeInput: $apiKeyAuthorizeInput){
		     access_token
         expires_in
         token_type
		    }
      }`, variables: {
				apiKeyAuthorizeInput: {
					apiKey: API_KEY
				}
			}
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(({data}) => data).then(response => response?.data?.authorize);
	},
	getSites: async () => {
		try {
			const authorizeResponse = await api.authorize();
			return axios.post(`${API_HOST}/external-api-ms/graphql`, {
				query: `
					query getList{
					  sites{
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
					'Authorization': `Bearer ${authorizeResponse.access_token}`
				}
			}).then(({data}) => data).then(response => response?.data?.sites);
		} catch (error) {
			return null;
		}
	},
	getSitesIaq: async () => {
		try {
			const authorizeResponse = await api.authorize();
			return axios.post(`${API_HOST}/external-api-ms/graphql`, {
				query: `
					query getList{
					  sites{
				        id
						    name
						    iaq{
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
					'Authorization': `Bearer ${authorizeResponse.access_token}`
				}
			}).then(({data}) => data).then(response => response?.data?.sites);
		} catch (error) {
			return null;
		}
	}
}

module.exports = api;
