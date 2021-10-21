const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.setPromisesDependency(Promise);

module.exports = new AWS.DynamoDB.DocumentClient();
