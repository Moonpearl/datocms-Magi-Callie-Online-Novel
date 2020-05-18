require('dotenv').config();
const { google } = require('googleapis');

const {
  GATSBY_GOOGLE_API_SERVICE_ACCOUNT,
} = process.env;

GATSBY_GOOGLE_API_PRIVATE_KEY = process.env.GATSBY_GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n');

const googleApiService = {
  TYPE_DRIVE_INFO: 0,
  TYPE_DRIVE_HTML: 1,
  TYPE_DRIVE_CSV: 2,

  auth: null,
  drive: null,

  getAuth: async () => {
    if (googleApiService.auth === null) {
      const auth = new google.auth.JWT(
        GATSBY_GOOGLE_API_SERVICE_ACCOUNT,
        null,
        GATSBY_GOOGLE_API_PRIVATE_KEY,
        ['https://www.googleapis.com/auth/drive']
      );

      try {
        const newTokens = await auth.authorize();
        googleApiService.auth = auth;
      }
      catch(googleApiError) {
        let message;
        if (googleApiError.code) {
          message = 'Error while authenticating service account into Google API';
        } else {
          message = 'Invalid Google API credentials';
        }

        throw {
          message,
          googleApiError,
        };
      }  
    }
    return googleApiService.auth;
  },

  getDrive: async () => {
    if (googleApiService.drive === null) {
      const auth = await googleApiService.getAuth();
      googleApiService.drive = google.drive({version: 'v3', auth});
    }
    return googleApiService.drive;
  },

  getDriveFile: async (fileId, type = googleApiService.TYPE_DRIVE_INFO) => {
    const drive = await googleApiService.getDrive();

    try {
      let result;
      switch(type) {
        case googleApiService.TYPE_DRIVE_INFO:
          result = await drive.files.get({
            fileId,
          });
          break;
        
        case googleApiService.TYPE_DRIVE_HTML:
          result = await drive.files.export({
            fileId,
            mimeType: 'text/html',
          });
          break;

        case googleApiService.TYPE_DRIVE_CSV:
          result = await drive.files.export({
            fileId,
            mimeType: 'text/csv',
          });
          break;
      }
      return result.data;
    }
    catch(googleApiError) {
      let message;
      switch (googleApiError.code) {
        case 403:
          type = googleApiError.ERROR_FILE_NOT_AUTHORIZED;
          message = 'service account not authorized to access file';
          break;
        case 404:
          type = googleApiError.ERROR_FILE_NOT_FOUND;
          message = 'file does not exist';
          break;
        default:
          message = 'unknown error'
      }

      throw {
        message: `Error while retrieving Google Drive file \x1b[36m[${fileId}]\x1b[0m:
        ${message}`,
        googleApiError,
      };
    }
  },
}

module.exports = googleApiService;
