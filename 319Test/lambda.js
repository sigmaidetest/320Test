let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);
exports.handler = function (event, context, callback) {


    sqs.receiveMessage({
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/319TestQueue',
        AttributeNames: ['All'],
        MaxNumberOfMessages: '1',
        VisibilityTimeout: '30',
        WaitTimeSeconds: '0'
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    console.log(message);
                });
                callback(null, 'Message processing finished!');
            } else {
                console.log('No messages to process!');
                callback(null, 'No messages to process');
            }
        })
        .catch(err => {
            console.log('Error occurred', err);
            callback(err);
        });



    // sqs.receiveMessage({
    //     QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/319TestQueue',
    //     AttributeNames: ['All'],
    //     MaxNumberOfMessages: '1',
    //     VisibilityTimeout: '30',
    //     WaitTimeSeconds: '0'
    // }).promise()
    //     .then(receivedMsgData => {
    //         if (receivedMsgData !== null) {
    //             let receivedMessages = receivedMsgData.Messages;
    //             receivedMessages.forEach(message => {
    //                 console.log(message);
    //             });
    //             callback(null, 'Message processing finished');
    //         } else {
    //             console.log('No messages to process');
    //             callback(null, 'No messages to process');
    //         }
    //     })
    //     .catch(err => {
    //         console.log('Error occurred', err);
    //         callback(err);
    //     });

    // sqs.receiveMessage({
    //     QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/319TestQueue',
    //     AttributeNames: ['All'],
    //     MaxNumberOfMessages: '1',
    //     VisibilityTimeout: '30',
    //     WaitTimeSeconds: '0'
    // }, (err, receivedMsgData) => {
    //     if (err) {
    //         console.log('Error occurred', err);
    //         callback(err);
    //     } else {
    //         if (receivedMsgData !== null) {
    //             let receivedMessages = receivedMsgData.Messages;
    //             receivedMessages.forEach(message => {
    //                 console.log(message);
    //             });
    //             callback(null, 'Message processing finished');
    //         } else {
    //             console.log('No messages to process');
    //             callback(null, 'No messages to process');
    //         }
    //     }
    // });

    // sqs.receiveAndDeleteMessages({
    //     QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/319TestQueue',
    //     AttributeNames: ['All'],
    //     MaxNumberOfMessages: '1',
    //     VisibilityTimeout: '30',
    //     WaitTimeSeconds: '0'
    // }, function (receivedMessages) {
    //     // implement received message filtering logic here and return filtered set of messages which 
    //     // are allowed to delete in the next step
    //     console.log(receivedMessages);
    //     return receivedMessages || [];
    // }, function (deleteSuccessData) {
    //     console.log(deleteSuccessData);
    //     callback(null, "Success");
    //     // implement delete success state here
    // }, function (error) {
    //     console.log('Error', error);
    //     callback(error);
    //     // implement error handling logic here
    // });






}