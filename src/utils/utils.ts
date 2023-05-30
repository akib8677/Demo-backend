import { google } from "googleapis";
import fs from 'fs';
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

export async function uploadFile(file:any) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: 'image/jpg',
                parents: ['1IT_CxfsgTixncDWAV2a2V1-Ba49xh8V-']
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            },
        });
        if (response.data?.id) {
            await setFilePermission(response.data.id, 'reader', 'anyone');
            return `https://drive.google.com/uc?id=${response.data.id}`
        } else {
            return '';
        }
    } catch (error) {
        return ('Refresh token has been expired');
    }
    finally {
        fs.unlinkSync(file.path)
    }
}

async function setFilePermission(fileId:any, role:string, type:string) {
    return await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: role,
            type: type,
        },
    });
}