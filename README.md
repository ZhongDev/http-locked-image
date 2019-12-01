# http-locked-image
 nodeJS based password protected image hoster

## Configuration of imageData.json
Image data needs to be saved into a json file in base64, so that it can be transmitted over websockets and only with password authentication
```
{ 
    "<password>": "<image data in base64>",
    "<password2>": "<image data 2 in base64>"
}
```
The file should be saved in the same folder as `locked-image.js` as `imageData.json`