const dynamoDb = require('../dynamodb');
const randomstring = require("randomstring");
const uuid = require('uuid');

module.exports = (request, response, next) => {
  const shortUrl = randomstring.generate(6);

  const shortLinkItem = {
    id: uuid.v1(),
    longUrl: request.body.url,
    shortPath: shortUrl,
    shortUrl: `https://${process.env.domainName}/${shortUrl}`,
    expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  };

  const data = {
    TableName: process.env.tableName,
    Item: shortLinkItem,
  };

  dynamoDb.put(data).promise().then(res => {
    console.log(res);

    return response.status(200).json({
      message: 'Short URL generated successfully.',
      item: shortLinkItem,
    });
  });
};
