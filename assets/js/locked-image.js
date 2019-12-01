var hasPasswordError = false;

var uri = window.location.hostname + window.location.pathname
var wss = "ws://"
if(window.location.protocol == 'https:'){
    wss = "wss://"
}

start(wss + uri);

function start(websocketServerLocation) {
    ws = new WebSocket(websocketServerLocation);
    ws.onopen = function () {
        console.log("ws connection established")
    };
    ws.onmessage = function (e) {
        if (e.data == 401) {
            incorrectPassword()
        }else if (e.data == 404){
            console.log("I don't know how you got here, but please report the error on Github at https://github.com/ZhongDev/http-locked-image/issues/new")
        }else{
            try {
                var inputObj = JSON.parse(e.data)
                switch (inputObj.action){
                    case "load-image":
                            hideLogin();
                            loadImage(inputObj.value)
                        break
                    default:
                        console.log("An unknown instruction of " + inputObj.action + " was issued by the server. Please report this issue on Github at https://github.com/ZhongDev/http-locked-image/issues/new")
                }
            }
            catch(err){
                console.log(err)
            }
        }
    };
    ws.onclose = function () {
        console.log("ws connection has been closed");
        setTimeout(function () {
            start(websocketServerLocation)
        }, 3000);
    };
}

function processForm(){
    var passwordInput = document.getElementById("password-input").value
    ws.send(JSON.stringify({action: "authenticate", value: passwordInput}))
}

function hideLogin(){
    $("#fullcover").fadeTo(1333, 0);
    setTimeout(function(){
        $("#fullcover").hide();
    },333)
}

function loadImage(base64){
    $('#image-wrapper').prepend('<div class="card hidden" id="image":>\n<div class="card-body">\n<img src="data:image/png;base64, ' + base64 + '" style="max-width: 100%; max-height: 100%;">\n</div>\</div>')
    $("#image").fadeTo(1333, 1);
}

function incorrectPassword(){
    if(!hasPasswordError){
        hasPasswordError = true;
        $('#card-body').prepend('<div class="password-error-wrapper"><label class="password-error">The password was not recognised.</label></div>')
    }
    var div = document.getElementById('password-card');
    var interval = 100;
    var distance = 10;
    var times = 4;

    $(div).css('position', 'relative');

    for (var iter = 0; iter < (times + 1) ; iter++) {
        $(div).animate({
            left: ((iter % 2 == 0 ? distance : distance * -1))
        }, interval);
    }                                                                                                          
    $(div).animate({ left: 0 }, interval);
    console.log("o noes")
}