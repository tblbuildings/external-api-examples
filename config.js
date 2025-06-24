require("dotenv").config();

exports.API_KEY = process.env.API_KEY;
exports.API_HOST = process.env.API_HOST || "https://api.orion.tblbuildings.com";
