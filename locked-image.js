// Obtain enviroment variables if configured
require('dotenv').config()
var port = process.env.PORT || 80

// Library imports
var fs = require('fs')
var path = require('path')                                  
var express = require('express')
var rateLimit = require('ws-rate-limit')('60s', 600)

// Configure express.js
var app = express()
var expressWs = require('express-ws')(app)
app.set('view engine', 'ejs')

// Read and parse image JSON object
var imageData = fs.readFileSync('imageData.json')
var imageDataObject = JSON.parse(imageData)

// Serve index page
var indexHandler = function (req, res) {
    res.render('pages/home')
}

// Websockets handler
var indexWsHandler = function (ws, req) {
    rateLimit(ws)
    ws.on('message', function (message){
        try {
            var inputObj = JSON.parse(message)
            switch (inputObj.action){
                case "authenticate":
                        if(inputObj.value in imageDataObject){
                            ws.send(JSON.stringify({action:"load-image", value: imageDataObject[inputObj.value]}))
                        }else{
                            ws.send(401)
                        }
                    break
                default:
                    ws.send(404)
            }
        }
        catch(err){
            console.error(err)
        }
    })
    ws.on('limited', function(){
        ws.send(401)
    })
}


// Index page Websockets Handoff
app.ws('/', indexWsHandler)
// Index page HTTP Handoff
app.get('/', indexHandler)


// Static file hosting
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Start listening for requests
app.listen(port, () => console.log(`locked-image.js Homepage listening on port ${port}!`))