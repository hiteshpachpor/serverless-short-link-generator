const dynamoDb = require('../dynamodb');

module.exports = (request, response, next) => {
  const query = {
    TableName: process.env.tableName,
    Key: {
      shortPath: request.params.shortPath,
    },
  };

  dynamoDb.get(query).promise().then(res => {
    let location = '/404';

    if (res?.Item?.longUrl) {
      location = res.Item.longUrl;
    }

    response.writeHead(302, {
      Location: location,
    });

    response.end();
  });
};
