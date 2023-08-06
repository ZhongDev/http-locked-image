# http-locked-image
 nodeJS based password protected image hoster

 ## :warning: Deprecated :warning:

This repository is no longer being worked on or supported and has been archived. The code and documentation in this repository are provided as-is, and no further updates or bug fixes will be made. Please use this repository for reference purposes only.

## Configuration of imageData.json
Image data needs to be saved into a json file in base64, so that it can be transmitted over websockets and only with password authentication
```
{ 
    "<password>": "<image data in base64>",
    "<password2>": "<image data 2 in base64>"
}
```
The file should be saved in the same folder as `locked-image.js` as `imageData.json`

## Credits
* [Creative Tim](https://github.com/creativetimofficial) - For [material-dashboard](https://github.com/creativetimofficial/material-dashboard)
