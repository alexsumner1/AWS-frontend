var AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'});

var apiResponse = {};

module.exports.getInstances = async (event, context, callback) => {
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(await ec2.describeInstances().promise())
    });
};
