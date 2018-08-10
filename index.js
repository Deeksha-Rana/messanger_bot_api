var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('privacy and policy : no one can use our copyrights.')
})
let token = "EAAGN4TZCzBu0BAAEjZBUJbgD01MzeD6aCOpZBZB6BT9iPSseM8fL5ZAYAs26Sn5MRwXZCZCN3DNlxIqlkrdZAhnaQWosYpfWn1DvwoJdm9b6n5ufRqx3NQKZBEM8CpyPvZCKphMA8n3ZArqXuDQmqp2jJ1Dj5hNcAtkMSIKSC6ZASh0a2AZDZD"
// for Facebook verification


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_name_is_shubham_kamboj_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})


app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "Hello, " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})
// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})